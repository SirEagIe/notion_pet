import Card from "./Card";
import DroppableContainer from "./DroppableContainer";
import { Fragment } from "react";

export default function Column({ data }) {
  const style = {
    backgroundColor: "blueviolet",
  };
  return (
    <>
      <div className="col m-1 pb-2" style={style}>
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
              <Card key={card.id} data={card} />
            </Fragment>
          ))}
        </div>

        <DroppableContainer
          key={data.id + "_0"}
          data={{ id: data.id + "_0", column: data.id, card: 0 }}
        />
      </div>
    </>
  );
}
