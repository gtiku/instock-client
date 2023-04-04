import { Link } from "react-router-dom";
import "./InventoryCard.scss";
import rightArrow from "../../assets/images/Icons/chevron_right-24px.svg";
import TagInStock from "../../components/TagInStock/TagInStock";
import TagOutOfStock from "../../components/TagOutOfStock/TagOutOfStock";
import EditDeleteIcons from "../../components/EditDeleteIcons/EditDeleteIcons";

const InventoryCard = ({ inventory, setInventory }) => {
  const inventoryCard = inventory.slice(0, 8).map((item) => {
    return (
      <section key={item.id} className="inventory-item">
        <article className="inventory-item__info-container">
          <article className="inventory-item__name-container">
            <h4 className="inventory-item__title">INVENTORY ITEM</h4>
            <Link
              to={`/inventories/${item.id}`}
              className="inventory-item__name-link text-link"
            >
              {item.item_name}
              <img
                src={rightArrow}
                alt="right arrow"
                className="inventory-item__name-arrow"
              />
            </Link>
          </article>
          <article className="inventory-item__category-container">
            <h4 className="inventory-item__title">CATEGORY</h4>
            <p className="inventory-item__category-content p2">
              {item.category}
            </p>
          </article>
          <article className="inventory-item__status-container">
            <h4 className="inventory-item__title">STATUS</h4>
            <div className="inventory-item__status-content p2">
              {item.quantity ? <TagInStock /> : <TagOutOfStock />}
            </div>
          </article>
          <article className="inventory-item__qty-container">
            <h4 className="inventory-item__title">QTY</h4>
            <p className="inventory-item__qty-content p2">{item.quantity}</p>
          </article>
          <article className="inventory-item__warehouse-container">
            <h4 className="inventory-item__title">WAREHOUSE</h4>
            <p className="inventory-item__warehouse-content p2">
              {item.warehouse_name}
            </p>
          </article>
        </article>
        <article className="inventory-item__edit-delete-container">
          <EditDeleteIcons
            id={item.id}
            setState={setInventory}
            header={`Delete ${item.item_name} inventory item?`}
            content={`Please confirm that you'd like to delete ${item.item_name} from the inventory list. You won't be able to undo this action.`}
            url={`/inventories/${item.id}/edit`}
            apiUrlGet={"http://localhost:8080/api/v1/inventories"}
            apiUrlDelete={"http://localhost:8080/api/v1/inventories"}
          />
        </article>
      </section>
    );
  });
  return inventoryCard;
};

export default InventoryCard;
