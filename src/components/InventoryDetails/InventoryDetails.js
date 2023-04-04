import "./InventoryDetails.scss";
import backArrow from "../../assets/images/Icons/arrow_back-24px.svg";
import { useNavigate, useParams } from "react-router-dom";
import TagInStock from "../TagInStock/TagInStock";
import TagOutOfStock from "../TagOutOfStock/TagOutOfStock";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryDetails() {
  document.title = "Item Details - InStock";
  const BASE_API_URL = "http://localhost:8080/api/v1";
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    try {
      async function getItem() {
        const { data } = await axios.get(`${BASE_API_URL}/inventories/${id}`);
        setCurrentItem(data);
      }
      getItem();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  function clickHandler() {
    navigate(`/inventories/${id}/edit`);
  }

  return (
    <section className="inv-details">
      <div className="inv-details__container">
        {currentItem && (
          <>
            <div className="inv-details__header">
              <div className="inv-details__name-container">
                <img
                  onClick={goBack}
                  className="inv-details__arrow"
                  src={backArrow}
                  alt="back arrow"
                ></img>
                <h1 className="inv-details__name">{currentItem.item_name}</h1>
              </div>
              <div className="inv-details__btn-container">
                <button
                  onClick={clickHandler}
                  className="inv-details__btn inv-details__btn--mobile"
                ></button>
                <button
                  onClick={clickHandler}
                  className="inv-details__btn inv-details__btn--tablet"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="inv-details__divider"></div>

            <section className="inv-details__info">
              <div className="inv-details__desc-container">
                <div className="inv-details__desc">
                  <span className="inv-details__title">ITEM DESCRIPTION:</span>
                  <span className="inv-details__content">
                    {currentItem.description}
                  </span>
                </div>
                <div className="inv-details__cat-container">
                  <div className="inv-details__cat">
                    <span className="inv-details__title">CATEGORY:</span>
                    <span className="inv-details__content">
                      {currentItem.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="inv-details__info-container">
                <div className="inv-details__status-container">
                  <div className="inv-details__status">
                    <span className="inv-details__title">STATUS:</span>
                    {currentItem.quantity ? <TagInStock /> : <TagOutOfStock />}
                  </div>
                  <div className="inv-details__location">
                    <span className="inv-details__title">WAREHOUSE:</span>
                    <span className="inv-details__content">
                      {currentItem.warehouse_name}
                    </span>
                  </div>
                </div>
                <div className="inv-details__quantity">
                  <span className="inv-details__title">QUANTITY:</span>
                  <span className="inv-details__content">
                    {currentItem.quantity}
                  </span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
