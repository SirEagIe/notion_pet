import Column from "./Column";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";

export default function Dashboard({ data }) {
  const [activeDragColumn, setActiveDragColumn] = useState(null);
  function handleDragStart(event) {
    console.log(event);
    if (event.active.data.current?.type == "column") {
      setActiveDragColumn(event.active.id);
    }
  }
  function handleDragEnd(event) {
    setActiveDragColumn(null);
  }
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {activeDragColumn}
      <div
        className="row"
        style={{ backgroundColor: "antiquewhite", userSelect: "none" }}
      >
        <p>{data.name}</p>
        <SortableContext
          items={data.columns}
          strategy={horizontalListSortingStrategy}
        >
          {data.columns.map((column) => (
            <Column key={column.id} data={column} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {data.columns
          .filter((column) => column.id == activeDragColumn)
          .map((column) => (
            <Column key={column.id} data={column} dragOverlayHeight={"100px"} />
          ))}
      </DragOverlay>
    </DndContext>
  );
}
