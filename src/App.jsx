import "./App.css";
import Sidebar from "./Component/Form/Dashboard/Sidebar";
import Loginform from "./Component/Form/Loginform";
import Register from "./Component/Form/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
