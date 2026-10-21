# NomadBurn

A digital nomad planning calculator for estimating monthly burn, savings runway and break-even income across 17 city presets.

**[Open the NomadBurn calculator](https://nomadburn.com/)** — free to use, with no account required.

## Start with your plan

1. Enter your savings and monthly income in USD. Choose whether your income is already taxed or needs a tax reserve.
2. Select a city and accommodation style: coliving, a solo apartment or a hostel/budget room.
3. Add fixed monthly costs, coworking visits, a monthly flight/visa buffer and payment loss.
4. Optionally enable local cost variability to allow for SIM/data and coworking day-pass price swings.
5. Compare monthly cashflow, burn rate, runway and break-even income. Change the city or assumptions to compare scenarios.

The homepage uses bundled city and accommodation presets. It does not provide a live rental search or a custom rent field.

## Explore the tools and guides

| Resource | Use it to |
| --- | --- |
| [Full runway calculator](https://nomadburn.com/) | Model savings, income, city costs, deductions and monthly buffers together. |
| [Burn rate guide and calculator](https://nomadburn.com/digital-nomad-burn-rate-calculator/) | Enter your own fixed and variable costs, then spread one-time costs across a chosen number of months. |
| [Runway explained](https://nomadburn.com/nomad-runway-calculator/) | Understand how a monthly deficit translates into months of savings. |
| [City guides](https://nomadburn.com/cities/) | Explore the destinations behind the planning presets. |
| [Cost methodology](https://nomadburn.com/methodology/) | Read the assumptions, source categories and limits of the estimates. |

## Worked comparison

These examples use the current bundled presets, checked against the calculation source on October 20, 2026. They are illustrative scenarios, not current accommodation quotes.

Shared inputs: **$12,000 savings**, **$1,800 monthly income**, reserve **20%** for tax, **3%** payment loss, **$100** fixed monthly costs, **$150** monthly flight/visa buffer, **coliving**, and **3 coworking visits per week**. Net income after the entered deductions is **$1,386 per month**. The percentages are example inputs, not recommended rates.

| Scenario | Monthly living cost | Monthly cashflow | Monthly burn | Savings runway |
| --- | ---: | ---: | ---: | --- |
| Chiang Mai, variability off | $1,264.95 | +$121.05 | $0 | No modeled drawdown |
| Lisbon, variability off | $1,901.96 | −$515.96 | $515.96 | 23.3 months |
| Lisbon, variability on | $1,965.93 | −$579.93 | $579.93 | 20.7 months |

The third scenario adds a **$25 monthly SIM/data swing** and a **$3 swing per coworking visit**: `25 + 3 visits × 4.33 weeks × 3 = $63.97` extra per month. Figures above retain cents; the online dashboard rounds currency to whole dollars.

For Lisbon without variability, break-even monthly income is about **$2,470.08**: `$1,901.96 ÷ (1 − 0.20 − 0.03)`.

## How the homepage calculation works

- **Monthly living cost:** city base living cost + accommodation preset + coworking + optional variability buffer + fixed monthly costs + flight/visa buffer.
- **Coworking:** city day-pass preset × visits per week × 4.33.
- **Net income:** entered monthly income − tax reserve, when enabled − payment loss. Both deductions use the entered income as their base.
- **Monthly cashflow:** net income − monthly living cost.
- **Monthly burn:** the monthly deficit, or zero when cashflow is nonnegative.
- **Runway:** savings ÷ monthly burn when there is a deficit. The app displays “Infinite” for zero or positive cashflow; this only means the modeled month does not consume savings.
- **Break-even income:** monthly living cost ÷ (1 − combined deduction rate). The implementation caps this combined rate at 90% for this calculation.

Income stability and timezone gap provide context for the optional advice layer; they do not change the numeric calculation in `calculateBurn.ts`.

## Data and scope

City defaults are editorial planning assumptions stored in `src/data/cities.ts`. The homepage labels them as reviewed on **July 12, 2026**; the methodology page carries a **July 10, 2026** review date and separately notes the July 12 Kuala Lumpur addition. These labels do not establish that every individual price was refreshed on those dates.

The methodology lists public cost-of-living databases, housing and hostel listings, coworking references and community discussions as source categories. The repository does not include a dated quote for every preset. Check current housing and work costs separately when making a real plan.

All displayed amounts are USD; there is no live currency conversion. One-time relocation costs, deposits, dependents, debt and emergencies are not automatically added to the homepage estimate. Account for relevant costs explicitly without counting them twice. NomadBurn is educational planning software, not individualized financial, tax or immigration advice.

## Source and local development

- `src/lib/calculateBurn.ts` — homepage calculation functions and input/output types.
- `src/data/cities.ts` — city costs, accommodation presets and city-guide metadata.
- `src/pages/index.astro` — main calculator interface.
- `src/pages/digital-nomad-burn-rate-calculator.astro` — standalone burn rate tool.
- `src/pages/methodology.astro` — planning assumptions and source categories.

Built with Astro, TypeScript and Tailwind CSS. From a checkout of this repository:

```bash
pnpm install
pnpm dev
```

To check and build the static site:

```bash
pnpm build
pnpm preview
```

The build script runs `astro check` and `astro build`; output goes to `dist/`. Additional repository checks are available through `pnpm check:city-pages` and `pnpm check:ga4-consent`.

The numerical calculator runs in the browser. The optional advice endpoint lives in `functions/api/diagnose.ts` and requires the Cloudflare Pages Functions runtime and server-side configuration; it is not provided by the Astro development server alone.
