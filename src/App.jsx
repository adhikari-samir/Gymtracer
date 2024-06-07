import "./App.css";
import Sidebar from "./Component/Form/Dashboard/Sidebar";
import Loading from "./Component/Form/Loading";
import Loginform from "./Component/Form/Loginform";
import Register from "./Component/Form/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import Otpui from "./Component/Form/Otp_UI";
import Dashboard from "./Component/Form/Dashboard/Dashboard";
import PrivateRoute from "./Component/Form/Dashboard/Privateroute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp/:userId" element={<Otpui />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
