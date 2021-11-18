import './App.css';
import React from "react";
import CustomAppBar from "./components/appBar/AppBar";
import CompanyTable from "./components/table/Table";
import StockChart from "./components/chart/Chart";

function App() {
  return (
    <div className="App">
      <CustomAppBar />
      <CompanyTable />
      <StockChart />
    </div>
  );
}

export default App;
