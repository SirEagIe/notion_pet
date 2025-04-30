import Column from "./Column";
import { useState } from "react";

export default function Dashboard({ dashboardData, modalRef, setSelectedCard, setSelectedColumn }) {
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
              modalRef={modalRef}
              setSelectedCard={setSelectedCard}
              setSelectedColumn={setSelectedColumn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
