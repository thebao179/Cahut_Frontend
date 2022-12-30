import { data, event } from "jquery";
import { useEffect, useState } from "react";
import presentationQuestionApi from "../../api/PresentationQuestionApi";
import {HubConnectionBuilder} from "@microsoft/signalr";
import $ from 'jquery';

function PresentationQuestion({connection, presentationId, viewer, groupId}) {
    //const [connection, setConnection] = useState();
    const [presentationQuestion, setPresentationQuestion] = useState([]);
    
    const fetchData = async() => {
        const questionList = await presentationQuestionApi.getAllQuestion(presentationId);
        console.log('lit question ne', questionList);

        const questionUpvoted = [];
        for(let i =0; i < questionList.length; i ++){
            questionUpvoted.push(questionList[i].isAnswered);
        }

        console.log('arr upvote cau hoi',questionUpvoted);

        setPresentationQuestion(questionList.data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    // useEffect(() => {
    //     const connect = new HubConnectionBuilder()
    //         // .withUrl(process.env.REACT_APP_REALTIME_HOST + "?slideId=" + currSlideId.current, { accessTokenFactory: () => usrToken })
    //         .withUrl(process.env.REACT_APP_REALTIME_HOST + "?presentationId=" + presentationId)
    //         .withAutomaticReconnect()
    //         .build();
    //     setConnection(connect);
    // }, []);

    useEffect(() => {
        connection.on("ReceiveQuestion", (slideId, question) => {
            console.log("receive question: " + question)
                fetchData();
        });
        connection.on("ChangeQuestionStatus", (slideId, question) => {
                fetchData();
        });
        // if (connection) {
        //     connection
        //         .start()
        //         .then(() => {
        //             console.log(connection.connectionId);
        //             connection.on("ReceiveQuestion", (slideId, question) => {
        //                 console.log("receive question: " + question)
        //                     fetchData();
        //             });
        //             connection.on("ChangeQuestionStatus", (slideId, question) => {
        //                     fetchData();
        //             });
        //         })
        //         .catch((error) => console.log(error));
        // }
    }, [connection])

    console.log(viewer);

    const StopPropa = (e) => {
        e.stopPropagation();
    };

    const changeQuestionStatus = async(e) => {
        let questionId = $(e).find('input[name=questionId]').val();
        if(viewer == 'presenter'){
            console.log('questionId', questionId);
            console.log('groupId', groupId);
            const updateQuestionStatusResult = await presentationQuestionApi.updateQuestionStatus(questionId, groupId)
            if(e.className == 'plugin-question__status plugin-question__notanswered'){
                if(updateQuestionStatusResult.status == true){
                    e.className = 'plugin-question__status plugin-question__answered'
                    // e.innerHTML = 'Answered'
                    e.innerHTML = ` Answered
                    <input name="questionId" type="hidden" value=${questionId}></input>
                    `
                }
                else{
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: updateQuestionStatusResult.message
                    });
                }
            }
            else{
                if(updateQuestionStatusResult.status == true){
                    e.className = 'plugin-question__status plugin-question__notanswered'
                    // e.innerHTML = 'Not answered'
                    e.innerHTML = ` Not answered
                    <input name="questionId" type="hidden" value=${questionId}></input>`
                }
                else{
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: updateQuestionStatusResult.message
                    });
                }
            }
        }
        else{
            if(e.className == 'far fa-thumbs-up'){
                const upvoteQuestionResult = await presentationQuestionApi.upvoteQuestion(questionId)
                if(upvoteQuestionResult.status == true){
                    e.className = 'fas fa-thumbs-up'
                }
                else{
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: upvoteQuestionResult.message
                    });
                }
            }
            else{
                const unUpvoteQuestionResult = await presentationQuestionApi.unUpvoteQuestion(questionId)
                if(unUpvoteQuestionResult.status == true){
                    e.className = 'far fa-thumbs-up'
                }
                else{
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: unUpvoteQuestionResult.message
                    });
                }
            }
        }
        connection.send("ChangeQuestionStatus", presentationId, questionId);
    }

    const sendQuestion = async () => {
        const question = $('#inputQuestionField').find('input[name=question]').val();
        if(question.trim()){
            $('#inputQuestionField').find('input[name=question]').val('')
            const sendQuestionResult = await presentationQuestionApi.sendQuestion(question, presentationId);
            if(sendQuestionResult.status == true){
                if(connection){
                    connection.send("SendQuestion", presentationId, question);
                }
            }
            
            fetchData();
        }
        else{
            // eslint-disable-next-line no-undef
            One.helpers('jq-notify', {
                type: `${'danger'}`,
                icon: `${'fa fa-times me-1'}`,
                message: `Can not send empty question`
            });
        }
    }

    const handleKeyPressInInputField = async(e) => {
        if(e.key === 'Enter'){
            sendQuestion()
        }
    }

    return (
        <>
            {/* <div className="collapse mt-3 plugin-data" id="collapseQuestion" >
                        <table className="table table-hover table-vcenter">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "50px" }}>
                                        Order
                                    </th>
                                    <th>Question</th>
                                    <th>Upvote</th>
                                    <th>
                                        Status
                                    </th>
                                    <th className="text-center" style={{ width: "100px" }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="text-center" scope="row">
                                        1
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        This is a question
                                    </td>
                                    <td className="text-center" scope="row">
                                        12
                                    </td>
                                    <td className="text-center" scope="row">
                                        Answered
                                    </td>
                                    <td className="text-center" scope="row">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary"
                                            >
                                                <i class="fas fa-check"></i>
                                            </button>
                                            <span>Mark as answered</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

            <div className="plugin-container" >
                <div className="btn btn-info btn-lg btn-block" data-mdb-toggle="collapse" href="#collapseQuestion"
                    role="button" aria-expanded="false">
                    <div className="d-flex justify-content-between align-items-center">
                        <span style={{ paddingRight: "5px" }}>Question ({presentationQuestion.length})</span>
                        <i class="far fa-question-circle"></i>
                    </div>


                </div>
                {
                    viewer == 'presenter' ?
                    <div className="collapse mt-3 plugin-data-question plugin-question__body plugin-teacher-question__board" id="collapseQuestion" >
                    <table className="table table-hover table-vcenter " style={{ width: "max-content"}}>
                        <thead>
                            <tr>
                                <th className="text-center plugin-table-th" style={{ width: "50px" }}>
                                    Order
                                </th>
                                <th className="text-center plugin-table-th" style={{ width: "250px" }}>Question</th>
                                <th className="plugin-table-th">Upvote</th>
                                <th className="plugin-table-th">
                                     Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {presentationQuestion.map((data, index) => 
                                <tr>
                                    <th className="text-center" scope="row">
                                        {index + 1}
                                    </th>
                                    <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                        {data.question}
                                    </td>
                                    <td className="text-center" scope="row">
                                    {data.numUpVote}
                                </td>
                                <td className="text-center" scope="row">
                                    {data.isAnswered == true? 
                                    <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__answered">
                                    Answered
                                    <input name="questionId" type="hidden" value={data.questionId}></input>
                                    </div>
                                    :
                                    <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={data.questionId}></input>
                                            </div>
                                    }
                                </td>
                                </tr>
                            )}
                            {/* <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question 1
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div>
                                    
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                    :

                    <div className="collapse mt-3 plugin-data-question plugin-question__body" id="collapseQuestion" >
                    <div className="plugin-student-question__board">
                    <table className="table table-hover table-vcenter " style={{ width: "max-content", maxHeight:"360px"}}>
                        <thead>
                            <tr>
                                <th className="text-center plugin-table-th" style={{ width: "50px" }}>
                                    Order
                                </th>
                                <th className="text-center plugin-table-th" style={{ width: "250px" }}>Question</th>
                                <th className="plugin-table-th">Upvote</th>
                                <th className="plugin-table-th">Is answered</th>
                                <th className="plugin-table-th">
                                     Actions
                                </th>   
                                
                            </tr>
                        </thead>
                        <tbody>
                            {presentationQuestion.map((data, index)=>
                                <tr>
                                    <td className="text-center" scope="row">
                                    {index + 1}
                                </td>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    {data.question}
                                </td>
                                <td className="text-center" scope="row">
                                {data.numUpVote}
                                </td>
                                <td className="text-center" scope="row">
                                    {data.isAnswered == true? 
                                 <div className="plugin-question__status plugin-question__answered">
                                 Answered
                                 </div>
                                    :
                                    <div className="plugin-question__status plugin-question__notanswered">
                                    Not answered
                                    </div>
                                    }
                                </td>
                                {data.isUpvote == true? 
                                    <td className="text-center" scope="row">
                                    <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                                <input name="questionId" type="hidden" value={data.questionId}></input>
                                            </i>   
                                        
                                    </td>
                                    :
                                    <td className="text-center" scope="row">
                                    <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="far fa-thumbs-up" style={{"fontSize":"20px"}}>
                                                <input name="questionId" type="hidden" value={data.questionId}></input>
                                            </i>   
                                        
                                    </td>
                                    
                                }
                                
                                </tr>
                            )}
                            {/* <tr>
                                <td className="text-center" scope="row">
                                    1
                                </td>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question 1
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                <div className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            </div>
                                </td>

                                <td className="text-center" scope="row">
                                <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>   
                                    
                                </td>
                            </tr> */}
                        </tbody>
                    </table>

                            </div>
                    <div className="send-question-field card-footer d-flex justify-content-start align-items-center p-3" id="inputQuestionField">
                        <input onKeyUp={e => handleKeyPressInInputField(e)}  type="text" className="form-control form-control-lg" name="question" placeholder="Type question" />
                        <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn" onClick={sendQuestion}></i></span>
                    </div>
                </div>
                }

            </div>

            {/* <div className="col-md-6">
                <div className={isQuestionHide ? 'block':'block block-mode-hidden'}>
                    <div className="block-header block-header-default">
                        <h3 className="block-title">Question <small>(Num of question)</small></h3>
                        <div className="block-options">
                            <button onClick={ToggleQuestionPanel} type="button" className="btn-block-option" data-toggle="block-option" data-action="content_toggle"><i className={isQuestionHide ? 'si si-arrow-up' :'si si-arrow-down'}></i></button>
                        </div>
                    </div>
                    <div className="block-content">
                        <table className="table table-hover table-vcenter">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "50px" }}>
                                        Order
                                    </th>
                                    <th>Question</th>
                                    <th className="d-none d-sm-table-cell" style={{ width: "15%" }}>
                                        Status
                                    </th>
                                    <th className="text-center" style={{ width: "100px" }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="text-center" scope="row">
                                        1
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Carol Ray</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning">
                                            Trial
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">
                                        2
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Barbara Scott</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                                            Business
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">
                                        3
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Barbara Scott</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-danger-light text-danger">
                                            Disabled
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">
                                        4
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Carol White</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                                            Business
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">
                                        5
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Susan Day</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning">
                                            Trial
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center" scope="row">
                                        6
                                    </th>
                                    <td className="fw-semibold fs-sm">
                                        <a href="be_pages_generic_profile.html">Barbara Scott</a>
                                    </td>
                                    <td className="d-none d-sm-table-cell">
                                        <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">
                                            Business
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Edit Client"
                                                data-bs-original-title="Edit Client"
                                            >
                                                <i className="fa fa-fw fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-alt-secondary js-bs-tooltip-enabled"
                                                data-bs-toggle="tooltip"
                                                aria-label="Remove Client"
                                                data-bs-original-title="Remove Client"
                                            >
                                                <i className="fa fa-fw fa-times"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
  
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default PresentationQuestion;
