import Column from "./Column";
import { useState } from "react";

export default function Dashboard({ data }) {
  return (
    <div
      className="row"
      style={{ backgroundColor: "antiquewhite", userSelect: "none" }}
    >
      <p>{data.name}</p>
      {data.columns.map((column) => (
        <Column key={column.id} data={column} />
      ))}
    </div>
  );
}
