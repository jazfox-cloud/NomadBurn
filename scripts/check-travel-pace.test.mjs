import test from "node:test";
import assert from "node:assert/strict";
import { compareTravelPace } from "../src/lib/compareTravelPace.ts";

const example = {
  slowAccommodation: 2700,
  fastAccommodation: 3300,
  monthlyLiving: 600,
  transportPerMove: 250,
  setupPerMove: 50,
  commonTravel: 350,
  slowDeposit: 900,
  fastDeposit: 1100,
  daysPerMove: 1.5,
};

test("compares the same 90 days with zero versus two internal moves", () => {
  const result = compareTravelPace(example);
  assert.equal(result.slowTotal, 4850);
  assert.equal(result.fastTotal, 6050);
  assert.equal(result.difference, 1200);
  assert.equal(result.monthlyDifference, 400);
  assert.equal(result.accommodationDifference, 600);
  assert.equal(result.movingTotal, 600);
  assert.equal(result.movingDays, 3);
});

test("a $100 increase per move adds $200 to the three-base plan only", () => {
  const before = compareTravelPace(example);
  const after = compareTravelPace({ ...example, transportPerMove: 350 });
  assert.equal(after.slowTotal, before.slowTotal);
  assert.equal(after.fastTotal - before.fastTotal, 200);
});

test("equal accommodation and free moves yield equal costs", () => {
  const result = compareTravelPace({ ...example, fastAccommodation: 2700, transportPerMove: 0, setupPerMove: 0 });
  assert.equal(result.difference, 0);
});

test("an expensive single base can cost more than three bases", () => {
  const result = compareTravelPace({ ...example, slowAccommodation: 5000 });
  assert.equal(result.difference, -1100);
  assert.equal(result.monthlyDifference, -366.67);
});

test("refundable deposits and time stay separate from expenses", () => {
  const before = compareTravelPace(example);
  const after = compareTravelPace({ ...example, slowDeposit: 5000, fastDeposit: 9000, daysPerMove: 4 });
  assert.equal(after.slowTotal, before.slowTotal);
  assert.equal(after.fastTotal, before.fastTotal);
  assert.equal(after.movingDays, 8);
});

test("supports cents and a zero-cost scenario without rounding drift", () => {
  const result = compareTravelPace({ ...example, slowAccommodation: 0.1, fastAccommodation: 0.3, monthlyLiving: 0, transportPerMove: 0.1, setupPerMove: 0, commonTravel: 0.2 });
  assert.equal(result.slowTotal, 0.3);
  assert.equal(result.fastTotal, 0.7);
  assert.equal(result.difference, 0.4);
  const zero = compareTravelPace(Object.fromEntries(Object.keys(example).map(key => [key, 0])));
  assert.equal(zero.slowTotal, 0);
  assert.equal(zero.fastTotal, 0);
});

test("rejects missing, negative and non-finite values rather than showing a false total", () => {
  for (const invalid of [-1, NaN, Infinity, undefined]) {
    assert.throws(() => compareTravelPace({ ...example, monthlyLiving: invalid }), RangeError);
  }
});
