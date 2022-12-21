/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import choiceApi from "../api/ChoiceApi";
import multipleChoiceQuestionApi from "../api/MultipleChoiceQuestionApi";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";

function PresentationView() {
    const params = useParams();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {register, handleSubmit} = useForm();
    const [connection, setConnection] = useState();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.answer) {
            await choiceApi.submitAnswer(data.answer);
            setIsSubmitted(true);
            if (connection) {
                await connection.send("SendResult", params.id, "updateResult");
            }
            return;
        }
        One.helpers('jq-notify', {type: 'danger', icon: 'fa fa-times me-1', message: 'Please submit your answer'});
    };

    const fetchData = async () => {
        const question = await multipleChoiceQuestionApi.getQuestion(params.id);
        setQuestion(question.data);
        if (question.data) {
            const answers = await choiceApi.getAnswers(question.data.questionId);
            setAnswers(answers.data);
        } else navigate('/');
    }

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
                        fetchData();
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection])

    useEffect(() => {
        fetchData();
    }, [])

    const questionVote = () => {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2 mb-4 ">
                        {
                            answers ? answers.map(answer =>
                                <div className="form-check border border-3 rounded"
                                     style={{display: "flex", alignItems: "left"}} id={'A'} key={answer.optionId}>
                                    <label className="form-check-label" htmlFor="example-checkbox-default1"
                                           style={{margin: "10px"}}>
                                        <input className="form-check-input" type="radio" value={answer.optionId}
                                               name="example-checkbox-default" {...register("answer")} />
                                        {answer.content}
                                    </label>
                                </div>
                            ) : ""
                        }
                    </div>
                    <button type="submit" style={{display: "block", width: "100%"}} className="btn btn-primary">Submit
                    </button>
                </form>
            </>
        )
    }

    if (isSubmitted) {
        return (
            <Container>
                <div className="block-content text-center">
                    <p>
                        <i className="fa fa-4x fa-circle-check text-success"></i>
                    </p>
                    <h3 className="mt-3">Thanks for your submit, your answer will be recognized</h3>
                </div>
                <div className="mt-4 d-flex justify-content-center" style={{height: '500px', width: '100%'}}>
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
            </Container>
        )
    }

    return (
        <Container className="w-50 p-3">
            <div className="block-content text-center col-lg-4">
                <div>
                    <a className="d-block fw-semibold text-modern fs-2">Cahut</a>
                    <a className="d-block fw-semibold fs-5 tracking-wider text-dual">Realtime<span
                        className="fw-normal"> Learning Platform</span></a>
                </div>
                <div className="mt-5">
                    <h3 className="d-flex justify-content-start">{question ? question.content : ""}</h3>
                    {questionVote()}
                </div>
            </div>
        </Container>
    );
}

export default PresentationView;
