import React from "react";
import { STATUS_COLOR } from "../../../../data/constants";

export default function Circle({ color = "red" }) {
  return (
    <span
      className={`size-4 border-2  ${STATUS_COLOR[color]} rounded-full block`}
    ></span>
  );
}
