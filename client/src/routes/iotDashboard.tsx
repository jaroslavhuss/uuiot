import { useSelector } from "react-redux";
import AppBar from "../molecules/AppBar";
import { Lang } from "../langauges/Dictionary"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLOBAL_URL } from '../GLOBAL_URL'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GateWayCreateInterface {
    name: string;
    password?: string;
    confirmedPassword?: string;
    description: string;
    creator?: string
    createdAt?: any,
    _id?: string
}

interface GWDataInterface {
    date: string
    gw: string
    teplota: number
    vlhkost: number
    __v: number
    _id: number
}

const StudentsDashboard = () => {
    const navigate = useNavigate()
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const [listOfGateways, setListOfGateways] = useState<GateWayCreateInterface[]>([])
    const [gwsdata, setGwsdata] = useState<GWDataInterface[]>([])
    const [fetchChange, setFetchChange] = useState<boolean>(false)

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchChange])

    useEffect(() => {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        setStartDate(d);
        let today = new Date();
        today.setDate(today.getDate());
        setEndDate(today);
    }, []);
    const getDataFromGW = async (id: string) => {
        try {
            const token: string | null = localStorage.getItem("token");
            const response: Response = await fetch(`${GLOBAL_URL}/gateway/data/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data: GWDataInterface[] = await response.json();
            setFetchChange(!fetchChange)
            setGwsdata(data);
        } catch (error) {
            setGwsdata([]);
            console.log(error)
        }

    }
    return <>
        {authState.isAuthenticated &&
            <div>
                <br />
                <AppBar />
                <h2 className="page-title">{Lang.dashboardTitle[lang]}</h2>
                <div className="dashborad-wrapper">
                    <hr />
                    <select onChange={(e: any) => {
                        getDataFromGW(e.target.value);
                    }} className="form-select" aria-label="Default select example">
                        <option value="---">---</option>
                        {listOfGateways.map((gateway: GateWayCreateInterface, index) => (
                            <option key={index} value={gateway._id}>{gateway.name}</option>
                        ))}
                    </select>
                </div>
                <div className="dateRange">
                    From:{" "}
                    <input value={startDate.toISOString().substring(0, 10)} type="date" onChange={(e: any) => {
                        setStartDate(new Date(e.target.value))
                    }} />{" "}
                    To:{" "}
                    <input value={endDate.toISOString().substring(0, 10)} type="date" onChange={(e: any) => {
                        setEndDate(new Date(e.target.value))
                    }} />
                </div>
                {
                    gwsdata.length > 0 &&
                    <div className="gwData">
                        <div style={{ width: '100%', marginTop: 20 }}>
                            <h3>Teplota</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    width={500}
                                    height={200}
                                    data={gwsdata}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" style={{ fontSize: 8 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line connectNulls type="monotone" dataKey="teplota" stroke="#8884d8" fill="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                            <h3>Vlhkost</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart
                                    width={500}
                                    height={200}
                                    data={gwsdata}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" style={{ fontSize: 8 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line connectNulls type="monotone" dataKey="vlhkost" stroke="#8884d8" fill="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                }

            </div>
        }
    </>;
};

export default StudentsDashboard;
