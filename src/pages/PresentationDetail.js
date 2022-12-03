import React from "react";
import {Link} from "react-router-dom";

function PresentationDetail() {
    return (
        <div id="page-container" className="h-100">
            {/*Header*/}
            <header id="page-header">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-sm-3">
                            <Link to={'/presentations'}>
                                <i className="fa fa-2x fa-arrow-left"></i>
                            </Link>
                        </div>
                        <div className="me-sm-3">
                            <input type="text" className="form-control" defaultValue="Presentation"/>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-alt-success">
                                <i className="fa fa-fw fa-plus me-1"></i> Slide
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-info">
                                <i className="fa fa-fw fa-display me-1"></i> Present
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/*Body*/}
            <main id="main-container" className="position-relative"
                  style={{flexDirection: "row", flex: "1 1 auto", height: "90vh", borderTop: '1px solid #0000001a'}}>
                <div className="h-100 flex-wrap position-relative bg-white"
                     style={{width: '225px', overflowY: "auto"}}>
                    <ol className="slide-preview pe-0 ps-0">
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3 bg-info-light" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                                <span className="pe-3">1</span>
                                <div className="text-center"
                                    style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                                <span className="pe-3">2</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                                <span className="pe-3">3</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                                <span className="pe-3">4</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '8px', paddingRight: '8px'}}>
                                <span className="pe-3">5</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                    </ol>
                </div>
                <div className="h-100 position-relative"
                     style={{width: "auto", flex: "1 1 auto"}}>
                    <div className="p-4 w-100" style={{height: '550px'}}>
                        <div className="bg-white h-100">
                            <div className="d-flex pt-2 justify-content-center">
                                <p>Go to <span style={{fontWeight: 'bold'}}>sadsadsdsad</span> to play</p>
                            </div>
                            <div className="d-flex ps-4">
                                <p style={{fontSize: '30px', fontWeight: 'bold'}}>Multiple Choice</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-100 position-relative bg-white"
                     style={{width: '460px', overflow: "auto"}}>
                    <div className="p-4">
                        <div className="mb-4">
                            <label className="form-label" style={{fontWeight: 'bold'}}>Your Question</label>
                            <input type="text" className="form-control" defaultValue="Multiple Choice"/>
                        </div>
                        <div className="mb-4">
                            <label className="form-label" style={{fontWeight: 'bold'}}>Options</label>
                            <div className="d-flex mb-3">
                                <input type="text" className="form-control me-3" defaultValue="Answer A"/>
                                <button type="button" className="text-center btn btn-sm btn-danger">
                                    <i className="fa fa-fw fa-xmark"></i>
                                </button>
                            </div>
                            <div className="d-flex mb-3">
                                <input type="text" className="form-control me-3" defaultValue="Answer B"/>
                                <button type="button" className="text-center btn btn-sm btn-danger">
                                    <i className="fa fa-fw fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-alt-secondary w-100">
                                <i className="fa fa-fw fa-plus me-1"></i> Add option</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PresentationDetail;
