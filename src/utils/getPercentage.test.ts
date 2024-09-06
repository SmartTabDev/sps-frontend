import { getPercentage } from "./getPercentage";

test("calc 1/100", () => {
  expect(getPercentage(1, 100)).toBe(1);
});

test("calc 1/3", () => {
  expect(getPercentage(1, 3).toFixed(2)).toBe("33.33");
});

test("calc 200/1", () => {
  expect(getPercentage(2, 1)).toBe(200);
});