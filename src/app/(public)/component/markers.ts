export type Marker = {
  label: string;
  position: [number, number, number]; // tuple, exactly 3 numbers
  description: string;
};

export const markers: Marker[] = [
  {
    label: "Mount Everest",
    position: [-8, 3, 4],
    description: "The highest mountain in the world at 8,849m.",
  },
  {
    label: "Mount Everest",
    position: [-5, 3, 2],
    description: "The highest mountain in the world at 8,849m.",
  },
    {
    label: "Mount Everest",
    position: [-10, 3, 4],
    description: "The highest mountain in the world at 8,849m.",
  },
  {
    label: "Mount Everest",
    position: [3, 3, 12],
    description: "The highest mountain in the world at 8,849m.",
  },
  
];
