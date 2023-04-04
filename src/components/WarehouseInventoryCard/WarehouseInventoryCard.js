import "./WarehouseInventoryCard.scss";
import TagInStock from "../TagInStock/TagInStock";
import TagOutOfStock from "../TagOutOfStock/TagOutOfStock";
import EditDeleteIcons from "../EditDeleteIcons/EditDeleteIcons";
import rightArrow from "../../assets/images/Icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";

export default function WarehouseInventoryCard({ warehouseInventory, setWarehouseInventory, warehouseId }) {
	return (
		<section key={warehouseInventory.id} className="warehouse-inventory">
			<article className="warehouse-inventory__info-container">
				<article className="warehouse-inventory__name-container">
					<h4 className="warehouse-inventory__title">INVENTORY ITEM</h4>
					<Link
						to={`/inventories/${warehouseInventory.id}`}
						className="warehouse-inventory__name-link text-link"
					>
						{warehouseInventory.item_name}
						<img
							src={rightArrow}
							alt="right arrow"
							className="warehouse-inventory__name-arrow"
						/>
					</Link>
				</article>
				<article className="warehouse-inventory__category-container">
					<h4 className="warehouse-inventory__title">CATEGORY</h4>
					<p className="warehouse-inventory__category-content p2">
						{warehouseInventory.category}
					</p>
				</article>
				<article className="warehouse-inventory__status-container">
					<h4 className="warehouse-inventory__title">STATUS</h4>
					<div className="warehouse-inventory__status-content p2">
						{warehouseInventory.quantity ? <TagInStock /> : <TagOutOfStock />}
					</div>
				</article>
				<article className="warehouse-inventory__qty-container">
					<h4 className="warehouse-inventory__title">QUANTITY</h4>
					<p className="warehouse-inventory__qty-content p2">
						{warehouseInventory.quantity}
					</p>
				</article>
			</article>
			<article className="warehouse-inventory__edit-delete-container">
				<EditDeleteIcons
					id={warehouseInventory.id}
					setState={setWarehouseInventory}
					header={`Delete ${warehouseInventory.item_name} inventory item?`}
					content={`Please confirm that you'd like to delete ${warehouseInventory.item_name} from the inventory list. You won't be able to undo this action.`}
					url={`/inventories/${warehouseInventory.id}/edit`}
					apiUrlGet={`http://localhost:8080/api/v1/warehouses/${warehouseId}/inventories`}
					apiUrlDelete={"http://localhost:8080/api/v1/inventories"}
				/>
			</article>
		</section>
	);
}
