import { useDroppable } from "@dnd-kit/core";

export default function DroppableContainer({ data }) {
  const { isOver, setNodeRef } = useDroppable({
    id: data.id,
    data: {
      column: data.column,
      card: data.card,
    },
  });
  const style = {
    border: "solid 1px rgba(0, 0, 0, 0)",
    borderColor: isOver ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0)",
  };
  return (
    <>
      <div style={style} ref={setNodeRef}></div>
    </>
  );
}
