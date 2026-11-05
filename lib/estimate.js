const UNIT_TO_FEET = { mm: 1 / 304.8, cm: 1 / 30.48, in: 1 / 12, ft: 1, m: 3.28084 };

// Returns the approximate price, or null if any input is missing or invalid.
export function estimatePrice({ width, height, unit, quantity, pricePerSqFt }) {
  const w = Number(width);
  const h = Number(height);
  const q = Number(quantity);
  const rate = Number(pricePerSqFt);
  const factor = UNIT_TO_FEET[unit];

  if (!factor || !(w > 0) || !(h > 0) || !Number.isInteger(q) || q < 1 || !(rate > 0)) return null;

  const areaSqFt = w * factor * (h * factor);
  return Math.round(areaSqFt * q * rate * 100) / 100;
}

export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);
// Pulls the per-sq-ft rates out of a service's pricing array.
// { amount: 1000, unit: "1 Sq ft." } -> 1000/sq ft. Entries priced any other way are ignored.
export function getSqFtRates(pricing) {
  if (!Array.isArray(pricing)) return [];
  return pricing.flatMap((p) => {
    const unit = String(p?.unit || "");
    if (!/sq\.?\s*(ft|feet|foot)/i.test(unit)) return [];
    const per = parseFloat(unit) || 1; // "1 Sq ft." -> 1, "10 Sq ft" -> 10
    const amount = Number(p.amount);
    if (!(amount > 0) || !(per > 0)) return [];
    return [{ label: p.label || "", rate: amount / per }];
  });
}