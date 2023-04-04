import "./WarehouseAdd.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FormCardDetails from "../FormCardDetails/FormCardDetails";
import FormCardContact from "../FormCardContact/FormCardContact";
import Button from "../Button/Button";
import arrowBack from "../../assets/images/Icons/arrow_back-24px.svg";
const BASE_API_URL = "http://localhost:8080/api/v1";

export default function WarehouseAdd() {
  document.title = "Add Warehouse - InStock";
  const [warehouseInfo, setWarehouseInfo] = useState({});

  const handleChange = (event) => {
    setWarehouseInfo({
      ...warehouseInfo,
      [event.target.name]: event.target.value,
    });
  }; 

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { warehouseName, address, city, country, contactName, contactPosition, contactPhone, contactEmail } = warehouseInfo;
   
    if ( !warehouseName || !address || !city || !country || !contactName || !contactPosition || !contactPhone || !contactEmail ) {
      alert("All fields are required")
    } else  {
      postWarehouse();
      goBack();
    }
}

const postWarehouse = async () =>   { 
  try {
    const warehouseInfoWithId = { ...warehouseInfo, id: uuidv4() };
    const snakedWarehouseInfo = Object.keys(warehouseInfoWithId).reduce(
      (snaked, key) => {
        snaked[snakeCase(key)] = warehouseInfoWithId[key];
        return snaked;
      },
      {}
    );

    const request = await axios.post(
      `${BASE_API_URL}/warehouses`,
      snakedWarehouseInfo
    );
    console.log(request.data)
    navigate(-1);
  } catch (error) {
    console.error("Error: ", error);
  }}

  const snakeCase = (string) => {
    return string.replace(
      /([A-Z])/g,
      (_, letter) => `_${letter.toLowerCase()}`
    );
  };

  const navigate = useNavigate();

  return (
    <section className="warehouse container-wrap">
      <div className="warehouse__title-wrap">
        <img
          src={arrowBack}
          className="icon"
          alt="left arrow"
          onClick={goBack}
        />
        <h1>Add New Warehouse</h1>
      </div>
      <form className="warehouse__card-wrap" onSubmit={handleSubmit}>
        <FormCardDetails handleChange={handleChange} />
        <FormCardContact handleChange={handleChange} />
      </form>
      <div className="warehouse__button-wrap">
        <Button
          className="button-secondary warehouse__form-button"
          value="Cancel"
          type="submit"
          onClick={goBack}
        />
        <Button
          className="button-primary warehouse__form-button"
          value="+ Add Warehouse"
          type="submit"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
}
