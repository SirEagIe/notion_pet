import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import CardModal from "./CardModal";

export default function Card({ cardData, modalRef, setSelectedCard }) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: cardData.id,
    });
  const style = {
    backgroundColor: "aquamarine",
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      <div
        className="m-1"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div
          style={{ height: "100px" }}
          onClick={() => {
            setSelectedCard(cardData.id);
            modalRef.current.showModal();
          }}
        >
          {cardData.title}
          <br></br>
          <br></br>
          {cardData.position}
        </div>
      </div>
    </>
  );
}
