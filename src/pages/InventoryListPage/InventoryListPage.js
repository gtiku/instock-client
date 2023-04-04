import "./InventoryListPage.scss";
import search from "../../assets/images/Icons/search-24px.svg";
import sort from "../../assets/images/Icons/sort-24px.svg";
import InventoryCard from "../../components/InventoryCard/InventoryCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryListPage() {
  document.title = "Inventory List - InStock";
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/inventories"
      );
      setInventory(data);
    };
    getInventory();
  }, []);

  if (!inventory) {
    return <p>Loading...</p>;
  }

  return (
    <main className="inventory-head container-wrap">
      <section className="inventory-head__head">
        <h1 className="inventory-head__page-title">Inventory</h1>
        <article className="inventory-head__cta">
          <label htmlFor="search" className="inventory-head__search-container">
            <img
              src={search}
              alt="search icon"
              className="inventory-head__search-icon"
            />
            <input
              type="text"
              name="search"
              className="inventory-head__search form-text-field"
              placeholder="Search..."
            />
          </label>
          <Link to="/inventories/add" className="button-primary">
            + Add New Item
          </Link>
        </article>
      </section>
      <section className="inventory-head__list">
        <article className="inventory-head__titles tablet">
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">INVENTORY ITEM</h4>
            <img
              src={sort}
              alt="sort arrows"
              className="inventory-head__sort"
            />
          </article>
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">CATEGORY</h4>
            <img
              src={sort}
              alt="sort arrows"
              className="inventory-head__sort"
            />
          </article>
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">STATUS</h4>
            <img
              src={sort}
              alt="sort arrows"
              className="inventory-head__sort"
            />
          </article>
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">QTY</h4>
            <img
              src={sort}
              alt="sort arrows"
              className="inventory-head__sort"
            />
          </article>
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">WAREHOUSE</h4>
            <img
              src={sort}
              alt="sort arrows"
              className="inventory-head__sort"
            />
          </article>
          <article className="inventory-head__title-container">
            <h4 className="inventory-head__title">ACTIONS</h4>
          </article>
        </article>
        <section className="inventory-list">
          <InventoryCard inventory={inventory} setInventory={setInventory} />
        </section>
      </section>
    </main>
  );
}
