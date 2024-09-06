import numeral from "numeral";

numeral.register("locale", "pl", {
  delimiters: {
    thousands: "",
    decimal: ",",
  },
  abbreviations: {
    thousand: "tys.",
    million: "mln",
    billion: "mld",
    trillion: "bln",
  },
  ordinal: () => ".",
  currency: {
    symbol: "PLN",
  },
});

const formatPrice = (
  price: string | number,
  format = "0.00",
  locale = "pl"
) => {
  let preformatedPrice =
    typeof price === "string" ? price.replace(".", ",") : price;
  numeral.locale(locale);
  return numeral(preformatedPrice).format(format);
};

export default formatPrice;
