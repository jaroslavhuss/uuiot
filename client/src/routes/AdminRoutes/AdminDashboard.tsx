import { useSelector } from "react-redux";
import AdminContainer from "../../admin-components/AdminContainer";

const AdminPanel = () => {
    let user = useSelector((data: any) => {
        return data.auth.user;
    })
    return (
        <AdminContainer>
            <h1 style={{ margin: 10 }}>
                Admin: <span style={{ color: "red" }}>{user.name} {user.surname}</span>
            </h1>
            <div className="listOfStudents" style={{ display: "flex", flexWrap: "wrap" }}>
                <p>Admin dashboard is here</p>
            </div>
        </AdminContainer>);
};

export default AdminPanel;
