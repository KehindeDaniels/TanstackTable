import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import FilteringTable from "./pages/FilteringTable";
import Ordering from "./pages/Ordering";
import Pagination from "./pages/Pagination";
import Selection from "./pages/Selection";
import SortingTable from "./pages/SortingTable";
import BasicTable from "./pages/BasicTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BasicTable />} />
          <Route path="basicTable" element={<BasicTable />} />
          <Route path="filtering" element={<FilteringTable />} />
          <Route path="ordering" element={<Ordering />} />
          <Route path="pagination" element={<Pagination />} />
          <Route path="selection" element={<Selection />} />
          <Route path="sorting" element={<SortingTable />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
