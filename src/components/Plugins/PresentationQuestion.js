import { useEffect, useState } from "react";

function PresentationQuestion() {
    
    const [isQuestionHide, setIsQuestionPanelHide] = useState(true)
    const ToggleQuestionPanel = () => {
        setIsQuestionPanelHide(!isQuestionHide)
    }

    return (
        <>
            <div className="col-md-6">
                <div className={isQuestionHide ? 'block block-rounded':'block block-rounded block-mode-hidden'}>
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
            </div>


        </>
    );
}

export default PresentationQuestion;
