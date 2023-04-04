import "./WarehouseListPage.scss";
import sort from "../../assets/images/Icons/sort-24px.svg";
import ListOfWarehouses from "../../components/ListOfWarehouses/ListofWareHouses";
import { Link } from "react-router-dom";

export default function WarehouseListPage() {
  document.title = "Warehouse List - InStock";
  return (
    <>
      <article className="container-wrap">
        <section className="list__container">
          <div className="input-button__wrapper">
            <h1 className="input-button__title">Warehouses</h1>
            <div className="input-button__container">
              <input
                type="text"
                placeholder="Search..."
                className="form-text-field input-button__search"
              ></input>
              <Link className="button-primary" to="/warehouses/add">
                + Add New Warehouse
              </Link>
            </div>
          </div>

          <div className="list-desktop">
            <div className="list-desktop__headers">
              <h4 className="list-desktop__categories">
<<<<<<< HEAD
                Warehouse
=======
                WAREHOUSE
>>>>>>> develop
                <img
                  className="list-desktop__sorticon"
                  alt="sort icon"
                  src={sort}
                />
              </h4>
              <h4 className="list-desktop__categories">
<<<<<<< HEAD
                Address
=======
                ADDRESS
>>>>>>> develop
                <img
                  className="list-desktop__sorticon"
                  alt="sort icon"
                  src={sort}
                />
              </h4>
              <h4 className="list-desktop__categories">
<<<<<<< HEAD
                Contact Name
=======
                CONTACT NAME
>>>>>>> develop
                <img
                  className="list-desktop__sorticon"
                  alt="sort icon"
                  src={sort}
                />
              </h4>
              <h4 className="list-desktop__categories">
<<<<<<< HEAD
                Contact Information
=======
                CONTACT INFORMATION
>>>>>>> develop
                <img
                  className="list-desktop__sorticon"
                  alt="sort icon"
                  src={sort}
                />
              </h4>
<<<<<<< HEAD
              <h4 className="list-desktop__categories">Actions</h4>
=======
              <h4 className="list-desktop__categories">ACTIONS</h4>
>>>>>>> develop
            </div>
          </div>
          <div>
            <ListOfWarehouses />
          </div>
        </section>
      </article>
    </>
  );
}
