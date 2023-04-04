import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo/InStock-Logo.svg";
import "./PageHeader.scss";
import Button from "../Button/Button";

const PageHeader = () => {
  let path = window.location.href;
  const isInventories = path.includes("inventories");
  const isWarehouses = path.includes("warehouses");

  let navigate = useNavigate();

  return (
    <div className="header">
      <section className="header__nav">
        <img
          src={logo}
          className="header__nav-logo"
          alt="Instock logo"
          onClick={() => navigate("/")}
        />
        <div className="nav__wrap">
          <Button
            className={`button-primary nav__button ${
              isWarehouses ? "button-primary nav__button--active" : ""
            }`}
            type=""
            value="Warehouses"
            onClick={() => navigate("/warehouses")}
          />
          <Button
            className={`button-primary nav__button ${
              isInventories ? "button-primary nav__button--active" : ""
            }`}
            type=""
            value="Inventory"
            onClick={() => navigate("/inventories")}
          />
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
