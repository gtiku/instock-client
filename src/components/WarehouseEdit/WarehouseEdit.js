import "./WarehouseEdit.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormCardDetails from "../FormCardDetails/FormCardDetails";
import FormCardContact from "../FormCardContact/FormCardContact";
import Button from "../Button/Button";
import arrowBack from "../../assets/images/Icons/arrow_back-24px.svg";
const BASE_API_URL = "http://localhost:8080/api/v1";

export default function WarehouseEdit() {
  document.title = "Edit Warehouse - InStock";
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    try {
      async function getWarehouseName() {
        const { data } = await axios.get(`${BASE_API_URL}/warehouses/${id}`);
        setWarehouseName(data.warehouse_name);
        console.log(warehouseName);
      }
      getWarehouseName();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleChange = (event) => {
    setWarehouseInfo({
      ...warehouseInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { warehouseName, address, city, country, contactName, contactPosition, contactPhone, contactEmail } = warehouseInfo;

     if ( !warehouseName || !address || !city || !country || !contactName || !contactPosition || !contactPhone || !contactEmail ) {
      alert("All fields are required")
    } else {
      updatedWarehouse();
      navigate(`/warehouses`);
    }
  };

  const updatedWarehouse = async () => {
    try {
      const snakedWarehouseInfo = Object.keys(warehouseInfo).reduce(
        (snaked, key) => {
          snaked[snakeCase(key)] = warehouseInfo[key];
          return snaked;
        }
      );

      const request = await axios.put(
        `${BASE_API_URL}/warehouses/${id}`,
        snakedWarehouseInfo
      );
      console.log(request.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  function snakeCase(string) {
    return string.replace(
      /([A-Z])/g,
      (_, letter) => `_${letter.toLowerCase()}`
    );
  }

  const handleCancel = () => {
    navigate("/warehouses");
  };

  return (
    <section className="warehouse container-wrap">
      <div className="warehouse__title-wrap">
        <img
          src={arrowBack}
          className="icon"
          alt="left arrow"
          onClick={goBack}
        />
        <h1>Edit Warehouse</h1>
      </div>
      <form className="warehouse__card-wrap" onSubmit={handleSubmit}>
        <FormCardDetails
          handleChange={handleChange}
          warehouseName={warehouseName}
        />
        <FormCardContact handleChange={handleChange} />
      </form>
      <div className="warehouse__button-wrap">
        <Button
          className="button-secondary warehouse__form-button"
          value="Cancel"
          onClick={handleCancel}
        />
        <Button
          className="button-primary warehouse__form-button"
          value="Edit Warehouse"
          type="submit"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
}
