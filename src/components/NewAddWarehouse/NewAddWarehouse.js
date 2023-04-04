import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import error from "../../assets/icons/error-24px.svg";
import "./NewAddWarehouse.scss";

const NewAddWarehouse = () => {
  document.title = "Add New Item - InStock";

  const [warehouseName, setWarehouseName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [valid, setValid] = useState(false);

  const [addNameClass, setAddNameClass] = useState("");
  const [addAddressClass, setAddAddressClass] = useState("");
  const [addCityClass, setAddCityClass] = useState("");
  const [addCountryClass, setAddCountryClass] = useState("");
  const [addContactClass, setAddContactClass] = useState("");
  const [addPositionClass, setAddPositionClass] = useState("");
  const [addPhoneClass, setAddPhoneClass] = useState("");
  const [addEmailClass, setAddEmailClass] = useState("");

  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const validPhone = (input) => {
    let check = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    console.log(check.test(input));
    return check.test(input);
  };

  const validEmail = (input) => {
    let check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(check.test(String(input).toLowerCase()));
    return check.test(String(input).toLowerCase());
  };

  const checkValidity = () => {
    if (warehouseName.trim().length === 0) {
      setAddNameClass("warehouse-form__form-input--invalid");
      setValid(false);
    }
    if (address.trim().length === 0) {
      setAddAddressClass("warehouse-form__form-description--invalid");
      setValid(false);
    }
    if (city.trim().length === 0) {
      setAddCityClass("warehouse-form__form-select--invalid");
      setValid(false);
    }
    if (country.trim().length === 0) {
      setAddCountryClass("warehouse-form__form-input--invalid");
      setValid(false);
    }

    if (contact.trim().length === 0) {
      setAddContactClass("warehouse-form__form-input--invalid");
      setValid(false);
    }

    if (position.trim().length === 0) {
      setAddPositionClass("warehouse-form__form-input--invalid");
      setValid(false);
    }

    if (!validPhone(phone)) {
      setAddPhoneClass("warehouse-form__form-select--invalid");
      setValid(false);
    }

    if (!validEmail(email)) {
      setAddEmailClass("warehouse-form__form-select--invalid");
      setValid(false);
    }

    setValid(
      warehouseName.trim().length > 0 &&
        address.trim().length > 0 &&
        city.trim().length > 0 &&
        country.trim().length > 0 &&
        contact.trim().length > 0 &&
        position.trim().length > 0 &&
        validPhone(phone) &&
        validEmail(email)
    );
  };

  const errorTag = (
    <p className="warehouse-form__error">
      <img
        src={error}
        alt="required field"
        className="warehouse-form__error-image"
      />
      This is a required field
    </p>
  );

  const postNewWarehouse = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/warehouses/`, {
        warehouse_name: warehouseName,
        address: address,
        city: city,
        country: country,
        contact_name: contact,
        contact_position: position,
        contact_phone: phone,
        contact_email: email,
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
      warehouseName.trim().length > 0 &&
      address.trim().length > 0 &&
      city.trim().length > 0 &&
      country.trim().length > 0 &&
      contact.trim().length > 0 &&
      position.trim().length > 0 &&
      validPhone(phone) &&
      validEmail(email)
    ) {
      postNewWarehouse();
      navigate("/warehouses");
    }
  };

  return (
    <section className="warehouse-form">
      <div className="warehouse-form__header-block">
        <img
          src={arrow_back}
          alt="go back"
          className="warehouse-form__go-back"
          onClick={goBack}
        />

        <h1 className="warehouse-form__header">Add New Warehouse</h1>
      </div>

      <form onSubmit={submitHandler} className="warehouse-form__form">
        <div className="warehouse-form__form-fields">
          <div className="warehouse-form__form-details">
            <h2 className="warehouse-form__form-subheader">
              Warehouse Details
            </h2>
            <label
              htmlFor="warehouse-name"
              className="warehouse-form__form-label"
            >
              <h3 className="warehouse-form__form-label-text">
                Warehouse Name
              </h3>
              <input
                type="text"
                id="warehouse-name"
                name="warehouse-name"
                placeholder="Warehouse Name"
                className={`warehouse-form__form-input ${addNameClass}`}
                value={warehouseName}
                onChange={(e) => {
                  setWarehouseName(e.target.value);
                  setAddNameClass("");
                }}
              />
              {!!addNameClass ? errorTag : null}
            </label>
            <label htmlFor="address" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">
                Street Address
              </h3>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Street Address"
                className={`warehouse-form__form-input ${addAddressClass}`}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddAddressClass("");
                }}
              />
              {!!addAddressClass ? errorTag : null}
            </label>
            <label htmlFor="city" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">City</h3>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className={`warehouse-form__form-input ${addCityClass}`}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setAddCityClass("");
                }}
              />
              {!!addCityClass ? errorTag : null}
            </label>
            <label htmlFor="country" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">Country</h3>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                className={`warehouse-form__form-input ${addCountryClass}`}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setAddCountryClass("");
                }}
              />
              {!!addCountryClass ? errorTag : null}
            </label>
          </div>
          <div className="warehouse-form__form-availability">
            <h2 className="warehouse-form__form-subheader">Contact Details</h2>
            <label htmlFor="contact" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">Contact Name</h3>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Contact Name"
                className={`warehouse-form__form-input ${addContactClass}`}
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setAddContactClass("");
                }}
              />
              {!!addContactClass ? errorTag : null}
            </label>
            <label htmlFor="position" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">Position</h3>
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Position"
                className={`warehouse-form__form-input ${addPositionClass}`}
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                  setAddPositionClass("");
                }}
              />
              {!!addPositionClass ? errorTag : null}
            </label>
            <label htmlFor="phone" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">Phone Number</h3>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                className={`warehouse-form__form-input ${addPhoneClass}`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setAddPhoneClass("");
                }}
              />
              {!!addPhoneClass ? errorTag : null}
            </label>
            <label htmlFor="position" className="warehouse-form__form-label">
              <h3 className="warehouse-form__form-label-text">Email</h3>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                className={`warehouse-form__form-input ${addEmailClass}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAddEmailClass("");
                }}
              />
              {!!addEmailClass ? errorTag : null}
            </label>
          </div>
        </div>
        <div className="warehouse-form__form-buttons">
          <button
            type="button"
            className="warehouse-form__cancel"
            onClick={goBack}
          >
            <h3 className="warehouse-form__form-button-text">Cancel</h3>
          </button>
          <button className="warehouse-form__save">
            <h3 className="warehouse-form__form-button-text">+Add Item</h3>
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewAddWarehouse;
