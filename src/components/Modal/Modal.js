import "./Modal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";

export default function Modal({
  onClose,
  id,
  setState,
  header,
  content,
  apiUrlGet,
  apiUrlDelete,
}) {
  function clickHandler() {
    try {
      async function deleteItem() {
        await axios.delete(`${apiUrlDelete}/${id}`);

        try {
          async function getItems() {
            const { data } = await axios.get(apiUrlGet);
            setState(data);
          }
          getItems();
        } catch (error) {
          console.log(error);
        }
      }
      deleteItem();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="modal-overlay"></div>
      <section className="modal">
        <div className="modal__icon-container">
          <img
            className="modal__icon"
            alt="close icon"
            src={closeIcon}
            onClick={onClose}
          ></img>
        </div>
        <div className="modal__title-container">
          <h1 className="modal__title">{header}</h1>
        </div>
        <div className="modal__content-container">
          <span className="modal__content">{content}</span>
        </div>
        <div className="modal__button-container">
          <button onClick={onClose} className="modal__button-cancel">
            Cancel
          </button>
          <button onClick={clickHandler} className="modal__button-delete">
            Delete
          </button>
        </div>
      </section>
    </>
  );
}
