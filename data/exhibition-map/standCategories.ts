export interface StandType {
  id: number;
  name: string;
  color: string;
  standColor: string;
  size: string;
  shape?: string;
  price: number;
  stands: string;
}

export interface StandCategory {
  id: number;
  title: string;
  count: number;
  types: StandType[];
}

export const standCategories: StandCategory[] = [
  {
    id: 1,
    title: "Goff Complex",
    count: 19,
    types: [
      {
        id: 1,
        name: "Standard Size",
        color: "#879953",
        standColor: "#EEF1E3",
        size: "(3m × 2m)",
        price: 1750,
        stands: "2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 18, 19",
      },
      {
        id: 2,
        name: "Premium 1 Size",
        color: "#C69A67",
        standColor: "#F8F2EC",
        size: "(6m × 2m)",
        shape: "Rectangle",
        price: 3000,
        stands: "8",
      },
      {
        id: 3,
        name: "Premium 2 Size",
        color: "#CC1F2F",
        standColor: "#F9E8EA",
        size: "(4m × 2m)",
        shape: "Rectangle",
        price: 3000,
        stands: "11",
      },
      {
        id: 4,
        name: "Premium 3 Size",
        color: "#7A45A4",
        standColor: "#EDE3F5",
        size: "(4m × 3.5m)",
        shape: "Corner",
        price: 3000,
        stands: "17",
      },
      {
        id: 5,
        name: "Small Size",
        color: "#2EA7DF",
        standColor: "#E3F2FB",
        size: "(4m × 3.5m)",
        shape: "Corner",
        price: 1250,
        stands: "9",
      },
    ],
  },

  {
    id: 2,
    title: "Marquee",
    count: 72,
    types: [
      {
        id: 1,
        name: "Standard Size",
        color: "#E39A2F",
        standColor: "#FDF3E7",
        size: "(3m × 2m)",
        price: 1250,
        stands: "M1, M3 - M26, M28 - M49, M52 - M71",
      },
      {
        id: 2,
        name: "Premium A Size",
        color: "#2138A5",
        standColor: "#E8EBFB",
        size: "(3m × 3m)",
        shape: "Corner",
        price: 2250,
        stands: "M2",
      },
      {
        id: 3,
        name: "Premium B Size",
        color: "#F23491",
        standColor: "#FDE8F3",
        size: "(3m × 4m)",
        shape: "Square",
        price: 2700,
        stands: "M51",
      },
      {
        id: 4,
        name: "Premium C Size",
        color: "#FF5722",
        standColor: "#FFECE4",
        size: "(5m × 2m)",
        shape: "Rectangle",
        price: 2250,
        stands: "17",
      },
      {
        id: 5,
        name: "Premium D Size",
        color: "#26B5A8",
        standColor: "#E2F7F5",
        size: "(4m × 3m)",
        shape: "Corner",
        price: 1250,
        stands: "M27 & M72",
      },
    ],
  },

  {
    id: 3,
    title: "Outdoor",
    count: 0,
    types: [
      {
        id: 1,
        name: "Standard Size",
        color: "#E39A2F",
        standColor: "#FDF3E7",
        size: "(10m × 5m)",
        price: 1500,
        stands: "",
      },
    ],
  },
];