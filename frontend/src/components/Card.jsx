import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import CardModal from "./CardModal";

export default function Card({ data }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });
  const modalRef = useRef();
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
        {createPortal(
          <CardModal data={data} modalRef={modalRef} />,
          document.getElementById("modal")
        )}
        <div
          className="col"
          style={{ height: "100px" }}
          onClick={() => {
            modalRef.current.showModal();
          }}
        >
          {data.name}
        </div>
      </div>
    </>
  );
}
