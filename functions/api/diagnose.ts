type FunctionContext = {
  request: Request;
  env: {
    GEMINI_API_KEY?: string;
    AI_RATE_LIMIT?: {
      get(key: string): Promise<string | null>;
      put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
    };
  };
};

const DAILY_LIMIT = 3;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

function getClientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") || "local-dev";
}

function getPacificDayKey(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

async function checkRateLimit(context: FunctionContext): Promise<Response | null> {
  const kv = context.env.AI_RATE_LIMIT;
  if (!kv) {
    return null;
  }

  const key = `diagnose:${getPacificDayKey()}:${getClientIp(context.request)}`;
  const currentCount = Number((await kv.get(key)) || 0);

  if (currentCount >= DAILY_LIMIT) {
    return jsonResponse(
      {
        error: "daily_limit_reached",
        message: "You've reached the free daily limit. Drop your email to unlock unlimited AI diagnostics.",
      },
      429,
    );
  }

  await kv.put(key, String(currentCount + 1), { expirationTtl: 60 * 60 * 36 });
  return null;
}

function localDiagnosis(payload: any): string {
  const inputs = payload?.inputs ?? {};
  const result = payload?.result ?? {};
  const destination = inputs.destination || "your destination";
  const burnRate = Math.round(Number(result.burnRate || 0));
  const runway = Number(result.runwayMonths);
  const runwayCopy = Number.isFinite(runway) ? `${runway.toFixed(1)} months` : "infinite runway";
  const hasLocalVariability = Boolean(inputs.includeLocalCostVariability);
  const localVariabilityBuffer = Math.round(Number(result.localVariabilityBuffer || 0));

  return `## The Verdict
${burnRate > 0 ? `Your ${destination} plan is burning about $${burnRate}/month, which gives you ${runwayCopy} to make the math behave.` : `Your ${destination} setup is cashflow-positive, so the job is keeping it boring and repeatable.`}

## Hidden Friction
- Payment loss and tax reserve are silent leaks because they hit income before lifestyle spending even begins.
- Housing style is the biggest lever. A nicer apartment can quietly eat the whole geo-arbitrage advantage.
- ${hasLocalVariability ? `Local variability is adding about $${localVariabilityBuffer}/month for SIM/data and coworking day-pass swings.` : "Local variability is off, so the result is a steadier base case."}
- Timezone drag becomes a money problem when it lowers billable energy or client responsiveness.

## Do This Now
1. Put tax reserve and payment loss in separate line items before you touch lifestyle upgrades.
2. Check one real local SIM plan and two coworking day-pass prices in ${destination}, then rerun the calculator with local variability on.
3. Set a minimum monthly income target equal to your break-even number plus a 10% buffer.`;
}

async function geminiDiagnosis(apiKey: string, payload: any): Promise<Response> {
  const prompt = `You are Nomad CFO, a direct but practical financial planning assistant for remote workers and digital nomads.
You are not a licensed financial, tax, legal, or immigration advisor. Your output is for educational planning only.
Do NOT recalculate the numbers. Do NOT repeat every input. The user already sees the calculator results.
Output STRICTLY in this structure, under 300 words total:

## The Verdict
One punchy sentence about the user's situation. Direct, clear, slightly witty.

## Hidden Friction
2-3 bullet points explaining what is silently draining them. Focus on payment loss, tax reserve, accommodation style, local SIM and coworking day-pass swings, and timezone exhaustion.

## Do This Now
3 concrete numbered actions. Each action must be specific enough to do today.

Rules:
- Be direct, but not insulting.
- No vague advice like "save more".
- No emoji spam. Maximum one emoji.

Calculator payload:
${JSON.stringify(payload)}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${response.status}`);
  }

  const data = (await response.json()) as any;
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim() || localDiagnosis(payload);

  return streamText(text);
}

export async function onRequestPost(context: FunctionContext): Promise<Response> {
  const limited = await checkRateLimit(context);
  if (limited) {
    return limited;
  }

  let payload: any;
  try {
    payload = await context.request.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  try {
    if (context.env.GEMINI_API_KEY) {
      return await geminiDiagnosis(context.env.GEMINI_API_KEY, payload);
    }
  } catch {
    return streamText(localDiagnosis(payload));
  }

  return streamText(localDiagnosis(payload));
}

export function onRequestGet(): Response {
  return jsonResponse({ ok: true, endpoint: "/api/diagnose" });
}
