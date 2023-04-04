import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import error from "../../assets/icons/error-24px.svg";
import "./InventoryAdd.scss";

const InventoryAdd = () => {
  document.title = "Add New Item - InStock";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("default");
  const [status, setStatus] = useState("Out of Stock");
  const [quantity, setQuantity] = useState(0);
  const [warehouse, setWarehouse] = useState("default");
  const [allWarehouses, setAllWarehouses] = useState([]);
  const [valid, setValid] = useState(false);
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
    if (allWarehouses.length === 0) {
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

  const checkValidity = () => {
    if (name.trim().length === 0) {
      setAddNameClass("inventory-item-form__form-input--invalid");
      setValid(false);
    }
    if (description.trim().length === 0) {
      setAddDescriptionClass("inventory-item-form__form-description--invalid");
      setValid(false);
    }
    if (category === "default") {
      setAddCategoryClass("inventory-item-form__form-select--invalid");
      setValid(false);
    }

    if (
      (status === "In Stock" && quantity <= 0) ||
      (status === "Out of Stock" && quantity > 0)
    ) {
      setAddQuantityClass("inventory-item-form__form-input--invalid");
      setValid(false);
    }

    if (warehouse === "default") {
      setAddWarehouseClass("inventory-item-form__form-select--invalid");
      setValid(false);
    }

    setValid(
      name.trim().length > 0 &&
        description.trim().length > 0 &&
        ((status === "In Stock" && quantity > 0) ||
          (status === "Out of Stock" && quantity === 0)) &&
        category !== "default" &&
        warehouse !== "default"
    );
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

  const postNewItem = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/inventories/`, {
        name: name,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
        warehouse: warehouse,
      });
      console.log("POST sent");
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkValidity();
    console.log(valid);
    if (
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      ((status === "In Stock" && quantity > 0) ||
        (status === "Out of Stock" && quantity === 0)) &&
      category !== "default" &&
      warehouse !== "default"
    ) {
      postNewItem();
      navigate("/inventories");
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

        <h1 className="inventory-item-form__header">Add New Inventory Item</h1>
      </div>

      <form onSubmit={submitHandler} className="inventory-item-form__form">
        <div className="inventory-item-form__form-fields">
          <div className="inventory-item-form__form-details">
            <h2 className="inventory-item-form__form-subheader">
              Item Details
            </h2>
            <label
              htmlFor="add-item-name"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Item Name
              </h3>
              <input
                type="text"
                id="add-item-name"
                name="item-name"
                placeholder="Item Name"
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
              htmlFor="add-description"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Description
              </h3>
              <textarea
                type="text"
                id="add-description"
                name="description"
                placeholder="Please enter a brief item description..."
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
              htmlFor="add-category"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">Category</h3>
              <select
                type="text"
                id="add-category"
                name="category"
                className={`inventory-item-form__form-select ${addCategoryClass}`}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setAddCategoryClass("");
                }}
              >
                <option
                  defaultValue="default"
                  className="inventory-item-form__form-select-option"
                >
                  Please select
                </option>
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
              htmlFor="add-inStockStatus"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">Status</h3>
              <div className="inventory-item-form__radio-block">
                <label
                  htmlFor="add-inStockStatus"
                  className="inventory-item-form__form-radio-input-label"
                >
                  <input
                    type="radio"
                    id="add-inStockStatus"
                    name="inStockStatus"
                    value="In Stock"
                    className="inventory-item-form__form-radio-input"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    checked={status === "In Stock"}
                  />

                  <p className="inventory-item-form__form-radio-text">
                    In stock
                  </p>
                </label>
                <label
                  htmlFor="add-outOfStockStatus"
                  className="inventory-item-form__form-radio-input-label"
                >
                  <input
                    type="radio"
                    id="add-outOfStockStatus"
                    name="outOfStockStatus"
                    value="Out of Stock"
                    className="inventory-item-form__form-radio-input"
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setQuantity(0);
                    }}
                    checked={status === "Out of Stock"}
                  />
                  <p className="inventory-item-form__form-radio-text">
                    Out of stock
                  </p>
                </label>
              </div>
            </label>
            <label
              htmlFor="add-quantity"
              className={`inventory-item-form__form-label ${
                status === "In Stock"
                  ? ""
                  : "inventory-item-form__form-label--hidden"
              }`}
            >
              <h3 className="inventory-item-form__form-label-text">Quantity</h3>
              <input
                type="number"
                id="add-quantity"
                name="quantity"
                placeholder="0"
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
              htmlFor="add-warehouse"
              className="inventory-item-form__form-label"
            >
              <h3 className="inventory-item-form__form-label-text">
                Warehouse
              </h3>
              <select
                type="text"
                id="add-warehouse"
                name="warehouse"
                className={`inventory-item-form__form-select ${addWarehouseClass}`}
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                  setAddWarehouseClass("");
                }}
              >
                <option
                  defaultValue="default"
                  className="inventory-item-form__form-select-option"
                >
                  Please select
                </option>
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
            <h3 className="inventory-item-form__form-button-text">+Add Item</h3>
          </button>
        </div>
      </form>
    </section>
  );
};

export default InventoryAdd;
