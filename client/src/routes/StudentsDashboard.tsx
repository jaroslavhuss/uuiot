import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "../molecules/AppBar";
import axios from "axios"
import Searcher from "../molecules/Searcher";
import { Lang } from "../langauges/Dictionary"
import { Icon } from '@iconify/react';
import { setError } from "../store/reducers/errorReducer"

interface ITopics {
    _id: string,
    description: string,
    dificulty: number
    name: string
}

interface ITutor {
    _id: string,
    name: string,
    surname: string,
    titleBefore: string,
    titleAfter: string,
}

interface ISubject {
    _id: string,
    credits: number,
    degree: string,
    forms: Array<string>,
    languages?: any,
    links: Array<string>,
    severity: Array<string>,
    topics: Array<ITopics>,
    tutorials: {
        daily: Array<Array<ITopics>>,
        distant: Array<Array<ITopics>>,
    },
    tutors: Array<ITutor>
}

const StudentsDashboard = () => {
    const dispatch = useDispatch();
    const authState = useSelector((data: any) => { return data.auth })
    const lang = useSelector((data: any) => { return data.language.language })
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<Array<ISubject>>([]);
    const [subsribedSubjects, setSubsribedSubjects] = useState<Array<ISubject>>();
    const [_id, setID] = useState<string>("");

    useEffect(() => {
        if (!authState.isAuthenticated) navigate("/")
        getSubcribedSubjects()
    }, [authState, navigate]);

    //get subjects of user that is loged in
    const getSubcribedSubjects = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.post('http://localhost:5001/api/user/subject/read', {}, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            setSubsribedSubjects(res.data.subjects);
            setSubjects(res.data.restOfSubjects);
        }
        catch (error: any) {
            if (error) {
                dispatch(setError(error.message))
            }
        }
    }

    //id listener for search
    const setIDCallback = (id: SetStateAction<string>) => {
        setID(id)
    }

    return <>
        {authState.isAuthenticated &&
            <div>
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
