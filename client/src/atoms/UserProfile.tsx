
import { useDispatch, useSelector } from "react-redux";
import { UserInterface } from "../interface/UserInterface";
import { Lang } from "../langauges/Dictionary"
import { authUserFailed } from "../store/reducers/auth";
function UserProfile() {
    const lang = useSelector((data: any) => { return data.language.language })
    const authState = useSelector((data: any) => { return data.auth; })
    const auth = useSelector((data: any) => { return data.auth.isAuthenticated })
    const dispatch = useDispatch();
    const wholeUser = useSelector((data: { auth: { user: UserInterface } }) => {
        return data.auth.user;
    })
    return (
        <span className="card">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{Lang.profileLabel[lang]}</h5>
                    <p className="card-text">{Lang.profileName[lang]} : {authState.user.name} {authState.user.surname}</p>
                    <p className="card-text">{Lang.profileEmail[lang]} : {authState.user.email}</p>
                    <p className="card-text">{Lang.lastLoggedIn[lang]} : {new Date(wholeUser.lastLoggedIn).toLocaleString()}</p>

                    {auth &&
                        <button className="btn btn-sm  btn-danger" onClick={() => { dispatch(authUserFailed()); localStorage.clear() }}>
                            {Lang.btnLogOff[lang]}
                        </button>
                    }
                </div>
            </div>
        </span>
    )
}

export default UserProfile;
