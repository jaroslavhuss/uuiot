import { useSelector, useDispatch } from "react-redux";
import { authUserFailed } from "../store/reducers/auth";
import { Lang } from "../langauges/Dictionary"
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import Logo from "../atoms/Logo";
import UserProfile from "../atoms/UserProfile";
import { Link } from "react-router-dom"

function AppBar() {
    const dispatch = useDispatch();
    const auth = useSelector((data: any) => { return data.auth.isAuthenticated })
    const lang = useSelector((data: any) => { return data.language.language })
    const isAdmin = useSelector((data: any) => { return data.auth.user.authLevel })
    return (
        <div className="app-bar">

            {isAdmin === "iotadmin" &&
                <Link className="btn btn-sm btn-outline-secondary btn-warning" to="/admin-panel">Go to admin panel</Link>
            }
            <br />
            <br />
            <UserProfile />
            <span className="switch-bar" style={{
                padding: 10, position: "absolute", top: 0, right: 0, background: "#f9f9f9",
                borderRadius: 12,
            }}>
                <LanguageSwitch />
            </span>

        </div>
    )
}
export default AppBar;
