import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import CardModal from "./CardModal";

export default function Card({ data, dashboards, setDashboards }) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: data.id,
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
          data={data}
          modalRef={modalRef}
          dashboards={dashboards}
          setDashboards={setDashboards}
        />,
        document.getElementById("modal")
      )}
      <div
        className="p-1 m-1 outline-0 rounded-xl"
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
          {data.name}
        </div>
      </div>
    </>
  );
}
