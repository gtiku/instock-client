import "./TextInput.scss";
import { useState } from "react";
import errorIcon from "../../assets/images/Icons/error-24px.svg";

const TextInput = ({ finalCheck, handleChange, label, ...inputProps }) => {
  const [firstError, setFirstError] = useState(false);
  const [firstErrorMessage, setFirstErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  if (finalCheck && !inputProps.value)  {
    setFirstErrorMessage(true)
  }

  const handleBlur = (event) => {
    
    if (!event.target.value) {
      setFirstErrorMessage("This field is required");
      setFirstError(true);
      setPhoneError(false);
    } else {
      setFirstError(false);
      setPhoneError(false);
    }
    if (
      event.target.value &&
      inputProps.name === "contactPhone" &&
      !validPhone(event.target.value)
    ) {
      setPhoneErrorMessage("Enter a valid phone number");
      setFirstError(false);
      setPhoneError(true);
    } else if (
      event.target.value &&
      inputProps.name === "contactEmail" &&
      !validEmail(event.target.value)
    ) {
      setEmailErrorMessage("Enter a valid email");
      setFirstError(false);
      setEmailError(true);
    } else {
      setPhoneError(false);
      setEmailError(false);
    }
  };
  const handleFocus = (event) => {
    if (event.target.value) {
      setFirstError(false);
    }
  };
  const validPhone = (input) => {
    let check = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return check.test(input);
  };

  const validEmail = (input) => {
    let check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(input).toLowerCase());
  };

  return (
    <label>
      <h3>{label}</h3>
      <input
        {...inputProps}
        className={
          firstError
            ? "form-text-field form-input form-text-field--error "
            : "form-text-field form-input"
        }
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {finalCheck && (
        <div>
          <p className={finalCheck ? "p3 error" : "p3 error__hidden"}>
            <span>
              <img className="error__icon" src={errorIcon} alt="!" />
            </span>
            {firstErrorMessage}
          </p>
        </div>
      )}
      {firstError && (
        <div>
          <p className={firstError ? "p3 error" : "p3 error__hidden"}>
            <span>
              <img className="error__icon" src={errorIcon} alt="!" />
            </span>
            {firstErrorMessage}
          </p>
        </div>
      )}
      {phoneError && (
        <div>
          <p className={phoneError ? "p3 error" : "p3 error__hidden"}>
            <span>
              <img className="error__icon" src={errorIcon} alt="!" />
            </span>
            {phoneErrorMessage}
          </p>
        </div>
      )}
      {emailError && (
        <div>
          <p className={emailError ? "error p3 " : "p3 error__hidden"}>
            <span>
              <img className="error__icon" src={errorIcon} alt="!" />
            </span>
            {emailErrorMessage}
          </p>
        </div>
      )}
    </label>
  );
};

export default TextInput;
