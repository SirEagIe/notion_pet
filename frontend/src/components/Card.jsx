import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function Card({ data }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id, data: { type: "card" } });
  const style = {
    backgroundColor: "aquamarine",
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <>
      <div
        className="row m-1"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div className="col">{data.name}</div>
      </div>
    </>
  );
}
