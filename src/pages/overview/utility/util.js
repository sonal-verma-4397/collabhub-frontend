import { COLOR_TO_HEX } from "../../../data/constants";

export const getColor = (label) => COLOR_TO_HEX[label.color] || "#6b7280";
