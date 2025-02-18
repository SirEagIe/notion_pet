import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Editor from "react-simple-wysiwyg";

export default function Card({ data, modalRef }) {
  const [cardData, setCardData] = useState("-");
  return (
    <>
      {createPortal(
        <dialog ref={modalRef}>
          <Editor
            value={cardData}
            onChange={(e) => setCardData(e.target.value)}
          />
          {cardData}
        </dialog>,
        document.getElementById("modal")
      )}
    </>
  );
}
