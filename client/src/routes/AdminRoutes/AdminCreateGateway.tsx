import React, { useState, useEffect } from 'react'
import AdminContainer from "../../admin-components/AdminContainer"
import { GLOBAL_URL } from '../../GLOBAL_URL'
interface GateWayCreateInterface {
    name: string;
    password?: string;
    confirmedPassword?: string;
    description: string;
    creator?: string
    createdAt?: any
}
const AdminCreateGateway = () => {
    const [listOfGateways, setListOfGateways] = useState<GateWayCreateInterface[]>([])
    const [fetchChange, setFetchChange] = useState<boolean>(false)
    const [gatewayData, setGatewayData] = useState<GateWayCreateInterface>({
        name: "",
        password: "",
        confirmedPassword: "",
        description: ""
    })
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const formData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGatewayData({ ...gatewayData, [e.target.name]: e.target.value })
    }
    const createGateWay = async (e: any) => {
        e.preventDefault();
        const { name, password, confirmedPassword, description }: GateWayCreateInterface = gatewayData;
        try {
            if (!name) throw new Error("Unique name is mising");
            if (!description) throw new Error("Description is mandatory");
            if (!password) throw new Error("Password is mandatory");
            if (!description) throw new Error("Description is mandatory");
            if (password !== confirmedPassword) throw new Error("Passwords must match!")

            //Fetch call na backend
            const token: string | null = localStorage.getItem("token");
            const response: Response = await fetch(`${GLOBAL_URL}/gateway/create/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    password
                })
            })
            const data: any = await response.json();
            console.log(data)
            if (data.status) throw new Error(data.message);
            setFetchChange(!fetchChange)
            setGatewayData({
                name: "",
                password: "",
                confirmedPassword: "",
                description: ""
            })
        } catch (error: any) {
            if (error) {
                setShowError(true);
                setErrorMessage(error.message)
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage("");
                }, 2000)
            }
        }
    }

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
        getAllGateways()
    }, [fetchChange]);

    return (
        <AdminContainer>
            <h1>Create new GateWay</h1>
            <form autoComplete="false" onSubmit={createGateWay} >
                <div className="form-group row">
                    <label htmlFor="uniqueName" className="col-sm-2 col-form-label">Unique Name</label>
                    <div className="col-sm-10">
                        <input onChange={formData} value={gatewayData.name} type="text" name="name" placeholder="Some really cool gateway" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input onChange={formData} value={gatewayData.password} type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm password</label>
                    <div className="col-sm-10">
                        <input onChange={formData} value={gatewayData.confirmedPassword} type="password" className="form-control" name="confirmedPassword" placeholder="Password" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Detailed purpose of Gateway / Description</label>
                    <div className="col-sm-10">
                        <input onChange={formData} value={gatewayData.description} className="form-control" name="description" placeholder={"Please, be super descriptive what is the purpose of the new gateway"}></input>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create new GateWay {gatewayData.name}</button>
                    </div>
                    {showError && <p className='btn-danger'>{errorMessage}</p>}
                </div>
            </form>
            <hr />
            <div className="listOfUsers" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {listOfGateways.map((gateway: GateWayCreateInterface, index) => (
                    <div key={index} className="card" style={{ width: "23rem", margin: 10 }}>
                        <div className="card-body">
                            <h5 className="card-header">{gateway.name}</h5>
                            <p className="card-text"> <strong>Description: </strong> {gateway.description}</p>
                            <p className="card-text"><strong>Created by:</strong>{gateway.creator} <span style={{ fontSize: 10 }}>{new Date(gateway.createdAt).toDateString()}</span></p>
                            <p className="card-text"><strong>Status: </strong> <span style={{ color: "green" }}>Active</span></p>

                        </div>
                    </div>
                ))}
            </div>
        </AdminContainer>
    )
}

export default AdminCreateGateway