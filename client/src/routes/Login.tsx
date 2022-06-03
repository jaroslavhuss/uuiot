import { Lang } from "../langauges/Dictionary"
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import validator from "validator";
import { authUserSuccess, authUserFailed } from "../store/reducers/auth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


import FormErrors from "../atoms/forms/FormErrors";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import { UserInterface } from "../interface/UserInterface";


import { fetchAPI } from "../utils/FetchAPI";
import { FetchMethods } from "../interface/methods.enum";
import { setError } from "../store/reducers/errorReducer";
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
                const data:UserInterface = 
                await fetchAPI("/auth/signin", FetchMethods.POST, {email, password});
                if(data.error)throw new Error(`${data.message} | ${data.error} ${data.statusCode}`);
                localStorage.setItem("token", data.tokens.access_token);
                dispatch(authUserSuccess({ token: data.tokens.access_token, user: data.user }));
            } catch (error: any) {
                dispatch(setError(error.message))
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