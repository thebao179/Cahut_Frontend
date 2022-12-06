/* eslint-disable */
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import answerApi from "../api/AnswerApi";
import questionApi from "../api/QuestionApi";
import slideApi from "../api/SlideApi";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Bar, BarChart, LabelList, ResponsiveContainer } from "recharts";

function PresentationView() {
    const params = useParams();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit } = useForm();
    //use for signalr
    const [messages, setMessages] = useState([]);
    const [connection, setConnection] = useState();

    const onSubmit = async (data) => {
        if (data.answer) {
            answerApi.submitAnswer(data.answer);
            setIsSubmitted(true);
            if (connection) {
                await connection.send("SendResult", params.id, "updateResult");
            }
            return;
        }
        One.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: 'Please submit your answer' });
    };

    const fetchData =  async () => {
        const question = await questionApi.getQuestion(params.id);
        setQuestion(question.data);
        if (question.data) {
            const answers = await answerApi.getAnswers(question.data.questionId);
            setAnswers(answers.data);
        } else setAnswers([]);
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
                        console.log(message);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection])
    //

    useEffect(() => {
        async function fetchData() {
            const question = await questionApi.getQuestion(params.id);
            setQuestion(question.data);
            if (question.data) {
                const answers = await answerApi.getAnswers(question.data.questionId);
                setAnswers(answers.data);
            } else setAnswers([]);
        }
        fetchData();
    }, [])


    const questionVote = () => {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="space-y-2 mb-4 ">
                        {
                            answers ? answers.map(answer =>
                                <div className="form-check border border-3 rounded" style={{ display: "flex", alignItems: "left" }} id={'A'} key={answer.answerId}>
                                    <label className="form-check-label" htmlFor="example-checkbox-default1" style={{ margin: "10px" }}>
                                        <input className="form-check-input" type="radio" value={answer.answerId} name="example-checkbox-default" {...register("answer")} />
                                        {answer.content}
                                    </label>
                                </div>
                            ) : ""
                        }
                    </div>
                    <button type="submit" style={{ display: "block", width: "100%" }} className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }

    if (isSubmitted) {
        return (
            <Container>
                <div className="block-content text-center">
                    <h1>Cahut</h1>
                    <h1>Thanks for your submit, your answer will be recognized</h1>
                </div>
                <div className="d-flex justify-content-center" style={{ height: '500px', width: '100%' }}>
                    <ResponsiveContainer width="90%" height="100%">
                        <BarChart width={150} height={40} data={answers}
                            margin={{ top: 20, bottom: 20 }}>
                            <Bar dataKey="numSelected"
                                fill="#4c78dd">
                                <LabelList dataKey="content"
                                    position="bottom"
                                    style={{ fontWeight: "bold" }} />
                                <LabelList dataKey="numSelected" position="top" />
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
                <h1 className="display-1">Cahut</h1>
                <h2 className="d-flex justify-content-start">{question ? question.content : ""}</h2>
                {questionVote()}
            </div>
        </Container>
    );
}

export default PresentationView;
