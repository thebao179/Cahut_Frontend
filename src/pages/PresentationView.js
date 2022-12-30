/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import choiceApi from "../api/ChoiceApi";
import multipleChoiceQuestionApi from "../api/MultipleChoiceQuestionApi";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import ChatBox from "../components/Plugins/ChatBox";
import PresentationQuestion from "../components/Plugins/PresentationQuestion";
import presentationApi from "../api/PresentationApi";
import headingSlideApi from "../api/HeadingSlideApi";
import paragraphSlideApi from "../api/ParagraphSlideApi";
import jwt from "jwt-decode";

function PresentationView({usrToken, setToken}) {
    const params = useParams();
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {register, handleSubmit} = useForm();
    const [connection, setConnection] = useState();
    const navigate = useNavigate();
    const [type, setType] = useState();
    const [hHeading, setHHeading] = useState();
    const [subHeading, setSubHeading] = useState();
    const [pHeading, setPHeading] = useState();
    const [paragraph, setParagraph] = useState();
    const [isAccess, setIsAccess] = useState(false);
    let isInitial = useRef(true);
    let pType = useRef();
    let groupId = useRef();
    let currSlideId = useRef();
    let dataChanged = useRef(false);

    const onSubmit = async (data) => {
        if (data.answer) {
            await choiceApi.submitAnswer(data.answer);
            setIsSubmitted(true);
            if (pType.current === "group") {

            }
            if (connection) await connection.send("SendResult", params.id, "updateResult");
        }
        else One.helpers('jq-notify', {type: 'danger', icon: 'fa fa-times me-1', message: 'Please submit your answer'});
    };

    const fetchData = async () => {
        if (usrToken) {
            const payload = jwt(usrToken);
            const currentDate = new Date();
            if (payload.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem('token');
                setToken('');
            }
        }
        if (isInitial.current) {
            const res = await presentationApi.getPresentationType(params.id);
            if (res.status) {
                if (res.data.presentationType === 'group') {
                    if (!usrToken) navigate('/');
                    const info = await presentationApi.getGroupPresentationInfoStudent(params.id, res.data.groupId);
                    if (info.status) {
                        pType.current = res.data.presentationType;
                        groupId.current = res.data.groupId;
                    }
                    else navigate('/');
                }
                else {
                    pType.current = res.data.presentationType;
                    groupId.current = res.data.groupId;
                }
                setIsAccess(true);
            }
            else navigate('/');
        }
        let result;
        if (pType.current === "public") result = await presentationApi.getCurrentSlidePublic(params.id);
        else if (pType.current === "group") result = await presentationApi.getCurrentSlideGroup(params.id, groupId.current);
        if (result.status) {
            setIsSubmitted(false);
            currSlideId.current = result.data.slideId;
            setType(result.data.slideType);
            if (result.data.slideType === "multipleChoice") {
                if (dataChanged.current) {
                    dataChanged.current = false;
                    setIsSubmitted(true);
                }
                const question = await multipleChoiceQuestionApi.getQuestion(result.data.slideId);
                setQuestion(question.data);
                if (question.data) {
                    const answers = await choiceApi.getAnswers(question.data.questionId);
                    setAnswers(answers.data);
                } else setAnswers([]);
            }
            else if (result.data.slideType === "heading") {
                const heading = await headingSlideApi.getData(result.data.slideId);
                if (heading.data) {
                    setHHeading(heading.data.headingContent);
                    setSubHeading(heading.data.subHeadingContent);
                }
            }
            else if (result.data.slideType === "paragraph") {
                const paragraph = await paragraphSlideApi.getData(result.data.slideId);
                if (paragraph.data) {
                    setPHeading(paragraph.data.headingContent);
                    setParagraph(paragraph.data.paragraphContent);
                }
            }
        }
    }

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_REALTIME_HOST+ "?presentationId=" + params.id)
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveResult", (slideId, message) => {
                        dataChanged.current = true;
                        fetchData();
                    });
                    connection.on("ChangeSlide", (presentationId, action) => {
                        dataChanged.current = false;
                        fetchData();
                    })
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

    if (!isAccess) {
        return (
            <></>
        );
    }

    else if (isSubmitted) {
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
        <>
            <div id="page-container">
                {type === 'multipleChoice' &&
                    <Container className="w-50 p-4">
                        <div className="block-content text-center">
                            <div>
                                <a href="/" className="d-block fw-semibold text-modern fs-2">Cahut</a>
                                <a className="d-block fw-semibold fs-5 tracking-wider text-dual">Realtime<span
                                    className="fw-normal"> Learning Platform</span></a>
                            </div>
                            <div className="mt-4">
                                <h3 className="d-flex justify-content-start">{question ? question.content : ""}</h3>
                                {questionVote()}
                            </div>
                        </div>
                    </Container>
                }
                {type === 'heading' &&
                    <div className="p-4" style={{height: '100vh'}}>
                        <div className="bg-white h-100">
                            <div className="block-content text-center">
                                <div>
                                    <a href="/" className="d-block fw-semibold text-modern fs-2">Cahut</a>
                                    <a className="d-block fw-semibold fs-5 tracking-wider text-dual">Realtime<span
                                        className="fw-normal"> Learning Platform</span></a>
                                </div>
                            </div>
                            <div className="d-flex pt-9">
                                <p className="w-100 text-center" style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold'
                                }}>{hHeading ? hHeading : "Heading"}</p>
                            </div>
                            <div className="d-flex">
                                <p className="w-100 text-center">{subHeading ? subHeading : "Sub Heading"}</p>
                            </div>
                        </div>
                    </div>
                }
                {type === 'paragraph' &&
                    <div className="p-4" style={{height: '100vh'}}>
                        <div className="bg-white h-100">
                            <div className="block-content text-center">
                                <div>
                                    <a href="/" className="d-block fw-semibold text-modern fs-2">Cahut</a>
                                    <a className="d-block fw-semibold fs-5 tracking-wider text-dual">Realtime<span
                                        className="fw-normal"> Learning Platform</span></a>
                                </div>
                            </div>
                            <div className="d-flex pt-9">
                                <p className="w-100 text-center" style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold'
                                }}>{pHeading ? pHeading : "Heading"}</p>
                            </div>
                            <div className="d-flex">
                                <p className="w-100 text-center">{paragraph ? paragraph : "Use this paragraph to explain something in detail. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition."}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="middle-bottom-screen plugin-panel" >
                <div className="plugin-panel__element">
                    <ChatBox connection={connection} presentationId={params.id} userEmail={usrToken ? jwt(usrToken).email : null}></ChatBox>
                </div>
                <div className="plugin-panel__element">
                    <PresentationQuestion connection={connection} presentationId={params.id} viewer={'student'} groupId = {groupId.current}></PresentationQuestion >
                </div>
            </div>
        </>
    );
}

export default PresentationView;
