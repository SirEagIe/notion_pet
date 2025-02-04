import Card from "./Card";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Column({ data, dragOverlayHeight }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id, data: { type: "column" } });
  const style = {
    backgroundColor: "blueviolet",
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  if (isDragging) {
    return (
      <>
        <div
          className="col m-1"
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        ></div>
      </>
    );
  }
  return (
    <>
      <div
        className="col m-1"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {data.name}
        <SortableContext
          items={data.cards}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {data.cards.map((card) => (
              <Card key={card.id} data={card} />
            ))}
          </div>
        </SortableContext>
      </div>
    </>
  );
}
