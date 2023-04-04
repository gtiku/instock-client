import "../EachWarehouseInventory/EachWarehouseInventory.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WarehouseInventoryCard from "../WarehouseInventoryCard/WarehouseInventoryCard";

export default function EachWarehouseInventory() {
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const warehouseId = params.id;

  useEffect(() => {
    const getWarehouseInventory = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/warehouses/${warehouseId}/inventories`
      );
      setWarehouseInventory(data);
      setIsLoading(false);
    };

    if (warehouseId) {
      getWarehouseInventory();
    }
  }, [warehouseId]);

<<<<<<< HEAD
  if (isLoading) {
    return <h1 className="Loading">Loading...</h1>;
  }

=======
>>>>>>> develop
  return (
    <>
      {warehouseInventory &&
        warehouseInventory.map((inventory) => {
          return (
            <WarehouseInventoryCard
              key={inventory.id}
              warehouseId={warehouseId}
              warehouseInventory={inventory}
              setWarehouseInventory={setWarehouseInventory}
            />
          );
        })}
    </>
  );
}
