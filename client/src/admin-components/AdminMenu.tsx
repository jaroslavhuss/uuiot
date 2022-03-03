import { Link } from "react-router-dom"
import { authUserFailed } from "../store/reducers/auth";
import { useDispatch } from "react-redux";

const AdminMenu = () => {
    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-sm">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item btn btn-sm btn-outline-secondary">
                        <Link className="nav-link" to="/">Back to IOT dashboard</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default AdminMenu;
