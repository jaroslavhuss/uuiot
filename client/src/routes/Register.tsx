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

import { TokenInterface } from "../interface/TokenInterface";
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
        <div className="column-center">
            <Logo />

            <Box header={
                <div>
                    <span className="header-title">{Lang.register[lang]}</span>
                    <span className="header-languge-switch"><LanguageSwitch></LanguageSwitch></span>
                </div>
            }>

                <form onSubmit={submitForm} className="column-center" autoComplete="off" >

                    {/* NAME */}
                    <InputText
                        label={Lang.name[lang]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setName(e.target.value) }}
                        htmlFor="name"
                        type="text"
                        name="name"
                        value={name}>
                    </InputText>

                    {/* SURNAME */}
                    <InputText
                        label={Lang.surname[lang]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setSurname(e.target.value) }}
                        htmlFor="surname"
                        type="text"
                        name="surname"
                        value={surname}>
                    </InputText>

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
                    <InputText
                        label={Lang.emailRegister[lang]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setEmail(e.target.value) }}
                        htmlFor="email"
                        type="email"
                        name="email"
                        value={email}>
                    </InputText>

                    {/* PASSWORD */}
                    <InputText
                        label={Lang.passwordRegister[lang]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setPassword(e.target.value) }}
                        htmlFor="password"
                        type="password"
                        name="password"
                        value={password}>
                    </InputText>

                    {/* PASSWORD */}
                    <InputText
                        label={Lang.passwordConfirmRegister[lang]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => { setConfirmedPassword(e.target.value) }}
                        htmlFor="password-cofirm"
                        type="password"
                        name="password-cofirm"
                        value={confirmedPassword}>
                    </InputText>

                    {/* FORM CONTROL */}
                    <div className="register-form-control">

                        <input className="submit" type="submit" value={Lang.submitBtnRegister[lang]} />
                    </div>
                </form>
                <Link to="/login"><button className="button-custom button-custom-big">{Lang.backBtnRegister[lang]}</button></Link>
                {/* ERRORS */}
                {!errorStatus && <FormErrors error={errorMessage} ></FormErrors>}

                {/* FOOTER */}
                <p className="credits"> {Lang.credits[lang]} </p>
            </Box>
        </div>
    );
};

export default Register;
