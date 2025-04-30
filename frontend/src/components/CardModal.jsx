import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";


export default function CardModal({
  selectedCard,
  selectedColumn,
  modalRef,
  dashboards,
  setDashboards
}) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardText, setCardText] = useState("");
  const [cardImages, setCardImages] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (selectedCard !== -1) {
      fetch('http://sireagle.ru:8889/kanban_card/' + selectedCard + '/?images=1')
      .then(r => r.json())
      .then(r => {
          setCardTitle(r.title);
          setCardText(r.text);
          setCardImages(r.images || []);
        }
      )
    }
    else {
      setCardTitle("");
      setCardText("");
      setCardImages([]);
      setIsEditMode(true);
    }
  }, [selectedCard])

  function deleteCard() {
    setIsEditMode(false);
    fetch('http://sireagle.ru:8889/kanban_card/' + selectedCard + '/', {
      method: "DELETE"
    })
    setDashboards((prevState) => {
      let newState = [...prevState];
      newState.forEach((dash) => {
        dash.columns.forEach((col) => {
          col.cards = col.cards.filter((card) => card.id !== selectedCard);
        });
      });
      return newState;
    })
    modalRef.current.close();
  }

  function saveCard() {
    setIsEditMode(false);

    if (selectedCard !== -1) {
      fetch('http://sireagle.ru:8889/kanban_card/' + selectedCard + '/', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: cardTitle,
          text: cardText
        })
      })
      setDashboards((prevState) => {
        let newState = [...prevState];
        newState.forEach((dash) => {
          dash.columns.forEach((col) => {
            col.cards.forEach((card) => {
              if (card.id === selectedCard) {
                card.title = cardTitle;
                card.text = cardText;
                card.images = cardImages;
              }
            });
          });
        });
        return newState;
      });
    } else {
      let position = 0;
      dashboards.forEach((dash) => {
        dash.columns.forEach((col) => {
          if (col.id == selectedColumn) {
            col.cards.forEach((card) => {
              if (card.position > position) {
                position = card.position;
              }
            });
          }
        });
      });
      fetch('http://sireagle.ru:8889/kanban_card/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: cardTitle,
          text: cardText,
          column: selectedColumn,
          position: position + 100,
        })
      })
      .then(r => r.json())
      .then(
        (r) => {
          cardImages.forEach((image) => {
            fetch('http://sireagle.ru:8889/kanban_card_image/', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: image,
                card: r.id
              })
            })
          })
        }
      );
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
            if (col.id === selectedColumn) {
              col.cards.push({
                id: max_id + 1,
                title: cardTitle,
                text: cardText,
                images: cardImages,
                position: position + 100,
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
          setIsEditMode(false);
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
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
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
            onClick={saveCard}
            disabled={!isEditMode}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-danger mx-3"
            onClick={deleteCard}
            // disabled={!isEditMode}
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
}
