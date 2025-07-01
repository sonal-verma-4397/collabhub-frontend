import { COLOR_TO_HEX } from "../../../data/constants";

export const getColor = (status) => COLOR_TO_HEX[status.color] || "#6b7280";
