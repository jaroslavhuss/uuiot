import { Link, useNavigate } from "react-router-dom"


const AdminMenu = () => {
    const navigate = useNavigate();
    return (
        <div className='row-admin-panel'>
            <Link className="menu-btn" to="/">IOT Dashboard</Link>
            <span className="menu-btn-logoff" onClick={() => {
                localStorage.clear();
                navigate("/")
            }}>Log-out</span>

        </div>
    );
};

export default AdminMenu;
