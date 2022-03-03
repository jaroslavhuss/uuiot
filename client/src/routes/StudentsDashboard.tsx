import { useSelector } from "react-redux";
import AppBar from "../molecules/AppBar";
import { Lang } from "../langauges/Dictionary"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const StudentsDashboard = () => {
    const navigate = useNavigate()
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/")
        }
    })
    return <>
        {authState.isAuthenticated &&
            <div>
                <br />
                <AppBar />
                <h2 className="page-title">{Lang.dashboardTitle[lang]}</h2>
                <div className="dashborad-wrapper">
                    <p>Here will be a IOT dashboard, please, keep this under the correct language version!</p>
                </div>
            </div>
        }
    </>;
};

export default StudentsDashboard;
