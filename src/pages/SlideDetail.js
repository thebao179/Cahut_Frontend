import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import jwt from "jwt-decode";
import multipleChoiceQuestionApi from "../api/MultipleChoiceQuestionApi";
import choiceApi from "../api/ChoiceApi";
import ChatBox from "../components/Plugins/ChatBox";
import PresentationQuestion from "../components/Plugins/PresentationQuestion";

function SlideDetail({usrToken, setToken}) {
    const navigate = useNavigate();
    const params = useParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [connection, setConnection] = useState();
    const [hHeading, setHHeading] = useState();
    const [subHeading, setSubHeading] = useState();
    const [pHeading, setPHeading] = useState();
    const [paragraph, setParagraph] = useState();
    const [type, setType] = useState('multiple-choice');

    const fetchData = async () => {
        const question = await multipleChoiceQuestionApi.getQuestion(params.id);
        setQuestion(question.data);
        if (question.data) {
            const answers = await choiceApi.getAnswers(question.data.questionId);
            setAnswers(answers.data);
        } else setAnswers([]);
    }

    useEffect(() => {
        if (!usrToken) navigate('/');
        else if (usrToken) {
            const payload = jwt(usrToken);
            const currentDate = new Date();
            if (payload.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem('token');
                setToken('');
            }
        }
        if (usrToken) fetchData();
    }, [usrToken]);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_REALTIME_HOST)
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on(params.id, (message) => {
                        if (message === "updateResult")
                            fetchData();
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection])

    const goPreviousSlide = () => {

    }

    const goNextSlide = () => {

    }

    const endPresentation = () => {

    }

    return (
        <>
        <div id="page-container">
            <div className="top-screen" style={{left: 0}}>
                <button type="button" className="btn btn-lg btn-danger" onClick={endPresentation}>
                    <i className="fa fa-fw fa-xmark"></i> End
                </button>
            </div>
            <div className="middle-screen" style={{left: 0}}>
                <button type="button" className="btn btn-lg btn-circle btn-secondary" style={{padding: '0.8rem 1rem'}} onClick={goPreviousSlide}>
                    <i className="fa fa-fw fa-angle-left"></i>
                </button>
            </div>
            <div className="middle-screen" style={{right: 0}}>
                <button type="button" className="btn btn-lg btn-circle btn-secondary" style={{padding: '0.8rem 1rem'}} onClick={goNextSlide}>
                    <i className="fa fa-fw fa-angle-right"></i>
                </button>
            </div >

            <div className="p-4" style={{height: '100vh'}}>
                <div className="bg-white p-4 h-100">
                    <div className="d-flex pt-2 justify-content-center">
                        <p>Go to <span
                            style={{fontWeight: 'bold'}}>{process.env.REACT_APP_CLIENT + 'view/' + params.id}</span> to
                            play</p>
                    </div>
                    {type === 'multiple-choice' &&
                        <>
                            <div className="d-flex ps-4" style={{lineHeight: 1}}>
                                <p style={{fontSize: '30px', fontWeight: 'bold'}}>{question ? question.content : ''}</p>
                            </div>
                            <div className="d-flex justify-content-center" style={{height: '500px', width: '100%'}}>
                                <ResponsiveContainer width="90%" height="100%">
                                    <BarChart width={150} height={40} data={answers}
                                              margin={{top: 20, bottom: 20}}>
                                        <Bar dataKey="numSelected"
                                             fill="#4c78dd">
                                            <LabelList dataKey="content"
                                                       position="bottom"
                                                       style={{fontWeight: "bold"}}/>
                                            <LabelList dataKey="numSelected" position="top"/>
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    }
                    {type === 'heading' &&
                        <>
                            <div className="d-flex pt-9">
                                <p className="w-100 text-center" style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold'
                                }}>{hHeading ? hHeading : "Heading"}</p>
                            </div>
                            <div className="d-flex">
                                <p className="w-100 text-center">{subHeading ? subHeading : "Sub Heading"}</p>
                            </div>
                        </>
                    }
                    {type === 'paragraph' &&
                        <>
                            <div className="d-flex pt-9">
                                <p className="w-100 text-center" style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold'
                                }}>{pHeading ? pHeading : "Heading"}</p>
                            </div>
                            <div className="d-flex">
                                <p className="w-100 text-center">{paragraph ? paragraph : "Use this paragraph to explain something in detail. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition."}</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
        <div className="middle-bottom-screen plugin-panel" >
            <div className="plugin-panel__element">
                <ChatBox></ChatBox>
            </div>
            <div className="plugin-panel__element">
                <PresentationQuestion></PresentationQuestion>
            </div>
        </div>
        </>
    );
}

export default SlideDetail;
