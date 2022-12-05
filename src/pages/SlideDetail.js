import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import jwt from "jwt-decode";
import questionApi from "../api/QuestionApi";
import answerApi from "../api/AnswerApi";

function SlideDetail({usrToken, setToken}) {
    const navigate = useNavigate();
    const params = useParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (!usrToken) setToken('');
        else if (usrToken) {
            const payload = jwt(usrToken);
            const currentDate = new Date();
            if (payload.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem('token');
                setToken('');
            }
        }
        async function fetchData() {
            const question = await questionApi.getQuestion(params.id);
            setQuestion(question.data);
            if (question.data) {
                const answers = await answerApi.getAnswers(question.data.questionId);
                setAnswers(answers.data);
            } else setAnswers([]);
        }
        if (usrToken) fetchData();
    }, [refresh]);

    return (
        <div id="page-container">
            <div className="p-4" style={{height: 'fit-content'}}>
                <div className="bg-white p-4 h-100">
                    <div className="d-flex pt-2 justify-content-center">
                        <p>Go to <span style={{fontWeight: 'bold'}}>{process.env.REACT_APP_CLIENT + 'present/view/' + params.id}</span> to play</p>
                    </div>
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
                                    <LabelList dataKey="numSelected" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideDetail;
