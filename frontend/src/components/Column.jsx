import Card from "./Card";
import CardModal from "./CardModal";
import DroppableContainer from "./DroppableContainer";
import { useRef, Fragment } from "react";
import { createPortal } from "react-dom";

export default function Column({ colomnData, dashboards, setDashboards }) {
  const style = {
    backgroundColor: "blueviolet",
  };
  const modalRef = useRef();
  return (
    <>
      {createPortal(
        <CardModal
          cardData={{
            id: -1,
            col_id: colomnData.id,
            name: "-",
            text: "-",
            images: [],
          }}
          modalRef={modalRef}
          dashboards={dashboards}
          setDashboards={setDashboards}
          editMode={true}
        />,
        document.getElementById("modal")
      )}
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
                dashboards={dashboards}
                setDashboards={setDashboards}
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
            modalRef.current.showModal();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
