import { standManagementData } from "@/data/exhibition-map/standManagementData";

export const standLookup = Object.fromEntries(
  standManagementData.map((stand) => [stand.stand_no, stand])
);