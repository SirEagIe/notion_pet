import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CardModal({
  cardData,
  modalRef,
  dashboards,
  setDashboards,
  editMode = false,
}) {
  const [cardName, setCardName] = useState(cardData.name);
  const [cardText, setCardText] = useState(cardData.text);
  const [cardImages, setCardImages] = useState(cardData.images);
  const [isEditMode, setIsEditMode] = useState(editMode);

  function saveDashboards() {
    setIsEditMode(editMode);

    if (cardData.id !== -1) {
      setDashboards((prevState) => {
        let newState = [...prevState];
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards.forEach((card) => {
              if (card.id === cardData.id) {
                card.name = cardName;
                card.text = cardText;
                card.images = cardImages;
              }
            });
          });
        });
        return newState;
      });
    } else {
      setDashboards((prevState) => {
        let newState = [...prevState];
        let max_id = 0;
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards.forEach((card) => {
              if (card.id > max_id) {
                max_id = card.id;
              }
            });
          });
        });
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            if (col.id === cardData.col_id) {
              col.cards.push({
                id: max_id + 1,
                name: cardName,
                text: cardText,
                images: cardImages,
              });
            }
          });
        });
        return newState;
      });
      modalRef.current.close();
    }
  }

  const pasteImage = (event) => {
    if (isEditMode) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image")) {
          let file = items[i].getAsFile();
          console.log(file);
          let reader = new FileReader();
          reader.onload = (e) => {
            setCardImages((prevState) => {
              let newState = [];
              if (prevState) newState = [...prevState];
              newState.push(e.target.result);
              return newState;
            });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  return (
    <>
      <dialog
        className="text-center w-75"
        ref={modalRef}
        onClose={() => {
          setCardName(cardData.name);
          setCardText(cardData.text);
          setCardImages(cardData.images);
          setIsEditMode(editMode);
        }}
        style={{
          border: 0,
          borderRadius: "1em",
        }}
      >
        <div>
          <input
            disabled={!isEditMode}
            className="form-control mb-3 disabled"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            type="text"
          />
          <textarea
            disabled={!isEditMode}
            className="form-control mb-3 disabled"
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
            type="text"
            style={{ minHeight: "30vh", resize: "none" }}
            onPaste={pasteImage}
          />
          {cardImages.length > 0 && (
            <Carousel data-bs-theme="dark">
              {cardImages.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img className="img-fluid" src={image} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          <button
            className="btn btn-sm btn-primary mx-3"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-primary mx-3"
            onClick={saveDashboards}
          >
            Save
          </button>
        </div>
      </dialog>
    </>
  );
}
