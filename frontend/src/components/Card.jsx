import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ data }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });
  const style = {
    backgroundColor: "aquamarine",
    transform: CSS.Translate.toString(transform),
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
        <div className="col" style={{ height: "100px" }}>
          {data.name}
        </div>
      </div>
    </>
  );
}
