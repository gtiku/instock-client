import "../../pages/WarehouseListPage/WarehouseListPage";
import "./ListOfWarehouses.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import chevron from "../../assets/images/Icons/chevron_right-24px.svg";
import EditDeleteIcons from "../EditDeleteIcons/EditDeleteIcons";

export default function ListOfWarehouses() {
  const [warehouseList, setWarehouseList] = useState([]);
  const warehouseUrl = "http://localhost:8080/api/v1/warehouses";

  useEffect(() => {
    const getWarehouses = async () => {
      const { data } = await axios.get(warehouseUrl);
      setWarehouseList(data);
    };
    getWarehouses();
  }, []);

  if (!warehouseList) {
    return <h1 className="Loading">Loading...</h1>;
  }

  return warehouseList.map((warehouse) => {
    let id = warehouse.id;
    let warehouseName = warehouse.warehouse_name;
    let address = warehouse.address;
    let city = warehouse.city;
    let country = warehouse.country;
    let contactName = warehouse.contact_name;
    let contactPhone = warehouse.contact_phone;
    let contactEmail = warehouse.contact_email;

    return (
      <section key={id} className="warehouse-item">
        <article className="warehouse-item__info-container">
          <article className="warehouse-item__name-container">
            <h4 className="warehouse-item__title">WAREHOUSE</h4>
            <Link
              to={`/warehouses/${id}`}
              className="warehouse-item__name-link text-link"
            >
              {warehouseName}
              <img
                src={chevron}
                alt="right arrow"
                className="warehouse-item__name-arrow"
              />
            </Link>
          </article>
          <article className="warehouse-item__address-container">
            <h4 className="warehouse-item__title">ADDRESS</h4>
            <p className="warehouse-item__address-content">
              {address}
              <br />
              {city}, {country}
            </p>
          </article>
          <article className="warehouse-item__contact-name-container">
            <h4 className="warehouse-item__title">CONTACT NAME</h4>
            <p className="warehouse-item__contact-name-content">
              {contactName}
            </p>
          </article>
          <article className="warehouse-item__contact-info-container">
            <h4 className="warehouse-item__title">CONTACT INFORMATION</h4>
            <p className="warehouse-item__contact-info-content">
              {contactPhone}
              <br />
              {contactEmail}
            </p>
          </article>
        </article>
        <article className="warehouse-item__edit-delete-container">
          <EditDeleteIcons
            id={id}
            setState={setWarehouseList}
            header={`Delete ${warehouseName} warehouse?`}
            content={`Please confirm that you'd like to delete ${warehouseName} from the warehouse list. You won't be able to undo this action.`}
            url={`/warehouses/${id}/edit`}
            apiUrlGet={"http://localhost:8080/api/v1/warehouses"}
            apiUrlDelete={"http://localhost:8080/api/v1/warehouses"}
          />
        </article>
      </section>
    );
  });
}
