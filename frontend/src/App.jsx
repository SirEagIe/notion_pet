import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { data } from "./data";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";

function App() {
  const [dashboards, setDashboards] = useState(data);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function moveCard(card_id, col_id, before_card_id) {
    setDashboards((prevState) => {
      var moved_card = null;
      var newState = [...prevState];
      if (card_id === before_card_id) {
        return newState;
      }
      newState.forEach((dash) => {
        dash.columns.forEach((col) => {
          var searched_card = col.cards.find((card) => card.id === card_id);
          if (searched_card) {
            moved_card = { ...searched_card };
            col.cards = col.cards.filter((card) => card.id !== card_id);
          }
        });
      });
      if (before_card_id === 0) {
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === col_id) col.cards.push(moved_card);
          });
        });
      } else {
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === col_id) {
              var idx = col.cards.findIndex(
                (card) => card.id === before_card_id
              );
              col.cards.splice(idx, 0, moved_card);
            }
          });
        });
      }
      return newState;
    });
  }

  function handleDragEnd(event) {
    if (
      event.active.id &&
      event.over?.data.current.column !== undefined &&
      event.over?.data.current.card !== undefined
    ) {
      moveCard(
        event.active.id,
        event.over?.data.current.column,
        event.over?.data.current.card
      );
    }
  }

  return (
    <>
      <div className="container">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {dashboards.map((dash) => (
            <Dashboard
              key={dash.id}
              dashboardData={dash}
              dashboards={dashboards}
              setDashboards={setDashboards}
            />
          ))}
        </DndContext>
      </div>
    </>
  );
}

export default App;
