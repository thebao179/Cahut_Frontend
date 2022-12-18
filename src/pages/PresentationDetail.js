/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import presentationApi from "../api/PresentationApi";
import jwt from "jwt-decode";
import slideApi from "../api/SlideApi";
import questionApi from "../api/QuestionApi";
import answerApi from "../api/AnswerApi";
import PresentGroup from "../components/Modals/PresentGroup";

function PresentationDetail({usrToken, setToken}) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const [nameInvalid, setNameInvalid] = useState(false);
    const [questionInvalid, setQuestionInvalid] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [slideList, setSlideList] = useState([]);
    const [currSlide, setCurrSlide] = useState();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [presName, setPresName] = useState();
    const [slideType, setSlideType] = useState();
    const [hHeading, setHHeading] = useState();
    const [subHeading, setSubHeading] = useState();
    const [pHeading, setPHeading] = useState();
    const [paragraph, setParagraph] = useState();

    useEffect(() => {
        if (!usrToken) {
            localStorage.setItem('prevurl', location.pathname);
            navigate('/');
        } else if (usrToken) {
            const payload = jwt(usrToken);
            const currentDate = new Date();
            if (payload.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem('token');
                setToken('');
            }
        }

        async function fetchData() {
            if (refresh === 0) {
                const result = await presentationApi.getPresentationName(params.id);
                if (result.status) setPresName(result.data.presentationName);
                else navigate('/presentations');
            }
            const slides = await presentationApi.getSlides(params.id);
            setSlideList(slides.data[0]);
            if (currSlide) {
                setSlideType('multiple-choice');
                const question = await questionApi.getQuestion(currSlide);
                setQuestion(question.data);
                if (question.data) {
                    const answers = await answerApi.getAnswers(question.data.questionId);
                    setAnswers(answers.data);
                } else setAnswers([]);
            }
        }

        if (usrToken) fetchData();
    }, [refresh, currSlide, usrToken]);

    const addOption = () => {
        $('#slide-options').append(`<div id="option-${Math.random().toString(36).slice(2, 7)}" class="d-flex mb-3">\n` +
            '<input type="text" class="form-control me-3" data-id="null" placeholder="Your Answer"/>\n' +
            '<button type="button" class="text-center btn btn-sm btn-danger" onclick="$(this).closest(\'div.d-flex.mb-3\').remove();">\n' +
            '<i class="fa fa-fw fa-xmark"></i>\n' +
            '</button>\n' +
            '</div>\n');
    }

    const removeOption = async (e, answerId) => {
        const result = await answerApi.deleteAnswer(answerId);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setRefresh(refresh + 1);
    }

    const addSlide = async () => {
        const result = await slideApi.createMultipleChoiceSlide(params.id);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setRefresh(refresh + 1);
    }

    const removeSlide = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4c78dd',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await slideApi.deleteMultipleChoiceSlide(currSlide);
                One.helpers('jq-notify', {
                    type: `${result.status === true ? 'success' : 'danger'}`,
                    icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                    message: result.message
                });
                if (result.status) {
                    setCurrSlide(null);
                    setRefresh(refresh + 1);
                }
            }
        })
    }

    const saveSlide = async () => {
        let count = 0;
        $('#slide-options').find('input').each(function (k, v) {
            const value = $(v).val();
            if (!value) {
                $(v).addClass('is-invalid');
                count++;
            }
        });
        const questionEdited = $('#slide-properties').find('input[name=question]').val();
        if (!questionEdited) setQuestionInvalid(true);
        else if (count === 0) {
            const ques = {
                questionId: question ? question.questionId : "null",
                slideId: currSlide,
                type: 'Multiple choice',
                isEdited: question ? (question.content !== questionEdited).toString() : "true",
                content: questionEdited,
            }
            let ans = [];
            $('#slide-options').find('input').each(function (k, v) {
                const value = $(v).val();
                $(v).removeClass('is-invalid');
                ans.push({
                    optionId: $(v).attr("data-id"),
                    content: value,
                    isEdited: ($(v).attr("data-id") === "null" || value !== answers[k].content).toString(),
                });
            });
            const result = await slideApi.updateMultipleChoiceSlide(ques, ans);
            One.helpers('jq-notify', {
                type: `${result.status === true ? 'success' : 'danger'}`,
                icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                message: result.message
            });
            if (result.status) {
                $('#slide-options').find('div[id^=option-]').remove();
                setRefresh(refresh + 1);
            }
            setQuestionInvalid(false);
        }
    }

    const changePName = async (e) => {
        if (e.target.value === presName) return;
        if (!e.target.value) setNameInvalid(true);
        else {
            const result = await presentationApi.updatePresentation(params.id, e.target.value);
            One.helpers('jq-notify', {
                type: `${result.status === true ? 'success' : 'danger'}`,
                icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                message: result.message
            });
            if (result.status) {
                setPresName(e.target.value);
                setNameInvalid(false);
            }
        }
    }

    const slideTypeChange = (e) => {
        setSlideType(e.target.value);
    }

    return (
        <div id="page-container" className="h-100">
            <header id="page-header">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-sm-3">
                            <Link to={'/presentations'}>
                                <i className="text-warning fa fa-2x fa-arrow-left"></i>
                            </Link>
                        </div>
                        <div className="me-sm-3">
                            <input type="text" className={`form-control ${nameInvalid ? 'is-invalid' : ''}`}
                                   defaultValue={presName} onBlur={changePName}/>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-alt-success" onClick={addSlide}>
                                <i className="fa fa-fw fa-plus me-1"></i> Slide
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-warning"
                                    data-bs-toggle="modal" data-bs-target="#grouppresent-modal">
                                <i className="fa fa-fw fa-display me-1"></i> Group Present
                            </button>
                        </div>
                        <div className="d-inline-block ms-2">
                            <a href={'/presentation/present/' + currSlide} target={'_blank'}>
                                <button type="button" className="btn btn-info">
                                    <i className="fa fa-fw fa-display me-1"></i> Public Present
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <main id="main-container" className="position-relative"
                  style={{
                      flexDirection: "row",
                      flex: "1 1 auto",
                      height: "calc(100vh - 64px)",
                      borderTop: '1px solid #0000001a'
                  }}>
                <div className="h-100 flex-wrap position-relative bg-white"
                     style={{width: '230px', overflowY: "auto"}}>
                    <ol className="slide-preview pe-0 ps-0">
                        {slideList.map((data, index) =>
                            <a href={'#'} key={data.slideId} onClick={() => setCurrSlide(data.slideId)}
                               style={{color: "black"}}>
                                <li className={`d-flex pt-3 pb-3 ${currSlide === data.slideId ? 'bg-info-light' : ''}`}
                                    style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                    <span className="pe-3 fw-bold">{index + 1}</span>
                                    <div className="text-center"
                                         style={{
                                             borderStyle: "solid",
                                             borderWidth: "1px",
                                             height: '100px',
                                             flex: "1 1 auto"
                                         }}>

                                        <div className="mt-4">
                                            {(currSlide === data.slideId && slideType === 'multiple-choice') || data.type === 'multiple-choice' ? <i className="fa fa-chart-simple"></i> :
                                                (currSlide === data.slideId && slideType === 'heading') || data.type === 'heading' ? <i className="fa fa-heading"></i> :
                                                    (currSlide === data.slideId && slideType === 'paragraph') || data.type === 'paragraph' ? <i className="fa fa-paragraph"></i> : <i className="fa fa-chart-simple"></i>
                                            }
                                        </div>
                                        <span className="fw-bold">
                                            {currSlide === data.slideId && slideType === 'multiple-choice' ? 'Multiple Choice' :
                                                currSlide === data.slideId && slideType === 'heading' ? 'Heading' :
                                                    currSlide === data.slideId && slideType === 'paragraph' ? 'Paragraph' : 'Multiple Choice'
                                            }
                                        </span>
                                    </div>
                                </li>
                            </a>
                        )}
                    </ol>
                </div>
                <div className="h-100 position-relative"
                     style={{width: "calc(100% - 690px)", flex: "1 1 auto"}}>
                    <div className="p-4" style={{height: 'fit-content'}}>
                        {currSlide &&
                            <div className="bg-white p-4 h-100">
                                <div className="d-flex pt-2 justify-content-center">
                                    <p>Go to <span
                                        style={{fontWeight: 'bold'}}>{process.env.REACT_APP_CLIENT + 'view/' + currSlide}</span> to
                                        play</p>
                                </div>
                                <div style={{height: '400px'}}>
                                    {slideType === 'multiple-choice' &&
                                        <>
                                            <div className="d-flex ps-4" style={{lineHeight: 1}}>
                                                <p className="w-100" style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold'
                                                }}>{question ? question.content : 'Multiple Choice'}</p>
                                            </div>
                                            <div className="d-flex justify-content-center" style={{height: '300px', width: '100%'}}>
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
                                    {slideType === 'heading' &&
                                        <>
                                            <div className="d-flex pt-7">
                                                <p className="w-100 text-center" style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold'
                                                }}>{hHeading}</p>
                                            </div>
                                            <div className="d-flex">
                                                <p className="w-100 text-center">{subHeading}</p>
                                            </div>
                                        </>
                                    }
                                    {slideType === 'paragraph' &&
                                        <>
                                            <div className="d-flex pt-7">
                                                <p className="w-100 text-center" style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold'
                                                }}>{pHeading}</p>
                                            </div>
                                            <div className="d-flex">
                                                <p className="w-100 text-center">{paragraph}</p>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="h-100 position-relative bg-white"
                     style={{width: '460px', overflow: "auto"}}>
                    {currSlide &&
                        <div className="p-4" id="slide-properties">
                            <div className="d-flex justify-content-between mb-4">
                                <button type="button" className="btn btn-danger" onClick={removeSlide}>
                                    <i className="fa fa-fw fa-times me-1"></i> Delete Slide
                                </button>
                                <button type="button" className="btn btn-primary" onClick={saveSlide}>
                                    <i className="fa fa-fw fa-upload me-1"></i> Save Changes
                                </button>
                            </div>
                            {slideType === 'multiple-choice' &&
                                <>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>
                                        <select className="form-select" name="slide-type" onChange={slideTypeChange}>
                                            <option value="multiple-choice" selected={true}>Multiple Choice</option>
                                            <option value="heading">Heading</option>
                                            <option value="paragraph">Paragraph</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Your Question</label>
                                        <input type="text" name="question"
                                               className={`form-control ${questionInvalid ? 'is-invalid' : ''}`}
                                               defaultValue={question ? question.content : ''}
                                               placeholder={'Type Your Question'}/>
                                    </div>
                                    <div className="mb-4" id="slide-options">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Options</label>
                                        {answers.map((data) =>
                                            <div key={data.optionId} className="d-flex mb-3">
                                                <input type="text" className="form-control me-3" data-id={data.optionId}
                                                       placeholder="Your Answer"
                                                       defaultValue={data.content}/>
                                                <button type="button" className="text-center btn btn-sm btn-danger"
                                                        onClick={(e) => removeOption(e, data.optionId)}>
                                                    <i className="fa fa-fw fa-xmark"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex">
                                        <button type="button" className="btn btn-alt-secondary w-100" onClick={addOption}>
                                            <i className="fa fa-fw fa-plus me-1"></i>Add option
                                        </button>
                                    </div>
                                </>
                            }
                            {slideType === 'heading' &&
                                <>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>
                                        <select className="form-select" name="slide-type" onChange={slideTypeChange}>
                                            <option value="multiple-choice">Multiple Choice</option>
                                            <option value="heading" selected={true}>Heading</option>
                                            <option value="paragraph">Paragraph</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Heading</label>
                                        <input type="text" className="form-control" name="h-heading"
                                               defaultValue={hHeading}
                                               placeholder="Slide with heading" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Subheading</label>
                                        <textarea className="form-control" name="subheading"
                                                  rows="5" placeholder="Subheading"
                                                  defaultValue={subHeading}
                                                  spellCheck="false" style={{resize: 'none'}}></textarea>
                                    </div>
                                </>
                            }
                            {slideType === 'paragraph' &&
                                <>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>
                                        <select className="form-select" name="slide-type" onChange={slideTypeChange}>
                                            <option value="multiple-choice">Multiple Choice</option>
                                            <option value="heading">Heading</option>
                                            <option value="paragraph" selected={true}>Paragraph</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Heading</label>
                                        <input type="text" className="form-control" name="p-heading"
                                               defaultValue={pHeading}
                                               placeholder="Slide with heading" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Paragraph</label>
                                        <textarea className="form-control" name="paragraph"
                                                  rows="5" placeholder="Paragraph"
                                                  defaultValue={paragraph}
                                                  spellCheck="false" style={{resize: 'none'}}></textarea>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
            </main>
            <PresentGroup presentationId={params.id}/>
        </div>
    );
}

export default PresentationDetail;
