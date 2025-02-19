import Column from "./Column";
import { useState } from "react";

export default function Dashboard({ data, dashboards, setDashboards }) {
  return (
    <div
      className="m-3 p-3 text-center rounded-xl"
      style={{ userSelect: "none" }}
    >
      <p>{data.name}</p>
      <div className="flex justify-between">
        {data.columns.map((column) => (
          <Column
            key={column.id}
            data={column}
            dashboards={dashboards}
            setDashboards={setDashboards}
          />
        ))}
      </div>
    </div>
  );
}
