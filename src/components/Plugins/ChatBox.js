import $ from 'jquery';
import React, {useEffect, useState} from "react";
import chatApi from "../../api/ChatApi";
import {HubConnectionBuilder} from "@microsoft/signalr";

function ChatBox({presentationId, userEmail}) {
    const [connection, setConnection] = useState();
    const [chatMsgs, setChatMsgs] = useState([]);

    const fetchData = async() =>{
        const chatMsgList = await chatApi.getAllChatMessages(presentationId);
        console.log('ds tin nhan', chatMsgList);
        setChatMsgs(chatMsgList.data)
    }

    useEffect(() => {
        fetchData()
    }, []
    )

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            // .withUrl(process.env.REACT_APP_REALTIME_HOST + "?slideId=" + currSlideId.current, { accessTokenFactory: () => usrToken })
            .withUrl(process.env.REACT_APP_REALTIME_HOST + "?presentationId=" + presentationId)
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log(connection.connectionId);
                    connection.on("ReceiveResult", (slideId, message) => {
                        if (message === "updateResult")
                            fetchData();
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection])

    const StopPropa = (e) =>{
        e.stopPropagation();
    };

    const sendMessage = async () => {
        const msg = $('#inputMsgField').find('input[name=message]').val();
        $('#inputMsgField').find('input[name=message]').val('')
        const sendMsgResult = chatApi.sendMessage(userEmail, msg, presentationId);
        console.log('ket qua gui tn', sendMsgResult);
    }

    const dateFormat = (data) => {
        return new Date(data).toLocaleString()
    }

    return (
        <>
        <div className="plugin-container">
            <div className="btn btn-info btn-lg btn-block" data-mdb-toggle="collapse" href="#collapseChat"
                role="button" aria-expanded="false">
                <div className="d-flex justify-content-between align-items-center">
                    <span>Chat Box</span>
                    <i className="ms-2 fas fa-message"></i>
                </div>

            </div>
            
            <div className="collapse mt-3 plugin-data-chat" id="collapseChat">
                <div className="card">
                    <div className="card-body"
                        style={{ position: "relative", height: "370px", width: "400px" }}>
                             {/* className="d-flex flex-row justify-content-start" */}
                        <div>
                            <div className='chat-content'>
                                {chatMsgs.map((data, index) => 
                                <>
                                    <p key={data.timeSent} className='small p-2 ms-3 mb-1 rounded-3' style={{ backgroundColor: "#f5f6f7", maxWidth:"90%"}}>
                                        {data.sender}: {data.message}
                                    </p>
                                <p className="small ms-4 mb-3 rounded-3 text-muted" style={{fontSize:"11px"}}>
                                    {dateFormat(data.timeSent)}
                                </p>
                                </>
                                )}
                                {/* <p className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7", width:"90%",  }}>Hi</p>
                                <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}> sender: How
                                    are you
                                    ...???
                                    </p>
                                <p className="small ms-4 mb-3 rounded-3 text-muted" style={{fontSize:"11px"}}>23:58</p>
                                
                                */}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-start align-items-center p-3" id="inputMsgField">
                        <input type="text" className="form-control form-control-lg" name="message" placeholder="Type message" />
                        <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn" onClick={sendMessage}></i></span>
                    </div>
                </div>
            </div>
            </div>

            {/* <div className="collapse mt-3" id="collapseChat">
                <div className="card">
                    <div className="card-body" data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "300px", width: "400px" }}>
                        <div className="d-flex flex-row justify-content-start">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                            <div>
                                <p className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7" }}>Hi</p>
                                <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>How
                                    are you
                                    ...???</p>
                                <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>What
                                    are you
                                    doing
                                    tomorrow? Can we come up a bar?
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-start align-items-center p-3">
                        <input type="text" className="form-control form-control-lg" name="message" placeholder="Type message" />
                        <a className="ms-3 link-info" href="#"><i className="fas fa-paper-plane"></i></a>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default ChatBox;
