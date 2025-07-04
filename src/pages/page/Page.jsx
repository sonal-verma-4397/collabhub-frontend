import React from "react";
import { useParams } from "react-router-dom";

export default function Page() {
  const params = useParams();
  return <div>Page: {params.pageId}</div>;
}
