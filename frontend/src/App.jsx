import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { data } from "./data";
import { DndContext } from "@dnd-kit/core";

function App() {
  const [dashboards, setDashboards] = useState(data);

  function moveCard(card_id, col_id) {
    var new_dashboards = [...dashboards];
    var moved_card = null;
    new_dashboards.forEach((dash) => {
      dash.columns.forEach((col) => {
        var searched_card = col.cards.find((card) => card.id === card_id);
        if (searched_card) {
          moved_card = { ...searched_card };
          col.cards = col.cards.filter((card) => card.id !== card_id);
        }
      });
    });
    new_dashboards.forEach((dash) => {
      dash.columns.forEach((col) => {
        if (col.id === col_id) col.cards.push(moved_card);
      });
    });
    setDashboards(new_dashboards);
  }

  function handleDragEnd(event) {
    console.log(event);
    if (event.over) moveCard(event.active.id, event.over.id);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="container" style={{ backgroundColor: "aqua" }}>
          {dashboards.map((dash) => (
            <Dashboard key={dash.id} data={dash} />
          ))}
        </div>
      </DndContext>
      <button
        className="btn btn-primary mt-5"
        onClick={() => {
          moveCard(
            Math.floor(Math.random() * 5 + 1),
            Math.floor(Math.random() * 5 + 1)
          );
        }}
      >
        Click
      </button>
    </>
  );
}

export default App;
