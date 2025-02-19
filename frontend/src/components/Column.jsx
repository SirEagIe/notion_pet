import Card from "./Card";
import CardModal from "./CardModal";
import DroppableContainer from "./DroppableContainer";
import { useRef, Fragment } from "react";
import { createPortal } from "react-dom";

export default function Column({ data, dashboards, setDashboards }) {
  const style = {
    backgroundColor: "blueviolet",
  };
  const modalRef = useRef();
  return (
    <>
      {createPortal(
        <CardModal
          data={{
            id: -1,
            col_id: data.id,
            name: "-",
            text: "-",
          }}
          modalRef={modalRef}
          dashboards={dashboards}
          setDashboards={setDashboards}
        />,
        document.getElementById("modal")
      )}
      <div className="m-1 p-1 rounded-xl w-full" style={style}>
        {data.name}
        <div>
          {data.cards.map((card) => (
            <Fragment key={card.id}>
              <DroppableContainer
                key={data.id + "_" + card.id}
                data={{
                  id: data.id + "_" + card.id,
                  column: data.id,
                  card: card.id,
                }}
              />
              <Card
                key={card.id}
                data={card}
                dashboards={dashboards}
                setDashboards={setDashboards}
              />
            </Fragment>
          ))}
        </div>

        <DroppableContainer
          key={data.id + "_0"}
          data={{ id: data.id + "_0", column: data.id, card: 0 }}
        />

        <button
          className="bg-gray-800 rounded-2xl mt-1 mb-1 p-1 w-10"
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
