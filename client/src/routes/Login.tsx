import { Lang } from "../langauges/Dictionary"
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import validator from "validator";
import { authUserSuccess, authUserFailed } from "../store/reducers/auth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Box from "../atoms/Box";
import Logo from "../atoms/Logo"
import InputText from "../atoms/forms/InputText";
import FormErrors from "../atoms/forms/FormErrors";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import { UserInterface } from "../interface/UserInterface";

const Login = () => {
    /**
     * CONST
     */
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Global state
     */
    const authState = useSelector((data: any) => { return data.auth; })
    const lang = useSelector((data: any) => { return data.language.language })

    /**
     * State hooks
     */
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);
    /**
     * USE EFFECT
     */
    useEffect(() => { if (authState.isAuthenticated) { navigate("/dashboard") } }, [authState, navigate]);

    const submitForm = async (e: any) => {
        e.preventDefault();
        if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
            setErrorStatus(false)
        } else if (password.length < 1 && password.length > 5) {
            setErrorMessage("Password is missing or its length is lesser than 6 characters")
            setErrorStatus(false)
        }
        else {
            try {
                const response: Response = await fetch("http://localhost:5001/auth/signin", {
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    body: JSON.stringify({ email, password })
                })
                const data: { access_token: string, user: UserInterface, message: string } = await response.json();
                if (!data.access_token) throw new Error(data.message);
                if (!data.user) throw new Error("Could not fetch user's data")
                if (!data.user.isUserApproved) throw new Error("User was not verified yet!")
                localStorage.setItem("token", data.access_token);
                dispatch(authUserSuccess({ token: data.access_token, user: data.user }));
            } catch (error: any) {
                setErrorStatus(false);
                setErrorMessage(error.message)
                localStorage.removeItem("token");
                dispatch(authUserFailed())
            }
        }
    };
    return (
        <div className="flex-column d-flex justify-content-md-center align-items-center w-100" style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        }}>
            <nav className="navbar navbar-dark" style={{
                padding: 10, position: "absolute", top: 0, right: 0, background: "#f9f9f9",

                borderRadius: 12,
            }}>
                <span className="navbar-text"><LanguageSwitch></LanguageSwitch></span>
            </nav>
            <h1 className="navbar-text">{Lang.login[lang]}</h1>
            <form onSubmit={submitForm} className="d-sm-flex flex-column w-100 p-3" style={{
                margin: "0 auto",
                background: "#f9f9f9",
                padding: 10,
                borderRadius: 12,
                maxWidth: 600,
            }}>

                {/* EMAIL */}

                <div className="input-group mb-3">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} type="email" className="form-control" placeholder={Lang.emailLogin[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">@{Lang.emailLogin[lang]}</span>
                    </div>
                </div>

                {/* PASSWORD */}

                <div className="input-group mb-3">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPassword(e.target.value) }} type="password" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.passwordLogin[lang]}</span>
                    </div>
                </div>

                <input className="btn btn-dark" type="submit" value={Lang.submitBtnLogin[lang]} />
            </form>

            {/* ERRORS */}
            <p style={{ color: "red", textAlign: "center" }}>
                {!errorStatus && <FormErrors error={errorMessage} ></FormErrors>}
            </p>


            {/* FOOTER*/}
            <footer style={{ textAlign: "center", fontSize: 12 }}>
                <p className="login-registration"> {Lang.registrationText[lang]} <Link to="/registration"> {Lang.registration[lang]} </Link><br />
                    {"\n"}{Lang.credits[lang]} </p>
            </footer>
        </div>
    );
};

export default Login;