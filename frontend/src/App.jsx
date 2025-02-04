import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { data } from "./data";
import { DndContext } from "@dnd-kit/core";

function App() {
  const [dashboards, setDashboards] = useState(data);

  function moveCard(card_id, col_id) {
    console.log(card_id, col_id);
    setDashboards((prevState) => {
      var moved_card = null;
      var newState = [...prevState];
      newState.forEach((dash) => {
        dash.columns.forEach((col) => {
          var searched_card = col.cards.find((card) => card.id === card_id);
          if (searched_card) {
            moved_card = { ...searched_card };
            col.cards = col.cards.filter((card) => card.id !== card_id);
          }
        });
      });
      newState.forEach((dash) => {
        dash.columns.forEach((col) => {
          if (col.id === col_id) col.cards.push(moved_card);
        });
      });
      return newState;
    });
  }

  function handleDragEnd(event) {
    console.log(event);
  }

  return (
    <>
      <div className="container" style={{ backgroundColor: "aqua" }}>
        {dashboards.map((dash) => (
          <Dashboard key={dash.id} data={dash} />
        ))}
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={() => {
          moveCard(7, 2);
        }}
      >
        Click
      </button>
    </>
  );
}

export default App;
