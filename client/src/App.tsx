import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
/**
 * Admin components
 */
import Admin from "./utils/ProtectedAdminRoute"
import AdminPanel from "./routes/AdminRoutes/ManageUsers";
import AdminCreateGateway from "./routes/AdminRoutes/ManageGateways";

import Register from "./routes/Register";
import Login from "./routes/Login";
import StudentsDashboard from "./routes/StudentsDashboard";
//Global Error
import ErrorComponent from "./components/Error";

import { GlobalWatcher } from "./utils/setAuthToken"
import 'bootstrap/dist/css/bootstrap.min.css';
import BG from "./assets/sky_bg.jpg";
const App = () => {
  const data = useSelector((data: {
    error: {
      alerts: [],
      show: boolean
    }
  }) => {
    return data.error;
  })
  GlobalWatcher();


  return (
    <div className="bg" style={{ backgroundImage: `url("${BG}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh" }}>
      <div className="container" >
        {data.show && <ErrorComponent errorMessage={data.alerts} />}
        <Routes>
          <Route path="/registration" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<StudentsDashboard />} />
          {
            /**
             * ADMIN ROUTES COMES HERE
             */
          }
          <Route element={<Admin />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/admin-gateway" element={<AdminCreateGateway />} />
          </Route>
          {
            /**
             * ADMIN ROUTES COMES HERE
             */
          }
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

