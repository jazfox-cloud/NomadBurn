export type RiskBand = "positive" | "comfortable" | "manageable" | "risky" | "critical";

export type RiskProfile = {
  band: RiskBand;
  label: string;
  helper: string;
};

export function getRiskProfile(runwayMonths: number): RiskProfile {
  if (!Number.isFinite(runwayMonths)) {
    return {
      band: "positive",
      label: "Cashflow Positive",
      helper: "You are not burning savings. Keep the machine running.",
    };
  }

  if (runwayMonths >= 12) {
    return {
      band: "comfortable",
      label: "Comfortable",
      helper: "You have breathing room, but hidden costs still matter.",
    };
  }

  if (runwayMonths >= 6) {
    return {
      band: "manageable",
      label: "Manageable",
      helper: "You are okay, but one bad month can hurt.",
    };
  }

  if (runwayMonths >= 3) {
    return {
      band: "risky",
      label: "Risky",
      helper: "Your plan needs tightening before you move.",
    };
  }

  return {
    band: "critical",
    label: "Critical",
    helper: "This is not a lifestyle plan yet. It is a countdown.",
  };
}

export function getLeadMagnet(runwayMonths: number): { title: string; button: string } {
  if (!Number.isFinite(runwayMonths)) {
    return {
      title: "Get the Self-Sustaining Nomad Setup Checklist.",
      button: "Send me the checklist",
    };
  }

  if (runwayMonths < 3) {
    return {
      title: `Your ${runwayMonths.toFixed(1)} months runway is a countdown. Get the Emergency Nomad Budget Fix Kit.`,
      button: "Send me the fix kit",
    };
  }

  if (runwayMonths < 6) {
    return {
      title: "Get the 2026 Nomad Budget Survival Kit.",
      button: "Send me the checklist",
    };
  }

  if (runwayMonths < 12) {
    return {
      title: "Get the Nomad City Geo-Arbitrage & Comparison Sheet.",
      button: "Send me the comparison sheet",
    };
  }

  return {
    title: "Get the Self-Sustaining Nomad Setup Checklist.",
    button: "Send me the checklist",
  };
}

export function estimateRunwayEndDate(runwayMonths: number, fromDate = new Date()): string {
  if (!Number.isFinite(runwayMonths)) {
    return "No savings countdown at the current pace.";
  }

  const daysToAdd = Math.round(runwayMonths * 30.44);
  const endDate = new Date(fromDate);
  endDate.setDate(endDate.getDate() + daysToAdd);

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(endDate);
}
