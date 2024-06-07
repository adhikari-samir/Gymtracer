// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const token = localStorage.getItem("token");
//   return token ? (
//     <Route {...rest} element={<Element />} />
//   ) : (
//     <Navigate to="/" replace />
//   );
// };

// export default PrivateRoute;
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("token");

  return token ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
