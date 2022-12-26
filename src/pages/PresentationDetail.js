/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import presentationApi from "../api/PresentationApi";
import jwt from "jwt-decode";
import slideApi from "../api/SlideApi";
import multipleChoiceQuestionApi from "../api/MultipleChoiceQuestionApi";
import choiceApi from "../api/ChoiceApi";
import PresentGroup from "../components/Modals/PresentGroup";
import SlideTypeChoose from "../components/Modals/SlideTypeChoose";
import headingSlideApi from "../api/HeadingSlideApi";
import paragraphSlideApi from "../api/ParagraphSlideApi";
import multipleChoiceSlideApi from "../api/MultipleChoiceSlideApi";

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
    const [isPresent, setIsPresent] = useState(false);
    const [role, setRole] = useState();
    const [isAccess, setIsAccess] = useState(false);

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
                const info = await presentationApi.getPresentationInfo(params.id);
                if (info.status) {
                    setIsAccess(true);
                    setPresName(info.data.presentationName);
                    setIsPresent(info.data.isBeingPresented);
                    setRole(info.data.role);
                }
                else navigate('/dashboard');
            }
            const slides = await presentationApi.getSlides(params.id);
            setSlideList(slides.data[0]);
            if (currSlide) {
                if (slideType === 'MultipleChoice') {
                    $('#slide-options').find('div[id^=option-]').remove();
                    const question = await multipleChoiceQuestionApi.getQuestion(currSlide);
                    setQuestion(question.data);
                    if (question.data) {
                        const answers = await choiceApi.getAnswers(question.data.questionId);
                        setAnswers(answers.data);
                    } else setAnswers([]);
                }
                else if (slideType === 'Heading') {
                    const result = await headingSlideApi.getData(currSlide);
                    if (result.data) {
                        setHHeading(result.data.headingContent);
                        setSubHeading(result.data.subHeadingContent);
                    }
                }
                else if (slideType === 'Paragraph') {
                    const result = await paragraphSlideApi.getData(currSlide);
                    if (result.data) {
                        setPHeading(result.data.headingContent);
                        setParagraph(result.data.paragraphContent);
                    }
                }
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
        const result = await choiceApi.deleteAnswer(answerId);
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
                let result;
                const type = slideType === 'MultipleChoice' ? 'multipleChoice' : slideType === 'Heading' ? 'heading' : slideType === 'Paragraph' ? 'paragraph' : '';
                if (slideType === 'MultipleChoice') result = await multipleChoiceSlideApi.deleteMultipleChoiceSlide(currSlide);
                else result = await slideApi.removeSlide(params.id, currSlide, type);
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

    const saveMultipleChoiceSlide = async () => {
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
                questionId: question.questionId ? question.questionId : "null",
                slideId: currSlide,
                type: 'Multiple choice',
                isEdited: "true",
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
            const result = await multipleChoiceSlideApi.updateMultipleChoiceSlide(ques, ans);
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

    const saveHeadingSlide = async () => {
        const heading = $('#slide-properties').find('input[name=h-heading]').val();
        const subHeading = $('#slide-properties').find('textarea[name=subheading]').val();
        const result = await headingSlideApi.updateData(params.id, currSlide, heading, subHeading);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setRefresh(refresh + 1);
    }

    const saveParagraphSlide = async () => {
        const heading = $('#slide-properties').find('input[name=p-heading]').val();
        const paragraph = $('#slide-properties').find('textarea[name=paragraph]').val();
        const result = await paragraphSlideApi.updateData(params.id, currSlide, heading, paragraph);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setRefresh(refresh + 1);
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

    const presentPublic = async () => {
        const result = await presentationApi.presentPublic(params.id);
        if (result.status) {
            setIsPresent(true);
            window.open(
                '/presentation/present/' + params.id,
                '_blank'
            );
        }
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
    }

    if (!isAccess) {
        return (
            <></>
        );
    }

    return (
        <div id="page-container" className="h-100">
            <header id="page-header">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-sm-3">
                            <a style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>
                                <i className="text-warning fa fa-2x fa-arrow-left"></i>
                            </a>
                        </div>
                        <div className="me-sm-3">
                            <input type="text" className={`form-control ${nameInvalid ? 'is-invalid' : ''}`}
                                   defaultValue={presName} onBlur={changePName}/>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-alt-success"
                                    data-bs-toggle="modal" data-bs-target="#slide-add-modal">
                                <i className="fa fa-fw fa-plus me-1"></i> New Slide
                            </button>
                        </div>
                        <div className="d-inline-block ms-2">
                            <Link to={'/presentation/result/' + params.id}>
                                <button type="button" className="btn btn-alt-info">
                                    <i className="fa fa-fw fa-square-poll-vertical me-1"></i> View Results
                                </button>
                            </Link>
                        </div>
                    </div>
                    {role === "Owner" &&
                        <div className="d-flex align-items-center">
                            {!isPresent &&
                                <>
                                    <div className="d-inline-block ms-2">
                                        <button type="button" className="btn btn-warning"
                                                data-bs-toggle="modal" data-bs-target="#grouppresent-modal">
                                            <i className="fa fa-fw fa-display me-1"></i> Group Present
                                        </button>
                                    </div>
                                    <div className="d-inline-block ms-2">
                                        <button type="button" className="btn btn-info" onClick={presentPublic}>
                                            <i className="fa fa-fw fa-display me-1"></i> Public Present
                                        </button>
                                    </div>
                                </>
                            }
                            {isPresent &&
                                <div className="d-inline-block ms-2">
                                    <a href={'/presentation/present/' + params.id} target={'_blank'}>
                                        <button type="button" className="btn btn-info">
                                            <i className="fa fa-fw fa-display me-1"></i> Presentating
                                        </button>
                                    </a>
                                </div>
                            }
                        </div>
                    }
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
                            <a key={data.slideId} onClick={() => {setCurrSlide(data.slideId);setSlideType(data.slideType);}}
                               style={{color: "black", cursor: 'pointer'}}>
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
                                            {(currSlide === data.slideId && slideType === 'MultipleChoice') || data.slideType === 'MultipleChoice' ? <i className="fa fa-chart-simple"></i> :
                                                (currSlide === data.slideId && slideType === 'Heading') || data.slideType === 'Heading' ? <i className="fa fa-heading"></i> :
                                                    (currSlide === data.slideId && slideType === 'Paragraph') || data.slideType === 'Paragraph' ? <i className="fa fa-paragraph"></i> : <></>
                                            }
                                        </div>
                                        <span className="fw-bold">
                                            {(currSlide === data.slideId && slideType === 'MultipleChoice') || data.slideType === 'MultipleChoice' ? 'Multiple Choice' :
                                                (currSlide === data.slideId && slideType === 'Heading') || data.slideType === 'Heading' ? 'Heading' :
                                                    (currSlide === data.slideId && slideType === 'Paragraph') || data.slideType === 'Paragraph' ? 'Paragraph' : ''
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
                                <div className="d-flex pt-4 justify-content-center">
                                    <p></p>
                                    {/*<p>Go to <span style={{fontWeight: 'bold'}}>{process.env.REACT_APP_CLIENT + 'view/' + currSlide}</span> to play</p>*/}
                                </div>
                                <div style={{height: '400px'}}>
                                    {slideType === 'MultipleChoice' &&
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
                                    {slideType === 'Heading' &&
                                        <>
                                            <div className="d-flex pt-7">
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
                                    {slideType === 'Paragraph' &&
                                        <>
                                            <div className="d-flex pt-7">
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
                                <button type="button" className="btn btn-primary" onClick={slideType === 'MultipleChoice' ? saveMultipleChoiceSlide : slideType === 'Heading' ? saveHeadingSlide : slideType === 'Paragraph' ? saveParagraphSlide : ''}>
                                    <i className="fa fa-fw fa-upload me-1"></i> Save Changes
                                </button>
                            </div>
                            {slideType === 'MultipleChoice' &&
                                <>
                                    {/*<div className="mb-4">*/}
                                    {/*    <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>*/}
                                    {/*    <select className="form-select" name="slide-type" onChange={slideTypeChange}>*/}
                                    {/*        <option value="MultipleChoice" selected={true}>Multiple Choice</option>*/}
                                    {/*        <option value="Heading">Heading</option>*/}
                                    {/*        <option value="Paragraph">Paragraph</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Your Question</label>
                                        <input type="text" name="question"
                                               className={`form-control ${questionInvalid ? 'is-invalid' : ''}`}
                                               value={question ? question.content : ''} onChange={(e) => {setQuestion({...question, content: e.target.value})}}
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
                            {slideType === 'Heading' &&
                                <>
                                    {/*<div className="mb-4">*/}
                                    {/*    <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>*/}
                                    {/*    <select className="form-select" name="slide-type" onChange={slideTypeChange}>*/}
                                    {/*        <option value="MultipleChoice">Multiple Choice</option>*/}
                                    {/*        <option value="Heading" selected={true}>Heading</option>*/}
                                    {/*        <option value="Paragraph">Paragraph</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Heading</label>
                                        <input type="text" className="form-control" name="h-heading"
                                               value={hHeading} onChange={(e) => {setHHeading(e.target.value)}}
                                               placeholder="Slide with heading" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Subheading</label>
                                        <textarea className="form-control" name="subheading"
                                                  rows="5" placeholder="Subheading"
                                                  value={subHeading} onChange={(e) => {setSubHeading(e.target.value)}}
                                                  spellCheck="false" style={{resize: 'none'}}></textarea>
                                    </div>
                                </>
                            }
                            {slideType === 'Paragraph' &&
                                <>
                                    {/*<div className="mb-4">*/}
                                    {/*    <label className="form-label" style={{fontWeight: 'bold'}}>Slide Type</label>*/}
                                    {/*    <select className="form-select" name="slide-type" onChange={slideTypeChange}>*/}
                                    {/*        <option value="MultipleChoice">Multiple Choice</option>*/}
                                    {/*        <option value="Heading">Heading</option>*/}
                                    {/*        <option value="Paragraph" selected={true}>Paragraph</option>*/}
                                    {/*    </select>*/}
                                    {/*</div>*/}
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Heading</label>
                                        <input type="text" className="form-control" name="p-heading"
                                               value={pHeading} onChange={(e) => {setPHeading(e.target.value)}}
                                               placeholder="Slide with heading" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" style={{fontWeight: 'bold'}}>Paragraph</label>
                                        <textarea className="form-control" name="paragraph"
                                                  rows="6" placeholder="Use this paragraph to explain something in detail. Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition."
                                                  value={paragraph} onChange={(e) => {setParagraph(e.target.value)}}
                                                  spellCheck="false" style={{resize: 'none'}}></textarea>
                                    </div>
                                </>
                            }
                        </div>
                    }
                </div>
            </main>
            <PresentGroup presentationId={params.id} setIsPresent={setIsPresent}/>
            <SlideTypeChoose presentationId={params.id} setPresRefresh={setRefresh} presRefresh={refresh}/>
        </div>
    );
}

export default PresentationDetail;
