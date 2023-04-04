import "./WarehouseDetails.scss";
import backArrow from "../../assets/images/Icons/arrow_back-24px.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EachWarehouseInventory from "../EachWarehouseInventory/EachWarehouseInventory";
import SortHeaders from "../SortHeaders/SortHeaders";

export default function WarehouseDetails() {
  document.title = "Warehouse Details - InStock";
  const BASE_API_URL = "http://localhost:8080/api/v1";
  const [currentWarehouse, setCurrentWarehouse] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    try {
      async function getWarehouse() {
        const { data } = await axios.get(`${BASE_API_URL}/warehouses/${id}`);
        setCurrentWarehouse(data);
      }
      getWarehouse();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const navigate = useNavigate();

  function clickHandler() {
    navigate(`/warehouses/${id}/edit`);
  }

  return (
    <div className="warehouse-container">
      <section className="warehouse-details">
        <div className="warehouse-details__container">
          {currentWarehouse && (
            <>
              <div className="warehouse-details__header">
                <div className="warehouse-details__name-container">
                  <Link to="/warehouses" className="warehouse-details__link">
                    <img
                      className="warehouse-details__arrow"
                      src={backArrow}
                      alt="back arrow"
                    ></img>
                  </Link>
                  <h1 className="warehouse-details__name">
                    {currentWarehouse.warehouse_name}
                  </h1>
                </div>
                <div className="warehouse-details__btn-container">
                  <button
                    onClick={clickHandler}
                    className="warehouse-details__btn warehouse-details__btn--mobile"
                  ></button>
                  <button
                    onClick={clickHandler}
                    className="warehouse-details__btn warehouse-details__btn--tablet"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <section className="warehouse-details__info">
                <div className="warehouse-details__address">
                  <span className="warehouse-details__title">
                    WAREHOUSE ADDRESS:
                  </span>
                  <div className="warehouse-details__address-container">
                    <span className="warehouse-details__content">
                      {`${currentWarehouse.address}, `}
                    </span>
                    <span className="warehouse-details__content">
                      {currentWarehouse.city}
                    </span>
                  </div>
                </div>
                <div className="warehouse-details__info-container">
                  <div className="warehouse-details__contact-name">
                    <span className="warehouse-details__title">
                      CONTACT NAME:
                    </span>
                    <span className="warehouse-details__content">
                      {currentWarehouse.contact_name}
                    </span>
                    <span className="warehouse-details__content">
                      {currentWarehouse.contact_position}
                    </span>
                  </div>
                  <div className="warehouse-details__contact-info">
                    <span className="warehouse-details__title">
                      CONTACT INFORMATION:
                    </span>
                    <span className="warehouse-details__content">
                      {currentWarehouse.contact_phone}
                    </span>
                    <span className="warehouse-details__content">
                      {currentWarehouse.contact_email}
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
        <div className="warehouse-details__headers">
          <SortHeaders />
        </div>
        <div>
          <EachWarehouseInventory />
        </div>
      </section>
    </div>
  );
}
