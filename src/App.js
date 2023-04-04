import PageHeader from "./components/PageHeader/PageHeader";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import WarehouseListPage from "./pages/WarehouseListPage/WarehouseListPage";
import InventoryListPage from "./pages/InventoryListPage/InventoryListPage";
import Warehouse from "./components/WarehouseDetails/WarehouseDetails";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";
import WarehouseAdd from "./components/WarehouseAdd/WarehouseAdd";
import InventoryAdd from "./components/InventoryAdd/InventoryAdd";
import InventoryEdit from "./components/InventoryEdit/InventoryEdit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <div className="page-body">
        <Routes>
          <Route exact path="/" element={<Navigate to="/warehouses" />} />
          <Route path="/warehouses" element={<WarehouseListPage />} />
          <Route path="/inventories" element={<InventoryListPage />} />
          <Route path="/warehouses/:id" element={<Warehouse />} />
          <Route path="/inventories/:id" element={<InventoryDetails />} />
          <Route path="/warehouses/:id/edit" element={<WarehouseEdit />} />
          <Route path="/warehouses/add" element={<WarehouseAdd />} />
          <Route path="/inventories/:id/edit" element={<InventoryEdit />} />
          <Route path="/inventories/add" element={<InventoryAdd />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
