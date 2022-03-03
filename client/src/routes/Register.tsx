import { Lang } from "../langauges/Dictionary"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import validator from "validator";
import { authUserFailed, authUserSuccess } from "../store/reducers/auth";
import { Link, useNavigate } from "react-router-dom";
import Box from "../atoms/Box";
import Logo from "../atoms/Logo"
import InputText from "../atoms/forms/InputText";
import FormErrors from "../atoms/forms/FormErrors";
import LanguageSwitch from "../atoms/forms/LanguageSwitch";
import FormSelect from "../atoms/forms/FormSelect";
import { UserInterface } from "../interface/UserInterface";

const Register = () => {
    const navigate = useNavigate();
    const lang = useSelector((data: any) => { return data.language.language })
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [prefferedLanguage, setPrefferedLanguage] = useState<string>("cz");
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<boolean>(true);

    const dispatch = useDispatch();
    const authState = useSelector((data: any) => { return data.auth; })
    useEffect(() => { if (authState.isAuthenticated) { navigate("/dashboard") } }, [authState, navigate]);
    const submitForm = async (e: any) => {
        e.preventDefault();
        if (name === "" && surname === "" && prefferedLanguage === "") {
            setErrorMessage("All fields are mandatory")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else if (password !== confirmedPassword) {
            setErrorMessage("Passwords does not match!")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else if (!validator.isEmail(email)) {
            setErrorMessage("Email is missing or this is invalid email")
            setErrorStatus(false)
            dispatch(authUserFailed())
        }
        else {
            try {
                const response: Response = await fetch("http://localhost:5001/auth/signup", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "post",
                    body: JSON.stringify({
                        name,
                        surname,
                        language: prefferedLanguage,
                        email,
                        password,
                        confirmedPassword
                    })
                })
                const data: { access_token: string, user: UserInterface, statusCode: number, message: string, error: string } = await response.json();
                if (data.error) throw new Error(`${data.statusCode} - ${data.error} - ${data.message}`)
                localStorage.setItem("token", data.access_token);
                dispatch(authUserSuccess({ token: data.access_token, user: data.user }));
                navigate("/dashboard")
            } catch (error) {
                setErrorStatus(false);
                //@ts-ignore
                setErrorMessage(error.message)
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
            <h1 className="header-title">{Lang.register[lang]}</h1>
            <nav className="navbar navbar-dark" style={{
                padding: 10, position: "absolute", top: 0, right: 0, background: "#f9f9f9",

                borderRadius: 12,
            }}>
                <span className="navbar-text"><LanguageSwitch></LanguageSwitch></span>
            </nav>

            <form onSubmit={submitForm} className="d-sm-flex flex-column w-100 p-3" autoComplete="off" style={{
                margin: "0 auto",
                background: "#f9f9f9",
                padding: 10,
                borderRadius: 12,
                maxWidth: 600,
            }}>

                {/* NAME */}

                <div className="input-group mb-3">
                    <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) }} type="text" className="form-control" placeholder={Lang.name[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.name[lang]}</span>
                    </div>
                </div>

                {/* SURNAME */}

                <div className="input-group mb-3">
                    <input value={surname} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setSurname(e.target.value) }} type="text" className="form-control" placeholder={Lang.surname[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.surname[lang]}</span>
                    </div>
                </div>

                <div className="register-selects">

                    {/* LANGUAGE */}
                    <FormSelect
                        label={Lang.prefferdLanguage[lang]}
                        htmlFor="Language"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPrefferedLanguage(e.target.value) }}
                        options={["cz", "en"]}>
                    </FormSelect>
                </div>

                {/* EMAIL */}

                <div className="input-group mb-3">
                    <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setEmail(e.target.value) }} type="email" className="form-control" placeholder={Lang.emailRegister[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.emailRegister[lang]}</span>
                    </div>
                </div>
                {/* PASSWORD */}
                <div className="input-group mb-3">
                    <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPassword(e.target.value) }} type="password" className="form-control" placeholder={Lang.passwordRegister[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.passwordRegister[lang]}</span>
                    </div>
                </div>
                {/* PASSWORD */}

                <div className="input-group mb-3">
                    <input value={confirmedPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setConfirmedPassword(e.target.value) }} type="password" className="form-control" placeholder={Lang.passwordConfirmRegister[lang]} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">{Lang.passwordConfirmRegister[lang]}</span>
                    </div>
                </div>
                {/* FORM CONTROL */}
                <div className="register-form-control">

                    <input className="btn btn-dark" type="submit" value={Lang.submitBtnRegister[lang]} />
                </div>
                {!errorStatus && <FormErrors error={errorMessage} ></FormErrors>}
            </form>
            <Link to="/login"><button className="btn btn-danger" type="submit">{Lang.backBtnRegister[lang]}</button></Link>
            {/* ERRORS */}


            {/* FOOTER */}
            <p className="credits"> {Lang.credits[lang]} </p>

        </div>
    );
};

export default Register;
