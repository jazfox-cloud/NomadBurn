export type TravelPaceInputs = {
  slowAccommodation: number;
  fastAccommodation: number;
  monthlyLiving: number;
  transportPerMove: number;
  setupPerMove: number;
  commonTravel: number;
  slowDeposit: number;
  fastDeposit: number;
  daysPerMove: number;
};

export const travelPaceExample: TravelPaceInputs = {
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

export function compareTravelPace(input: TravelPaceInputs) {
  for (const value of Object.values(input)) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError("Enter a non-negative, finite value for each field.");
    }
  }
  const cents = (value: number) => Math.round(value * 100) / 100;
  const livingTotal = cents(input.monthlyLiving * 3);
  const movingTotal = cents(2 * (input.transportPerMove + input.setupPerMove));
  const slowTotal = cents(input.slowAccommodation + livingTotal + input.commonTravel);
  const fastTotal = cents(input.fastAccommodation + livingTotal + movingTotal + input.commonTravel);
  const difference = cents(fastTotal - slowTotal);

  return {
    livingTotal,
    movingTotal,
    slowTotal,
    fastTotal,
    difference,
    monthlyDifference: cents(difference / 3),
    accommodationDifference: cents(input.fastAccommodation - input.slowAccommodation),
    movingDays: 2 * input.daysPerMove,
  };
}
