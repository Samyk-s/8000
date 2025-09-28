export type Marker = {
  label: string;
  position: [number, number, number]; // tuple, exactly 3 numbers
  description: string;
};

export const markers: Marker[] = [
  {
    label: "Mt Everest",
    position: [-8, 3, 4],
    description: "Mt Everesr | 8848m.86 | Nepal",
  },
  {
    label: "Mt Makalu",
    position: [-5, 3, 2],
    description: "Mt Makalu | 8848m.86 | Nepal",
  },
  {
    label: "Mt Choyo",
    position: [-10, 3, 4],
    description: "Mt Choyo | 8848m.86 | Nepal",
  },
  {
    label: "Mt Annapurana",
    position: [3, 3, 12],
    description: "Mt Annapurana | 8848m.86 | Nepal",
  },

];
