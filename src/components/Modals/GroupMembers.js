import { useEffect, useState } from "react";

function GroupMembers({ groupName, data, role,  handleRemoveBtnClick}) {
    const [rows, setRows] = useState();
    useEffect(() => {
        function createRows() {
            const tempRow = data.map(e =>
                <tr>
                    <td className="fw-semibold fs-sm">{e.username}</td>
                    <td className="d-none d-sm-table-cell fs-sm">{e.email}</td>
                    <td className="d-none d-sm-table-cell">
                        {role === 3 ? <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning">Owner</span> : 
                        <select className="form-select">
                            <option value="1">Co-Owner</option>
                            <option value="2">Member</option>
                        </select>}
                    </td>
                    <td>
                        {(role !== 3 && role !== 0) ? <button type="button" className="text-center btn btn-sm btn-danger removeBtn" onClick={() => {console.log(groupName)}}>
                            <i className="fa fa-fw fa-xmark"></i>
                        </button> : ''}
                    </td>
                </tr>
            )
            setRows(tempRow);
        } createRows();
    }, [])

    return (
        <>
            <table className="table table-bordered table-striped table-vcenter" id="group-members">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th className="d-none d-sm-table-cell" style={{ width: "30%" }}>Email</th>
                        <th className="d-none d-sm-table-cell" style={{ width: "20%" }}>Role</th>
                        <th data-orderable="false" style={{ width: "10%" }}></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </>
    )
}

export default GroupMembers;