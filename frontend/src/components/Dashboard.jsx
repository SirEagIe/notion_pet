import Column from "./Column";
import { useState } from "react";

export default function Dashboard({
  dashboardData,
  dashboards,
  setDashboards,
}) {
  return (
    <div className="row text-center" style={{ userSelect: "none" }}>
      <div className="col">
        <div className="row">
          <div className="col">
            <p>{dashboardData.name}</p>
          </div>
        </div>
        <div className="row">
          {dashboardData.columns.map((column) => (
            <Column
              key={column.id}
              colomnData={column}
              dashboards={dashboards}
              setDashboards={setDashboards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
