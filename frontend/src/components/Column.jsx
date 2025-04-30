import Card from "./Card";
import CardModal from "./CardModal";
import DroppableContainer from "./DroppableContainer";
import { useRef, Fragment } from "react";
import { createPortal } from "react-dom";

export default function Column({ colomnData, modalRef, setSelectedCard, setSelectedColumn }) {
  const style = {
    backgroundColor: "blueviolet",
  };

  return (
    <>
      <div className="col m-1" style={style}>
        {colomnData.name}
        <div>
          {colomnData.cards.map((card) => (
            <Fragment key={card.id}>
              <DroppableContainer
                key={colomnData.id + "_" + card.id}
                data={{
                  id: colomnData.id + "_" + card.id,
                  column: colomnData.id,
                  card: card.id,
                }}
              />
              <Card
                key={card.id}
                cardData={card}
                modalRef={modalRef}
                setSelectedCard={setSelectedCard}
              />
            </Fragment>
          ))}
        </div>

        <DroppableContainer
          key={colomnData.id + "_0"}
          data={{ id: colomnData.id + "_0", column: colomnData.id, card: 0 }}
        />

        <button
          className="btn btn-sm btn-primary m-2"
          onClick={() => {
            setSelectedColumn(colomnData.id);
            setSelectedCard(-1);
            modalRef.current.showModal();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
