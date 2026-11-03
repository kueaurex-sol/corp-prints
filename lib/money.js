// Change these two lines if the prices aren't in rupees. Keep them the same in the admin panel.
const LOCALE = "en-IN";
const CURRENCY = "INR";

export const formatMoney = (amount) =>
  new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY, maximumFractionDigits: 2 }).format(amount);