import React from "react";
import GroupsManage from "../GroupsManage/GroupsManage";

function GroupTab() {
  return (
    <div className="block block-rounded">
      <ul className="nav nav-tabs nav-tabs-block" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            type="button"
            className="nav-link active"
            id="btabs-static-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#btabs-static-home"
            role="tab"
            aria-controls="btabs-static-home"
            aria-selected="true"
          >
            Group owned
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            type="button"
            className="nav-link"
            id="btabs-static-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#btabs-static-profile"
            role="tab"
            aria-controls="btabs-static-profile"
            aria-selected="false"
            tabIndex="-1"
          >
            Group joined
          </button>
        </li>
      </ul>
      <div className="block-content tab-content">
        <div
          className="tab-pane active show"
          id="btabs-static-home"
          role="tabpanel"
          aria-labelledby="btabs-static-home-tab"
          tabIndex="0"
        >
          <GroupsManage />
        </div>
        <div
          className="tab-pane"
          id="btabs-static-profile"
          role="tabpanel"
          aria-labelledby="btabs-static-profile-tab"
          tabIndex="0"
        >
          <GroupsManage />
        </div>
      </div>
    </div>
  );
}

export default GroupTab;
