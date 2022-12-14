/* eslint-disable */
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import presentationApi from "../../api/PresentationApi";
import multipleChoiceQuestionApi from "../../api/MultipleChoiceQuestionApi";
import choiceApi from "../../api/ChoiceApi";

function PresentationResult() {
    const params = useParams();
    const navigate = useNavigate();
    const [presName, setPresName] = useState();
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);
    const [isAccess, setIsAccess] = useState(false);
    let isInitial = useRef(true);

    useEffect(() => {
        async function fetchData() {
            const info = await presentationApi.getPresentationInfoTeacher(params.id);
            if (info.status) setIsAccess(true);
            else navigate('/dashboard');
            const result = await presentationApi.getPresentationName(params.id);
            if (result.status) setPresName(result.data.presentationName);
            const questionArr = await multipleChoiceQuestionApi.getResultQuestions(params.id);
            if (questionArr.status) setQuestions(questionArr.data);
            isInitial = false;
        }

        if (isInitial) fetchData();
        if (!DataTable.isDataTable('#presentation-results'))
            $('#presentation-results').DataTable({
                pageLength: 10,
                lengthMenu: !1,
                searching: !1,
                autoWidth: !1,
                dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>",
                destroy: true,
                bInfo: false,
            });
    }, [choices]);

    const getResults = async (e) => {
        const choiceArr = await choiceApi.getChoiceResults(params.id, e.target.value);
        if (choiceArr.status) setChoices(choiceArr.data);
        if (DataTable.isDataTable('#presentation-results'))
            $('#presentation-results').DataTable().destroy();
    }

    if (!isAccess) {
        return (
            <></>
        );
    }

    return (
        <div className="content content-boxed">
            <button type="button" className="btn btn-danger me-1" onClick={() => navigate(-1)}>
                <i className="fa fa-fw fa-arrow-left me-1"></i> Back
            </button>
            <div className="mt-3" style={{fontSize: "26px"}}>
                Results for <span className="text-info fw-bold">{presName}</span>
            </div>
            <div className="mt-3">
                <label className="fw-bold mb-1">Question</label>
                <select className="form-select" onChange={getResults}>
                    <option hidden>Choose your question</option>
                    {questions.map(e =>
                        <option key={e.questionId} value={e.questionId}>{e.content}</option>
                    )}
                </select>
            </div>
            <div className="mt-4 mb-4" id="result-table">
                <label className="fw-bold mb-1">Result</label>
                <table className="bg-white table table-bordered table-striped table-vcenter"
                       id="presentation-results">
                    <thead>
                    <tr>
                        <th className="fw-bold">Username</th>
                        <th className="fw-bold d-none d-sm-table-cell" style={{width: "25%"}}>Email</th>
                        <th className="fw-bold d-none d-sm-table-cell" style={{width: "30%"}}>Choice</th>
                        <th className="fw-bold d-none d-sm-table-cell" style={{width: "20%"}}>Date Submitted</th>
                    </tr>
                    </thead>
                    <tbody>
                    {choices.map(e =>
                        <tr key={e.email}>
                            <td className="fw-semibold fs-sm">{e.userName}</td>
                            <td className="d-none d-sm-table-cell fs-sm">{e.email}</td>
                            <td className="d-none d-sm-table-cell fw-semibold">{e.choiceContent}</td>
                            <td>{new Date(e.submitTime).toLocaleString('en-GB')}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PresentationResult;
