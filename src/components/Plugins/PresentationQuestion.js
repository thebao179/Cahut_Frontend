import { event } from "jquery";
import { useEffect, useState } from "react";
import $ from 'jquery';

function PresentationQuestion({viewer}) {

    // const [isQuestionHide, setIsQuestionPanelHide] = useState(true)
    // const ToggleQuestionPanel = () => {
    //     console.log('toggle');
    //     setIsQuestionPanelHide(!isQuestionHide)
    // }

    console.log(viewer);

    const StopPropa = (e) => {
        e.stopPropagation();
    };

    const changeQuestionStatus = (e) => {
        console.log(e);
        let questionId = $(e).find('input[name=questionId]').val();
        console.log(e.className);
        if(viewer == 'presenter'){
            if(e.className == 'plugin-question__status plugin-question__notanswered'){
                e.className = 'plugin-question__status plugin-question__answered'
                e.innerHTML = 'Answered'
            }
            else{
                e.className = 'plugin-question__status plugin-question__notanswered'
                e.innerHTML = 'Not answered'
            }
        }
        else{
            if(e.className == 'far fa-thumbs-up'){
                e.className = 'fas fa-thumbs-up'
            }
            else{
                e.className = 'far fa-thumbs-up'
            }
        }

    }

    const sendQuestion = async () => {
        const msg = $('#inputQuestionField').find('input[name=question]').val();
        $('#inputQuestionField').find('input[name=question]').val('')
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
                        <span style={{ paddingRight: "5px" }}>Question (123)</span>
                        <i class="far fa-question-circle"></i>
                    </div>


                </div>
                <div className="collapse mt-3 plugin-data-question plugin-question__body" id="collapseQuestion" >
                    <table className="table table-hover table-vcenter " style={{ width: "max-content"}}>
                        <thead>
                            <tr>
                                <th className="text-center plugin-table-th" style={{ width: "50px" }}>
                                    Order
                                </th>
                                <th className="text-center plugin-table-th" style={{ width: "250px" }}>Question</th>
                                <th className="plugin-table-th">Upvote</th>
                                <th className="plugin-table-th">
                                     {viewer == 'presenter' ? 'Status':'Action'}
                                </th>   
                                {/* <th className="text-center" style={{ width: "100px" }}>
                                    Actions
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
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
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question 2
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                            <tr>
                                <th className="text-center" scope="row">
                                    1
                                </th>
                                <td className="fw-semibold fs-sm" style={{ padding: "0px", textAlign:"center"}}>
                                    This is a question
                                </td>
                                <td className="text-center" scope="row">
                                    12
                                </td>
                                <td className="text-center" scope="row">
                                    {
                                        viewer == 'presenter' ? 
                                        <div onClick={e => changeQuestionStatus(e.target)} type="button" className="plugin-question__status plugin-question__notanswered">
                                            Not answered
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                            </div> :
                                        <i onClick={e => changeQuestionStatus(e.target)} type="button" name="UpvoteIcon" className="fas fa-thumbs-up" style={{"fontSize":"20px"}}>
                                            <input name="questionId" type="hidden" value={"QuestionId"}></input>
                                        </i>    

                                        //<i class="far fa-thumbs-up"></i>
                                    }
                                    
                                </td>
                                {/* <td className="text-center" scope="row">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-alt-secondary"
                                        >
                                            <i class="fas fa-check"></i>
                                        </button>
                                        <span>Mark as answered</span>
                                    </div>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        {viewer != 'presenter'? 
                     <div className="card-footer d-flex justify-content-start align-items-center p-3" id="inputQuestionField">
                        <input type="text" className="form-control form-control-lg" name="question" placeholder="Type question" />
                        <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn" onClick={sendQuestion}></i></span>
                    </div> :<div></div> }
                     </div>
                </div>
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
