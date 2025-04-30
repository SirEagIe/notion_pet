import { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import { data } from "./data";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import CardModal from "./components/CardModal";


function App() {
  const [dashboards, setDashboards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const modalRef = useRef();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    fetch('http://sireagle.ru:8889/kanban_board/?columns=1&cards=1')
      .then(r => r.json())
      .then(r => {
        r.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards = col.cards.sort((a, b) => (a.position - b.position));
          });
        });
        setDashboards(r)
      });
  }, [])

  function moveCard(card_id, col_id, before_card_id) {
    setDashboards((prevState) => {
      var moved_card = null;
      var newState = [...prevState];
      let position = 0;
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
        // если в конец -- ищем максимальную позицию и делаем +100
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id == col_id) {
              col.cards.forEach((card) => {
                if (card.position > position) {
                  position = card.position;
                }
              });
            }
          });
        });
        position += 100;
        moved_card.position = position;
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === col_id) col.cards.push(moved_card);
          });
        });
      } else {
        // если не в конец, ищем между чем
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === col_id) {
              var idx_before = col.cards.findIndex(
                (card) => card.id === before_card_id
              );
              if (idx_before == 0) {
                position = Math.round(col.cards[idx_before].position / 2);
              }
              else {
                position = Math.round((col.cards[idx_before].position + col.cards[idx_before - 1].position) / 2);
              }
            }
          });
        });
        moved_card.position = position;
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
      fetch('http://sireagle.ru:8889/kanban_card/' + card_id + '/', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column: col_id,
          position: position,
        })
      })
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
      {createPortal(
        <CardModal
          selectedCard={selectedCard}
          selectedColumn={selectedColumn}
          modalRef={modalRef}
          dashboards={dashboards}
          setDashboards={setDashboards}
        />,
        document.getElementById("modal")
      )}
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
              modalRef={modalRef}
              setSelectedCard={setSelectedCard}
              setSelectedColumn={setSelectedColumn}
            />
          ))}
        </DndContext>
      </div>
    </>
  );
}

export default App;
