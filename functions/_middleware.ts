type PagesContext = {
  request: Request;
  next: () => Promise<Response>;
};

const CANONICAL_HOST = "nomadburn.com";

function isCalculatorStateUrl(url: URL): boolean {
  return url.pathname === "/" && url.searchParams.size > 0;
}

function shouldNormalizeTrailingSlash(pathname: string): boolean {
  return (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !pathname.includes(".") &&
    !pathname.startsWith("/api/")
  );
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const url = new URL(context.request.url);
  let shouldRedirect = false;

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    shouldRedirect = true;
  }

  if (shouldNormalizeTrailingSlash(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();

  // Calculator query parameters restore/share UI state; they do not create a
  // separate search landing page. Keep the URL functional and crawlable while
  // preventing each input combination from becoming an indexable duplicate.
  if (isCalculatorStateUrl(url)) {
    const headers = new Headers(response.headers);
    headers.set("x-robots-tag", "noindex, follow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}
