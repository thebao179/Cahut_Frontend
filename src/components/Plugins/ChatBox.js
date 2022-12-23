function ChatBox() {
    return (
        <>
            <a className="btn btn-info btn-lg btn-block" data-mdb-toggle="collapse" href="#collapseChat"
                role="button" aria-expanded="false">
                <div className="d-flex justify-content-between align-items-center">
                    <span>Chat Box</span>
                    <i className="ms-2 fas fa-message"></i>
                </div>
            </a>
            <div className="collapse mt-3" id="collapseChat">
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
            </div>
        </>
    );
}

export default ChatBox;
