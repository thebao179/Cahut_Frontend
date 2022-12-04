/* eslint-disable */
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BarChart, Bar, LabelList, ResponsiveContainer} from "recharts";

function PresentationDetail({usrToken}) {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!usrToken) {
    //         navigate('/');
    //         localStorage.setItem('prevurl', location.pathname);
    //     }
    // }, []);
    const [nameInvalid, setNameInvalid] = useState(false);
    const [questionInvalid, setQuestionInvalid] = useState(false);
    const [data, setData] = useState([
        {name: "Page A", uv: 4000},
        {name: "Page B", uv: 3000},
        {name: "Page C", uv: 2000},
    ]);

    const addOption = () => {
        $('#slide-options').append(
            '<div class="d-flex mb-3">\n' +
            '<input type="text" class="form-control me-3" placeholder="Your Answer"/>\n' +
            '<button type="button" class="text-center btn btn-sm btn-danger" onclick="removeOption(this)">\n' +
            '<i class="fa fa-fw fa-xmark"></i>\n' +
            '</button>\n' +
            '</div>\n'
        );
    }

    const removeOption = (e) => {
        $(e.target).closest('div.d-flex.mb-3').remove();
    }

    const addSlide = () => {

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
        }).then((result) => {
            if (result.isConfirmed) {

            }
        })
    }

    const saveSlide = () => {
        let count = 0;
        $('#slide-options').find('input').each(function (k, v) {
            const value = $(v).val();
            if (!value) {
                $(v).addClass('is-invalid');
                count++;
            }
        });
        const question = $('#slide-properties').find('input[name=question]').val();
        if (!question) setQuestionInvalid(true);
        else if (count === 0) {
            //Update
            setData([
                {name: "Page A", uv: 4000},
                {name: "Page B", uv: 3000}
            ]);
            setQuestionInvalid(false);
        }
    }

    const presentSlide = () => {

    }

    const changePName = (e) => {
        if (!e.target.value) setNameInvalid(true);
        else {
            //Update
            setNameInvalid(false);
        }
    }

    return (
        <div id="page-container" className="h-100">
            {/*Header*/}
            <header id="page-header">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <div className="me-sm-3">
                            <Link to={'/presentations'}>
                                <i className="text-warning fa fa-2x fa-arrow-left"></i>
                            </Link>
                        </div>
                        <div className="me-sm-3">
                            <input type="text" className={`form-control ${nameInvalid ? 'is-invalid' : ''}`} defaultValue="Presentation" onChange={changePName}/>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-alt-success" onClick={addSlide}>
                                <i className="fa fa-fw fa-plus me-1"></i> Slide
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-info" onClick={presentSlide}>
                                <i className="fa fa-fw fa-display me-1"></i> Present
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/*Body*/}
            <main id="main-container" className="position-relative"
                  style={{flexDirection: "row", flex: "1 1 auto", height: "calc(100vh - 64px)", borderTop: '1px solid #0000001a'}}>
                <div className="h-100 flex-wrap position-relative bg-white"
                     style={{width: '230px', overflowY: "auto"}}>
                    <ol className="slide-preview pe-0 ps-0">
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3 bg-info-light" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <span className="pe-3 fw-bold">1</span>
                                <div className="text-center"
                                    style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <span className="pe-3 fw-bold">2</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <span className="pe-3 fw-bold">3</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <span className="pe-3 fw-bold">4</span>
                                <div className="text-center"
                                     style={{borderStyle: "solid", borderWidth: "1px", height: '100px', flex: "1 1 auto"}}>
                                    <div className="mt-4"><i className="fa fa-chart-simple"></i></div>
                                    <span className="fw-bold">Multiple Choice</span>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/'} style={{color: "black"}}>
                            <li className="d-flex pt-3 pb-3" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                <span className="pe-3 fw-bold">5</span>
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
                    <div className="p-4" style={{height: 'fit-content'}}>
                        <div className="bg-white p-4 h-100">
                            <div className="d-flex pt-2 justify-content-center">
                                <p>Go to <span style={{fontWeight: 'bold'}}>1312312</span> to play</p>
                            </div>
                            <div className="d-flex ps-4" style={{lineHeight: 1}}>
                                <p style={{fontSize: '30px', fontWeight: 'bold'}}>Multiple Choice</p>
                            </div>
                            <div className="d-flex justify-content-center" style={{height: '300px', width: '100%'}}>
                                <ResponsiveContainer width="90%" height="100%">
                                    <BarChart width={150} height={40} data={data}
                                              margin={{top: 20, bottom: 20}}>
                                        <Bar dataKey="uv"
                                             fill="#4c78dd">
                                            <LabelList dataKey="name"
                                                       position="bottom"
                                                       style={{fontWeight: "bold"}}/>
                                            <LabelList dataKey="uv" position="top" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-100 position-relative bg-white"
                     style={{width: '460px', overflow: "auto"}}>
                    <div className="p-4" id="slide-properties">
                        <div className="d-flex justify-content-between mb-4">
                            <button type="button" className="btn btn-danger" onClick={removeSlide}>
                                <i className="fa fa-fw fa-times me-1"></i> Delete
                            </button>
                            <button type="button" className="btn btn-primary" onClick={saveSlide}>
                                <i className="fa fa-fw fa-upload me-1"></i> Save
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="form-label" style={{fontWeight: 'bold'}}>Your Question</label>
                            <input type="text" name="question" className={`form-control ${questionInvalid ? 'is-invalid' : ''}`} defaultValue="Multiple Choice"/>
                        </div>
                        <div className="mb-4" id="slide-options">
                            <label className="form-label" style={{fontWeight: 'bold'}}>Options</label>
                            <div className="d-flex mb-3">
                                <input type="text" className="form-control me-3" placeholder="Your Answer" defaultValue="Answer A"/>
                                <button type="button" className="text-center btn btn-sm btn-danger" onClick={removeOption}>
                                    <i className="fa fa-fw fa-xmark"></i>
                                </button>
                            </div>
                            <div className="d-flex mb-3">
                                <input type="text" className="form-control me-3" placeholder="Your Answer" defaultValue="Answer B"/>
                                <button type="button" className="text-center btn btn-sm btn-danger" onClick={removeOption}>
                                    <i className="fa fa-fw fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-alt-secondary w-100" onClick={addOption}>
                                <i className="fa fa-fw fa-plus me-1"></i>Add option</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PresentationDetail;
