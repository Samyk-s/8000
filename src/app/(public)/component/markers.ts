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
  // {
  //   label: "K2",
  //   position: [-5, 4, 12],
  //   description: "Second highest (8,611m), also called the Savage Mountain.",
  // },
  // {
  //   label: "Kangchenjunga",
  //   position: [2, 3, -8],
  //   description: "Third highest mountain (8,586m) on the Nepal-India border.",
  // },
  // {
  //   label: "Lhotse",
  //   position: [4, 2, 10],
  //   description: "Fourth highest (8,516m), connected to Everest via South Col.",
  // },
  // {
  //   label: "Makalu",
  //   position: [-3, 3, -6],
  //   description: "Fifth highest (8,485m), known for its steep pitches and knife-edge ridges.",
  // },
  // {
  //   label: "Cho Oyu",
  //   position: [7, 2, -3],
  //   description: "Sixth highest (8,188m), considered the easiest 8,000er to climb.",
  // },
  // {
  //   label: "Dhaulagiri I",
  //   position: [-7, 3, 4],
  //   description: "Seventh highest (8,167m), a massive Himalayan peak in Nepal.",
  // },
  // {
  //   label: "Manaslu",
  //   position: [3, 2, 6],
  //   description: "Eighth highest (8,163m), known as the 'Mountain of the Spirit'.",
  // },
  // {
  //   label: "Nanga Parbat",
  //   position: [5, 2, -5],
  //   description: "Ninth highest (8,126m), nicknamed 'Killer Mountain'.",
  // },
  // {
  //   label: "Annapurna I",
  //   position: [-4, 2, -7],
  //   description: "Tenth highest (8,091m), infamous for its difficulty.",
  // },
  // {
  //   label: "Gasherbrum I",
  //   position: [1, 2, 9],
  //   description: "Eleventh highest (8,080m), also called Hidden Peak.",
  // },
  // {
  //   label: "Broad Peak",
  //   position: [6, 2, -9],
  //   description: "Twelfth highest (8,051m), near K2 in the Karakoram.",
  // },
  // {
  //   label: "Gasherbrum II",
  //   position: [-2, 2, 8],
  //   description: "Thirteenth highest (8,035m), among the Gasherbrum group.",
  // },
  // {
  //   label: "Shishapangma",
  //   position: [0, 2, -10],
  //   description: "Fourteenth highest (8,027m), entirely within Tibet.",
  // },
];
