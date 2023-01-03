import $ from "jquery";
import {useEffect, useRef, useState} from "react";
import presentationQuestionApi from "../../api/PresentationQuestionApi";

function PresentationQuestion({connection, presentationId, viewer, groupId}) {
    //const [connection, setConnection] = useState();
    const [presentationQuestion, setPresentationQuestion] = useState([]);
    const questionFilter = useRef('Asc time send')

    // const fetchData = async() => {
    //     const questionList = await presentationQuestionApi.getAll statusQuestion(presentationId);
    //     console.log('lit question ne', questionList);

    //     const questionUpvoted = [];
    //     for(let i =0; i < questionList.length; i ++){
    //         questionUpvoted.push(questionList[i].isAnswered);
    //     }

    //     console.log('arr upvote cau hoi',questionUpvoted);

    //     setPresentationQuestion(questionList.data);
    // }

    const fetchData = async () => {
        // if (questionFilter.current === 'Default') {
        //     const questionList = await presentationQuestionApi.getAllQuestion(presentationId);
        //     setPresentationQuestion(questionList.data);
        // } else 

        if (questionFilter.current === 'Not answered') {
            const questionList = await presentationQuestionApi.getUnAnsweredQuestion(presentationId);
            console.log('data', questionList);
            setPresentationQuestion(questionList.data);
        } else if (questionFilter.current === 'Answered') {
            const questionList = await presentationQuestionApi.getAnsweredQuestion(presentationId);
            console.log('data', questionList);
            setPresentationQuestion(questionList.data);
        } else if (questionFilter.current === 'Desc time send') {
            const questionList = await presentationQuestionApi.getPresentationSortByTime(presentationId, 'Descending');
            console.log('data', questionList);
            setPresentationQuestion(questionList.data);
        } else if (questionFilter.current === 'Asc time send') {
            const questionList = await presentationQuestionApi.getPresentationSortByTime(presentationId, 'Ascending');
            console.log('data', questionList);
            setPresentationQuestion(questionList.data);
        } else if (questionFilter.current === 'Desc upvote num') {
            const questionList = await presentationQuestionApi.getPresentationSortByVote(presentationId, 'Descending');
            console.log('data', questionList);

            setPresentationQuestion(questionList.data);
        } else if (questionFilter.current === 'Asc upvote num') {
            const questionList = await presentationQuestionApi.getPresentationSortByVote(presentationId, 'Ascending');
            console.log('data', questionList);

            setPresentationQuestion(questionList.data);
        }

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


    const StopPropa = (e) => {
        e.stopPropagation();
    };

    const changeQuestionStatus = async (e) => {
        let questionId = $(e.target).find('input[name=questionId]').val();
        if (viewer == 'presenter') {
            const updateQuestionStatusResult = await presentationQuestionApi.updateQuestionStatus(questionId, groupId)
            if (e.target.className == 'plugin-question__status plugin-question__notanswered') {
                if (updateQuestionStatusResult.status == true) {
                    // if (questionFilter.current != 'Not answered' && questionFilter.current != 'Answered') {
                    //     e.target.className = 'plugin-question__status plugin-question__answered'
                    //     // e.innerHTML = 'Answered'
                    //     e.target.innerHTML = ` Answered
                    //     <input name="questionId" type="hidden" value=${questionId}></input>
                    //     `
                    // }

                    fetchData()
                } else {
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: updateQuestionStatusResult.message
                    });
                }
            } else {
                if (updateQuestionStatusResult.status == true) {
                    // if (questionFilter.current != 'Not answered' && questionFilter.current != 'Answered') {
                    //     e.target.className = 'plugin-question__status plugin-question__notanswered'
                    //     // e.innerHTML = 'Not answered'
                    //     e.target.innerHTML = ` Not answered
                    //     <input name="questionId" type="hidden" value=${questionId}></input>`
                    // }
                    fetchData()
                } else {
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: updateQuestionStatusResult.message
                    });
                }
            }
        } else {
            if (e.target.className == 'far fa-thumbs-up') {
                const upvoteQuestionResult = await presentationQuestionApi.upvoteQuestion(questionId)
                if (upvoteQuestionResult.status == true) {
                    e.target.className = 'fas fa-thumbs-up'
                } else {
                    // eslint-disable-next-line no-undef
                    One.helpers('jq-notify', {
                        type: `${'danger'}`,
                        icon: `${'fa fa-times me-1'}`,
                        message: upvoteQuestionResult.message
                    });
                }
            } else {
                const unUpvoteQuestionResult = await presentationQuestionApi.unUpvoteQuestion(questionId)
                if (unUpvoteQuestionResult.status == true) {
                    e.target.className = 'far fa-thumbs-up'
                } else {
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
        if (question.trim()) {
            $('#inputQuestionField').find('input[name=question]').val('')
            const sendQuestionResult = await presentationQuestionApi.sendQuestion(question, presentationId);
            if (sendQuestionResult.status == true) {
                if (connection) {
                    connection.send("SendQuestion", presentationId, question);
                }
            }
            fetchData();
        } else {
            // eslint-disable-next-line no-undef
            One.helpers('jq-notify', {
                type: `${'danger'}`,
                icon: `${'fa fa-times me-1'}`,
                message: `Can not send empty question`
            });
        }
    }

    const handleKeyPressInInputField = async (e) => {
        if (e.key === 'Enter') {
            sendQuestion()
        }
    }

    const handleQuestionFilter = async (e) => {
        let filterString = e.target.innerHTML;
        const dropDownBtn = document.getElementById('dropdown-default-primary')
        dropDownBtn.innerHTML = filterString;
        if (filterString != questionFilter.current) {
            console.log('filter string', filterString);
            questionFilter.current = filterString;
            fetchData();
        }
    }

    return (
        <>

            <div className="plugin-container">
                <div className="btn btn-info btn-lg btn-block" data-mdb-toggle="collapse" href="#collapseQuestion"
                     role="button" aria-expanded="false">
                    <div className="d-flex justify-content-between align-items-center">
                        <span style={{paddingRight: "5px"}}>Question ({presentationQuestion.length})</span>
                        <i class="far fa-question-circle"></i>
                    </div>


                </div>
                {
                    viewer == 'presenter' ?
                        <div
                            className="collapse mt-3 plugin-data-question plugin-question__body" id="collapseQuestion">
                                <div className="plugin-question__board"> 
                            <table className="table table-hover table-vcenter "
                                   style={{width: "max-content"}}>
                                <thead>
                                <tr>
                                    <th className="text-center plugin-table-th" style={{width: "25px"}}>
                                        Order
                                    </th>
                                    <th className="text-center plugin-table-th" style={{width: "250px"}}>Question</th>
                                    <th className="plugin-table-th">Upvote</th>
                                    <th className="plugin-table-th">
                                    Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {presentationQuestion.map((data, index) =>
                                    <tr>
                                        <td className="text-center" scope="row">
                                            {index + 1}
                                        </td>
                                        <td className="fw-semibold fs-sm" style={{padding: "0px", textAlign: "center"}}>
                                            {data.question}
                                        </td>
                                        <td className="text-center" scope="row">
                                            {data.numUpVote}
                                        </td>
                                        <td className="text-center" scope="row">
                                            {data.isAnswered == true ?
                                                <div onClick={e => changeQuestionStatus(e)} type="button"
                                                     className="plugin-question__status plugin-question__answered">
                                                    Answered
                                                    <input name="questionId" type="hidden"
                                                           value={data.questionId}></input>
                                                </div>
                                                :
                                                <div onClick={e => changeQuestionStatus(e)} type="button"
                                                     className="plugin-question__status plugin-question__notanswered">
                                                    Not answered
                                                    <input name="questionId" type="hidden"
                                                           value={data.questionId}></input>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            </div>
                            <div
                                className="send-question-field card-footer d-flex justify-content-start align-items-center p-3"
                                id="inputQuestionField">
                                <input onKeyUp={e => handleKeyPressInInputField(e)} type="text"
                                       className="form-control form-control-lg" name="question"
                                       placeholder="Type question"/>
                                <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn"
                                                                                 onClick={sendQuestion}></i></span>
                                <div class="dropdown question-Sorter" id="filterQuestionDropdown">
                                            <div name="btnFilterQuestion" type="button"
                                                 class="btn btn-primary dropdown-toggle" id="dropdown-default-primary"
                                                 data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Asc time send
                                            </div>
                                            <div class="dropdown-menu fs-sm" aria-labelledby="dropdown-default-primary">
                                                <span onClick={e => handleQuestionFilter(e)}
                                                      class="dropdown-item">Answered</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Not answered</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Desc time send</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Asc time send</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Desc upvote num</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Asc upvote num</span>
                                                {/* <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Default</span> */}
                                                {/* <div class="dropdown-divider"></div> */}
                                            </div>
                                        </div>
                            </div>
                        </div>
                        :
                        <div className="collapse mt-3 plugin-data-question plugin-question__body" id="collapseQuestion">
                            <div className="plugin-question__board" >
                                <table className="table table-hover table-vcenter "
                                       style={{width: "max-content", maxHeight: "360px"}}>
                                    <thead>
                                    <tr>
                                        <th className="text-center plugin-table-th" style={{width: "25px"}}>
                                            Order
                                        </th>
                                        <th className="text-center plugin-table-th" style={{width: "250px"}}>Question
                                        </th>
                                        <th className="plugin-table-th">Upvote</th>
                                        <th className="plugin-table-th">
                                        Status
                                        </th>
                                        <th className="plugin-table-th">
                                            Actions
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {presentationQuestion.map((data, index) =>
                                        <tr>
                                            <td className="text-center" scope="row">
                                                {index + 1}
                                            </td>
                                            <td className="fw-semibold fs-sm"
                                                style={{padding: "0px", textAlign: "center"}}>
                                                {data.question}
                                            </td>
                                            <td className="text-center" scope="row">
                                                {data.numUpVote}
                                            </td>
                                            <td className="text-center" scope="row">
                                                {data.isAnswered == true ?
                                                    <div className="plugin-question__status plugin-question__answered">
                                                        Answered
                                                    </div>
                                                    :
                                                    <div
                                                        className="plugin-question__status plugin-question__notanswered">
                                                        Not answered
                                                    </div>
                                                }
                                            </td>
                                            {
                                            data.isUpvote === true ?
                                                <td className="text-center" scope="row">
                                                    <i onClick={e => changeQuestionStatus(e)} type="button"
                                                       name="UpvoteIcon" className="fas fa-thumbs-up"
                                                       style={{"fontSize": "20px"}}>
                                                        <input name="questionId" type="hidden"
                                                               value={data.questionId}>
                                                               </input>
                                                    </i>
                                                </td>
                                                :
                                                <td className="text-center" scope="row">
                                                    <i onClick={e => changeQuestionStatus(e)} type="button"
                                                       name="UpvoteIcon" className="far fa-thumbs-up"
                                                       style={{"fontSize": "20px"}}>
                                                        <input name="questionId" type="hidden"
                                                               value={data.questionId}></input>
                                                    </i>

                                                </td>
                                            }

                                        </tr>
                                    )}
                                    </tbody>
                                </table>

                            </div>
                            <div
                                className="send-question-field card-footer d-flex justify-content-start align-items-center p-3"
                                id="inputQuestionField">
                                <input onKeyUp={e => handleKeyPressInInputField(e)} type="text"
                                       className="form-control form-control-lg" name="question"
                                       placeholder="Type question"/>
                                <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn"
                                                                                 onClick={sendQuestion}></i></span>
                                <div class="dropdown question-Sorter" id="filterQuestionDropdown">
                                            <div name="btnFilterQuestion" type="button"
                                                 class="btn btn-primary dropdown-toggle" id="dropdown-default-primary"
                                                 data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Asc time send
                                            </div>
                                            <div class="dropdown-menu fs-sm" aria-labelledby="dropdown-default-primary">
                                                <span onClick={e => handleQuestionFilter(e)}
                                                      class="dropdown-item">Answered</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Not answered</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Desc time send</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Asc time send</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Desc upvote num</span>
                                                <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Asc upvote num</span>
                                                {/* <span onClick={e => handleQuestionFilter(e)} class="dropdown-item">Default</span> */}
                                                {/* <div class="dropdown-divider"></div> */}
                                            </div>
                                        </div>                                     
                            </div>
                        </div>

                }

            </div>
        </>
    );
}

export default PresentationQuestion;
