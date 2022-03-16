import { useSelector } from "react-redux";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import UserProfile from "../atoms/UserProfile";
import { Link } from "react-router-dom"

function AppBar() {
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
