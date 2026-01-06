import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Policies from "./pages/Policies";
import PolicySearch from "./pages/PolicySearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policy-search" element={<PolicySearch />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
