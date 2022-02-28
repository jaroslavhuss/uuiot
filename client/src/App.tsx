import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/**
 * Admin components
 */
import Admin from "./utils/ProtectedAdminRoute"
import AdminPanel from "./routes/AdminRoutes/AdminDashboard";
import Register from "./routes/Register";
import Login from "./routes/Login";
import StudentsDashboard from "./routes/StudentsDashboard";
import { authUserFailed, authUserSuccess } from "./store/reducers/auth";
import { useEffect } from "react";
import { setAuthToken } from "./utils/setAuthToken";

//Global Error
import ErrorComponent from "./components/Error";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((data: {
    error: {
      alerts: string,
      show: boolean
    }
  }) => {
    return data.error;
  })
  useEffect(() => {
    const token = localStorage.getItem("token")
    try {
      setAuthToken(token).then((res) => {
        if (res.errorMap) {
          throw new Error("Not auth")
        }
        if (res.msg) {
          dispatch(authUserSuccess({
            user: res.user,
            token: token,
            subjects: res.subjects
          }))
          if (window.location.pathname === "/login") {
            navigate("/dashboard")
          }
        } else {
          dispatch(authUserFailed())
        }

      }
      )
    } catch (error: any) {
      console.log(error.message)
    }

  },
    [dispatch, navigate])


  return (
    <div className="container">
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
        </Route>
        {
          /**
           * ADMIN ROUTES COMES HERE
           */
        }
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

