const mockedResult = [
  {
    name: 'Price jumps' as const,
    color: '#28A745',
    positive: true,
    subtitle: 0.33,
    value: 92,
    series: [
      {
        name: '',
        data: [0, 0, 0, 24, 22, 68, 84, 53, 74, 57, 9, 23, 92],
      },
    ],
  },
  {
    name: 'Price drops' as const,
    color: '#F00F00',
    positive: false,
    subtitle: 0.06,
    value: 18,
    series: [
      {
        name: '',
        data: [0, 0, 0, 22, 10, 24, 94, 179, 61, 27, 11, 11, 18],
      },
    ],
  },
  {
    name: 'Unavailable' as const,
    color: '#828282',
    positive: false,
    subtitle: 87.97,
    value: 24739,
    series: [
      {
        name: '',
        data: [
          0, 0, 25037, 25093, 25325, 25150, 25173, 24787, 24753, 24752, 24738,
          24711, 24739,
        ],
      },
    ],
  },
  {
    name: 'Available' as const,
    positive: true,
    subtitle: 12.03,
    value: 3383,
    color: undefined,
    series: [
      {
        name: '',
        data: [
          0, 0, 3085, 3029, 2797, 2972, 2949, 3335, 3369, 3370, 3384, 3411,
          3383,
        ],
      },
    ],
  },
];

export default mockedResult;
