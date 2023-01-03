import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {HubConnectionBuilder} from "@microsoft/signalr";
import jwt from "jwt-decode";
import multipleChoiceQuestionApi from "../api/MultipleChoiceQuestionApi";
import choiceApi from "../api/ChoiceApi";
import ChatBox from "../components/Plugins/ChatBox";
import PresentationQuestion from "../components/Plugins/PresentationQuestion";
import presentationApi from "../api/PresentationApi";
import headingSlideApi from "../api/HeadingSlideApi";
import paragraphSlideApi from "../api/ParagraphSlideApi";

function SlideDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [connection, setConnection] = useState();
    const [hHeading, setHHeading] = useState();
    const [subHeading, setSubHeading] = useState();
    const [pHeading, setPHeading] = useState();
    const [paragraph, setParagraph] = useState();
    const [type, setType] = useState();
    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(true);
    const [isAccess, setIsAccess] = useState(false);
    const accessToken = useRef(JSON.parse(localStorage.getItem("session"))?.accessToken);
    let isInitial = useRef(true);
    let pType = useRef();
    let groupId = useRef();
    let currSlideId = useRef();

    const fetchData = async () => {
        if (isInitial.current) {
            const info = await presentationApi.getPresentationInfoTeacher(params.id);
            if (info.status) {
                pType.current = info.data.presentationType;
                groupId.current = info.data.groupId;
                setIsAccess(true);
            } else navigate('/dashboard');
        }
        await updateData();
    }

    const updateData = async () => {
        let result;
        if (pType.current === "public") result = await presentationApi.getCurrentSlidePublic(params.id);
        else if (pType.current === "group") result = await presentationApi.getCurrentSlideGroup(params.id, groupId.current);
        if (result.status) {
            setIsPrev(true);
            setIsNext(true);
            currSlideId.current = result.data.slideId;
            setType(result.data.slideType);
            if (result.data.slideType === "multipleChoice") {
                const question = await multipleChoiceQuestionApi.getQuestion(result.data.slideId);
                setQuestion(question.data);
                if (question.data) {
                    const answers = await choiceApi.getAnswers(question.data.questionId);
                    setAnswers(answers.data);
                } else setAnswers([]);
            } else if (result.data.slideType === "heading") {
                const heading = await headingSlideApi.getData(result.data.slideId);
                if (heading.data) {
                    setHHeading(heading.data.headingContent);
                    setSubHeading(heading.data.subHeadingContent);
                }
            } else if (result.data.slideType === "paragraph") {
                const paragraph = await paragraphSlideApi.getData(result.data.slideId);
                if (paragraph.data) {
                    setPHeading(paragraph.data.headingContent);
                    setParagraph(paragraph.data.paragraphContent);
                }
            }
        }
    }

    useEffect(() => {
        if (!accessToken.current) {
            localStorage.setItem('prevurl', location.pathname);
            navigate('/');
        }
        fetchData();
    }, []);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_REALTIME_HOST + "?presentationId=" + params.id, {accessTokenFactory: () => accessToken.current})
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
                        if (message === "updateResult")
                            updateData();
                    });
                    connection.on("ChangeSlide", (presentationId, action) => {
                        updateData();
                    })
                })
                .catch((error) => console.log(error));
            return () => {
                connection.stop().then(() => {
                    console.log("Closed connection");
                });
            };
        }
    }, [connection])

    const goPreviousSlide = async () => {
        const result = await presentationApi.updatePreviousSlide(params.id, groupId.current);
        if (result.message === 'Has meet start of presentation') setIsPrev(false);
        else if (result.status) if (connection) connection.send("ChangeSlide", params.id, "Previous");
    }

    const goNextSlide = async () => {
        const result = await presentationApi.updateNextSlide(params.id, groupId.current);
        if (result.message === 'Has reached end of presentation') setIsNext(false);
        else if (result.status) if (connection) connection.send("ChangeSlide", params.id, "Next");
    }

    const endPresentation = async () => {
        const result = await presentationApi.endPresentation(params.id);
        if (result.status) navigate('/presentation/edit/' + params.id);
    }

    const copyLink = () => {
        const copyText = document.getElementById('presentation-link');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    if (!isAccess) {
        return (
            <></>
        );
    }

    return (
        <>
            <div id="page-container">
                <div className="top-screen" style={{left: 0}}>
                    <button type="button" className="btn btn-lg btn-danger" onClick={endPresentation}>
                        <i className="fa fa-fw fa-xmark"></i> End
                    </button>
                    {pType.current === "group" &&
                        <Link to={'/presentation/result/' + params.id}>
                            <button type="button" className="btn btn-lg btn-alt-info ms-3">
                                <i className="fa fa-fw fa-square-poll-vertical me-1"></i> View Results
                            </button>
                        </Link>
                    }
                </div>
                {isPrev &&
                    <div className="middle-screen" style={{left: 0}}>
                        <button type="button" className="btn btn-lg btn-circle btn-secondary"
                                style={{padding: '0.8rem 1rem'}} onClick={goPreviousSlide}>
                            <i className="fa fa-fw fa-angle-left"></i>
                        </button>
                    </div>
                }
                {isNext &&
                    <div className="middle-screen" style={{right: 0}}>
                        <button type="button" className="btn btn-lg btn-circle btn-secondary"
                                style={{padding: '0.8rem 1rem'}} onClick={goNextSlide}>
                            <i className="fa fa-fw fa-angle-right"></i>
                        </button>
                    </div>
                }
                <div className="p-4" style={{height: '100vh'}}>
                    <div className="bg-white p-4 h-100">
                        <div className="d-flex justify-content-center">
                            <p className="pt-1 me-2 fw-bold" style={{fontSize: '18px'}}>Go to</p>
                            <div className="input-group h-100" style={{width: "45%"}}>
                                <input className="form-control" id="presentation-link"
                                       defaultValue={process.env.REACT_APP_CLIENT + 'view/' + params.id}
                                       disabled={true}/>
                                <button type="button" className="btn btn-secondary"
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        title="Copy to clipboard"
                                        onClick={copyLink}>
                                    <i className="far fa-copy"></i>
                                </button>
                            </div>
                            <p className="pt-1 ms-2 fw-bold" style={{fontSize: '18px'}}>to play</p>
                        </div>
                        {type === 'multipleChoice' &&
                            <>
                                <div className="d-flex ps-4" style={{lineHeight: 1}}>
                                    <p style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold'
                                    }}>{question ? question.content : 'Multiple Choice'}</p>
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
                                <div className="d-flex justify-content-center pt-9">
                                    <p className="w-75 text-center" style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold'
                                    }}>{hHeading ? hHeading : "Heading"}</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="w-75 text-center">{subHeading ? subHeading : "Sub Heading"}</p>
                                </div>
                            </>
                        }
                        {type === 'paragraph' &&
                            <>
                                <div className="d-flex justify-content-center pt-9">
                                    <p className="w-75 text-center" style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold'
                                    }}>{pHeading ? pHeading : "Heading"}</p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p className="w-75 text-center">{paragraph ? paragraph : "Use this paragraph to explain something in detail. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition."}</p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="middle-bottom-screen plugin-panel">
                <div className="plugin-panel__element">
                    <ChatBox connection={connection} presentationId={params.id}
                             userEmail={jwt(accessToken.current).email}></ChatBox>
                </div>
                <div className="plugin-panel__element">
                    <PresentationQuestion connection={connection} presentationId={params.id} viewer={'presenter'}
                                          groupId={groupId.current}></PresentationQuestion>
                </div>
            </div>
        </>
    );
}

export default SlideDetail;
