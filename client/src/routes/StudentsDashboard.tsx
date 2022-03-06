import { useSelector } from "react-redux";
import AppBar from "../molecules/AppBar";
import { Lang } from "../langauges/Dictionary"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLOBAL_URL } from '../GLOBAL_URL'
interface GateWayCreateInterface {
    name: string;
    password?: string;
    confirmedPassword?: string;
    description: string;
    creator?: string
    createdAt?: any
}

const StudentsDashboard = () => {
    const navigate = useNavigate()
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const [listOfGateways, setListOfGateways] = useState<GateWayCreateInterface[]>([])
    const [fetchChange, setFetchChange] = useState<boolean>(false)


    const getAllGateways = async () => {

        const token: string | null = localStorage.getItem("token");
        const response: Response = await fetch(`${GLOBAL_URL}/gateway/all/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        const data: GateWayCreateInterface[] = await response.json();
        setListOfGateways(data);
    }

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/")
        }
        getAllGateways();
    }, [fetchChange])
    return <>
        {authState.isAuthenticated &&
            <div>
                <br />
                <AppBar />
                <h2 className="page-title">{Lang.dashboardTitle[lang]}</h2>
                <div className="dashborad-wrapper">
                    <hr />
                    <select className="form-select" aria-label="Default select example">
                        <option value="---">---</option>
                        {listOfGateways.map((gateway: GateWayCreateInterface, index) => (

                            <option key={index} value={gateway.name}>{gateway.name}</option>

                        ))}
                    </select>
                </div>
            </div>
        }
    </>;
};

export default StudentsDashboard;
