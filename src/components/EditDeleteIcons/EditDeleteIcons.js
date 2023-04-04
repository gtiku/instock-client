import "./EditDeleteIcons.scss";
import Modal from "../Modal/Modal";
import deleteIcon from "../../assets/images/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/images/Icons/edit-24px.svg";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditDeleteIcons({
  header,
  content,
  id,
  setState,
  url,
  apiUrlDelete,
  apiUrlGet,
}) {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="list-icons__edit-delete-container">
      <img
        src={deleteIcon}
        alt="delete icon"
        className="list-icons__item-delete"
        onClick={() => setShowModal(true)}
      />
      {showModal &&
        createPortal(
          <Modal
            id={id}
            setState={setState}
            header={header}
            content={content}
            apiUrlDelete={apiUrlDelete}
            apiUrlGet={apiUrlGet}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById("portal")
        )}
      <img
        src={editIcon}
        alt="edit icon"
        className="list-icons__item-edit"
        onClick={() => navigate(url)}
      />
    </section>
  );
}
