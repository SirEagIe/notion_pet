import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import CardModal from "./CardModal";

export default function Card({ cardData, dashboards, setDashboards }) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: cardData.id,
    });
  const modalRef = useRef();
  const style = {
    backgroundColor: "aquamarine",
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      {createPortal(
        <CardModal
          cardData={cardData}
          modalRef={modalRef}
          dashboards={dashboards}
          setDashboards={setDashboards}
        />,
        document.getElementById("modal")
      )}
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
            modalRef.current.showModal();
          }}
        >
          {cardData.name}
        </div>
      </div>
    </>
  );
}
