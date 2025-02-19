import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";

export default function Card({ data, modalRef, dashboards, setDashboards }) {
  const [cardName, setCardName] = useState(data.name);
  const [cardData, setCardData] = useState(data.text);
  const [isEditMode, setIsEditMode] = useState(false);

  function saveDashboards() {
    setDashboards((prevState) => {
      let newState = [...prevState];
      if (data.id !== -1) {
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards.forEach((card) => {
              if (card.id === data.id) {
                card.name = cardName;
                card.text = cardData;
              }
            });
          });
        });
      } else {
        let max_id = 0;
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards.forEach((card) => {
              if (card.id > max_id) {
                max_id = card.id;
              }
            });
          });
        });
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === data.col_id) {
              col.cards.push({
                id: max_id + 1,
                name: cardName,
                text: cardData,
              });
            }
          });
        });
      }
      return newState;
    });
  }

  return (
    <>
      {createPortal(
        <dialog
          className="backdrop:bg-gray-950 backdrop:opacity-50 text-center self-center mx-auto rounded-xl p-5 w-screen h-screen outline-0"
          ref={modalRef}
          onClose={() => {
            setCardData(data.text);
            setIsEditMode(false);
          }}
        >
          <div>
            {isEditMode ? (
              <div className="">
                <textarea
                  className="border-b-emerald-700 rounded-xl border-3 w-full"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                />
              </div>
            ) : (
              <div>{data.name}</div>
            )}
            {isEditMode ? (
              <div className="">
                <textarea
                  className="border-b-emerald-700 rounded-xl border-3 w-full"
                  value={cardData}
                  onChange={(e) => setCardData(e.target.value)}
                  type="text"
                />
              </div>
            ) : (
              <div>{cardData}</div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
              onClick={saveDashboards}
            >
              Save
            </button>
          </div>
        </dialog>,
        document.getElementById("modal")
      )}
    </>
  );
}
