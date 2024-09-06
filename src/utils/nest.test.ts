import nest from "./nest";

const data = [
  { name: "coffee", store: "orlen", price: 12 },
  { name: "coffee", store: "orlen", price: 9 },
  { name: "coffee", store: "orlen", price: 6 },
];

test("nested group", () => {
  expect(nest(data, ["store", "name"])).toStrictEqual({
    orlen: {
      coffee: [
        { name: "coffee", price: 12, store: "orlen" },
        {
          name: "coffee",
          price: 9,
          store: "orlen",
        },
        {
          name: "coffee",
          price: 6,
          store: "orlen",
        },
      ],
    },
  });
});
