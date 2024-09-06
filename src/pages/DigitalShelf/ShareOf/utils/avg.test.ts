import avg from "./avg";

describe("avg", () => {
  test("calculates the right avg for one number", () => {
    const result = avg([1]);
    expect(result).toBe(1);
  });

  test("calculates the right avg for two numbers", () => {
    const result = avg([0, 10]);
    expect(result).toBe(5);
  });

  test("calculates the right avg for three numbers", () => {
    const result = avg([1, 2, 3]);
    expect(result).toBe(2);
  });

  test("returns 0 for empty array", () => {
    const result = avg([]);
    expect(result).toBe(0);
  });

  test("returns 0 for no arguments", () => {
    const result = avg();
    expect(result).toBe(0);
  });
});
