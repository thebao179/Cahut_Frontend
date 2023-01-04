import $ from 'jquery';
import React, {useEffect,useRef, useState} from "react";
import chatApi from "../../api/ChatApi";

function ChatBox({connection, presentationId, userEmail}) {
    const [chatMsgs, setChatMsgs] = useState([]);
    const hasNewMessage = useRef(false)
    const isChatBoxOpen = useRef(false)

    const fetchData = async () => {
        const chatMsgList = await chatApi.getAllChatMessages(presentationId);
        setChatMsgs(chatMsgList.data)
    }

    useEffect(() => {
            fetchData()
        }, []
    )

    useEffect(() => {
        connection.on("ReceiveMessage", async (slideId, message) => {
            hasNewMessage.current = true;
            await fetchData();
        });
    }, [connection])

    const sendMessage = async () => {
        const msg = $('#inputMsgField').find('input[name=message]').val();
        if (msg.trim()) {
            $('#inputMsgField').find('input[name=message]').val('');
            const sendMsgResult = await chatApi.sendMessage(userEmail, msg, presentationId);
            if (sendMsgResult.status == true) {
                if (connection) {
                    await connection.send("SendMessage", presentationId, msg);
                }
                fetchData();
            }

        } else {
            // eslint-disable-next-line no-undef
            One.helpers('jq-notify', {
                type: `${'danger'}`,
                icon: `${'fa fa-times me-1'}`,
                message: `Can not send empty message`
            });
        }
    }

    const dateFormat = (data) => {
        return new Date(data).toLocaleString("en-GB")
    }

    const handleKeyPressInInputField = async (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    const ChangeChatBoxOpenStatus = () => {
        isChatBoxOpen.current = !isChatBoxOpen.current;
        hasNewMessage.current = false;
        fetchData();
    }

    return (
        <>
            <div className="plugin-container">
                <div className={`btn ${hasNewMessage.current == true && isChatBoxOpen.current == false ? "btn-warning" :"btn-info"} btn-lg btn-block`} data-mdb-toggle="collapse" href="#collapseChat"
                     role="button" aria-expanded="false" onClick={ChangeChatBoxOpenStatus}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>Chat Box</span>
                        {hasNewMessage.current == true && isChatBoxOpen.current == false ? 
                        <i className="ms-2 fas fa-bell text-warning-light"></i>
                        :
                        <i className="ms-2 fas fa-message"></i>
                        }
                    </div>

                </div>

                <div className="collapse mt-3 plugin-data-chat" id="collapseChat">
                    <div className="card">
                        <div className="card-body"
                             style={{position: "relative", height: "370px", width: "400px"}}>
                            <div>
                                <div className='chat-content'>
                                    {chatMsgs.map((data, index) =>
                                        <>
                                            <p key={data.timeSent} className='small p-2 ms-3 mb-1 rounded-3'
                                               style={{backgroundColor: "#f5f6f7", maxWidth: "90%"}}>
                                                {data.sender}: {data.message}
                                            </p>
                                            <p className="small ms-4 mb-3 rounded-3 text-muted"
                                               style={{fontSize: "11px"}}>
                                                {dateFormat(data.timeSent)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-start align-items-center p-3"
                             id="inputMsgField">
                            <input onKeyUp={e => handleKeyPressInInputField(e)} type="text"
                                   className="form-control form-control-lg" name="message" placeholder="Type message"/>
                            <span className="ms-3 link-info send-msg-btn"><i className="fas fa-paper-plane btn"
                                                                             onClick={sendMessage}></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatBox;
