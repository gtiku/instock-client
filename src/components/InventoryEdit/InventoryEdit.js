import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import error from "../../assets/icons/error-24px.svg";
import "./InventoryEdit.scss";
import "../InventoryAdd/InventoryAdd.scss";

export default function InventoryEdit() {
  document.title = "Edit Item - InStock";
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [warehouse, setWarehouse] = useState("default");
  const [allWarehouses, setAllWarehouses] = useState([]);
  const [addNameClass, setAddNameClass] = useState("");
  const [addDescriptionClass, setAddDescriptionClass] = useState("");
  const [addCategoryClass, setAddCategoryClass] = useState("");
  const [addQuantityClass, setAddQuantityClass] = useState("");
  const [addWarehouseClass, setAddWarehouseClass] = useState("");

  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isLoading && allWarehouses.length === 0) {
      const getWarehouseNames = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:8080/api/v1/warehouses/"
          );
          setAllWarehouses(data);
        } catch (error) {
          console.error(error);
        }
      };
      getWarehouseNames();
    }
  });

  useEffect(() => {
    if (isLoading) {
      const getCurrentItem = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8080/api/v1/inventories/${id}`
          );
          setName(data.item_name);
          setDescription(data.description);
          setCategory(data.category);
          setStatus(data.status);
          setQuantity(data.quantity);
          setWarehouse(data.warehouse_id);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      getCurrentItem();
    }
  });

  const checkValidity = () => {
    if (name.trim().length === 0) {
      setAddNameClass("inventory-item-form__form-input--invalid");
    }
    if (description.trim().length === 0) {
      setAddDescriptionClass("inventory-item-form__form-description--invalid");
    }
    if (category === "default") {
      setAddCategoryClass("inventory-item-form__form-select--invalid");
    }
    if (
      (status === "In Stock" && quantity <= 0) ||
      (status === "Out of Stock" && quantity > 0)
    ) {
      setAddQuantityClass("inventory-item-form__form-input--invalid");
    }

    if (warehouse === "default") {
      setAddWarehouseClass("inventory-item-form__form-select--invalid");
    }

    console.log(`
    name: ${name} - ${name.trim().length > 0}
    description: ${description} - ${description.trim().length > 0}
    category: ${category} - ${category !== "default"}
    status: ${status} - ${status === "In Stock" || status === "Out of Stock"}
    quantity: ${quantity}
    warehouse: ${warehouse} - ${warehouse !== "default"}`);
  };

  const errorTag = (
    <p className="inventory-item-form__error">
      <img
        src={error}
        alt="required field"
        className="inventory-item-form__error-image"
      />
      This is a required field
    </p>
  );

  const updateNewItem = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/inventories/${id}`, {
        name: name,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
        warehouse: warehouse,
      });
      console.log("PUT sent");
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setTimeout(() => checkValidity(), 500);

    if (
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      (status === "In Stock" || status === "Out of Stock") &&
      ((status === "In Stock" && quantity > 0) ||
        (status === "Out of Stock" && quantity === 0)) &&
      category !== "default" &&
      warehouse !== "default"
    ) {
      updateNewItem();
      navigate("/inventories");
    } else {
      console.log("Invalid inputs");
    }
  };

  return (
    <section className="inventory-item-form">
      <div className="inventory-item-form__header-block">
        <img
          src={arrow_back}
          alt="go back"
          className="inventory-item-form__go-back"
          onClick={goBack}
        />
        <h1 className="inventory-item-form__header">Edit Inventory Item</h1>
      </div>

      <form onSubmit={submitHandler} className="inventory-item-form__form">
        <div className="inventory-item-form__form-fields">
          <div className="inventory-item-form__form-details">
            <h2 className="inventory-item-form__form-subheader">
              Item Details
            </h2>
            <label
              htmlFor="item-name"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Item Name
              </h3>
              <input
                type="text"
                id="item-name"
                name="item-name"
                className={`inventory-item-form__form-input ${addNameClass}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setAddNameClass("");
                }}
              />
              {!!addNameClass ? errorTag : null}
            </label>
            <label
              htmlFor="description"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Description
              </h3>
              <textarea
                type="text"
                id="description"
                name="description"
                className={`inventory-item-form__form-description ${addDescriptionClass}`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setAddDescriptionClass("");
                }}
              />
              {!!addDescriptionClass ? errorTag : null}
            </label>
            <label
              htmlFor="category"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">Category</h3>
              <select
                type="text"
                id="category"
                name="category"
                className={`inventory-item-form__form-select ${addCategoryClass}`}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setAddCategoryClass("");
                }}
              >
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Health">Health</option>
              </select>
              {!!addCategoryClass ? errorTag : null}
            </label>
          </div>
          <div className="inventory-item-form__form-availability">
            <h2 className="inventory-item-form__form-subheader">
              Item Availability
            </h2>
            <label
              htmlFor="inStockStatus"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">Status</h3>
              <div className="inventory-item-form__radio-block">
                <label
                  htmlFor="inStockStatus"
                  className="inventory-item-form__form-radio-input-label"
                >
                  <input
                    type="radio"
                    id="inStockStatus"
                    name="inStockStatus"
                    className="inventory-item-form__form-radio-input"
                    value="In Stock"
                    checked={status === "In Stock"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />

                  <p className="inventory-item-form__form-radio-text">
                    In stock
                  </p>
                </label>
                <label
                  htmlFor="outOfStockStatus"
                  className="inventory-item-form__form-radio-input-label"
                >
                  <input
                    type="radio"
                    id="outOfStockStatus"
                    name="outOfStockStatus"
                    className="inventory-item-form__form-radio-input"
                    value="Out of Stock"
                    checked={status === "Out of Stock"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setQuantity(0);
                    }}
                  />
                  <p className="inventory-item-form__form-radio-text">
                    Out of stock
                  </p>
                </label>
              </div>
            </label>
            <label
              htmlFor="quantity"
              className={`inventory-item-form__form-label ${
                status === "In Stock"
                  ? ""
                  : "inventory-item-form__form-label--hidden"
              }`}
            >
              <h3 className="inventory-item-form__form-label-text">Quantity</h3>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                className={`inventory-item-form__form-input ${addQuantityClass}`}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setAddQuantityClass("");
                }}
              />
              {!!addQuantityClass && quantity >= 0 ? errorTag : null}
            </label>
            <label
              htmlFor="warehouse"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Warehouse
              </h3>
              <select
                type="text"
                id="warehouse"
                name="warehouse"
                className={`inventory-item-form__form-select ${addWarehouseClass}`}
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                  setAddWarehouseClass("");
                }}
              >
                {allWarehouses.map((warehouse) => {
                  return (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouse_name}
                    </option>
                  );
                })}
              </select>
              {!!addWarehouseClass ? errorTag : null}
            </label>
          </div>
        </div>
        <div className="inventory-item-form__form-buttons">
          <button
            type="button"
            className="inventory-item-form__cancel"
            onClick={goBack}
          >
            <h3 className="inventory-item-form__form-button-text">Cancel</h3>
          </button>
          <button className="inventory-item-form__save">
            <h3 className="inventory-item-form__form-button-text">Save</h3>
          </button>
        </div>
      </form>
    </section>
  );
}
