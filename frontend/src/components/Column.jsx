import Place from "./Place";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ data }) {
  const { isOver, setNodeRef } = useDroppable({
    id: data.id,
  });
  const style = {
    backgroundColor: "blueviolet",
    color: isOver ? "green" : undefined,
  };
  return (
    <>
      <div className="col" style={style} ref={setNodeRef}>
        <p>{data.name}</p>
        {data.cards.map((card) => (
          <Place key={card.id}>
            <Card key={card.id} data={card} />
          </Place>
        ))}
      </div>
    </>
  );
}
