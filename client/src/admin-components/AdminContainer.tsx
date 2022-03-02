import React, { useEffect } from "react";
import AdminMenu from "./AdminMenu"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authStateInterface } from "../interface/authStateInterface";
const AdminContainer = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const authState: authStateInterface = useSelector((data: any) => { return data.auth });

    useEffect(() => {
        if (!authState.isAuthenticated) navigate("/")
    });
    return (
        <div className="admin-container">
            {authState.user.authLevel === "iotadmin" && <>
                <AdminMenu />
                {children}
            </>}

        </div>
    );
};

export default AdminContainer;
