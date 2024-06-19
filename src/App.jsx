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
import PrivateRoute from "./Component/Form/Dashboard/Privateroute";
import Home from "./Component/Form/Dashboard/Home";
import Layout from "./Component/Form/Dashboard/Layout";
import Dashboard from "./Component/Form/Dashboard/Sidebarmaterial/Dashboard";
import Routine from "./Component/Form/Dashboard/Sidebarmaterial/Routine";
import Add_details from "./Component/Form/Dashboard/Sidebarmaterial/Add_details";
import Report from "./Component/Form/Dashboard/Sidebarmaterial/Report";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp/:userId" element={<Otpui />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              Component={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute
              Component={
                <Layout>
                  <Report />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/routine"
          element={
            <PrivateRoute
              Component={
                <Layout>
                  <Routine />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/add_details"
          element={
            <PrivateRoute
              Component={
                <Layout>
                  <Add_details />
                </Layout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
