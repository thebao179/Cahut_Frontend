import React from "react";
import Navbar from "../Navbar/Navbar";

function DashBoard() {
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
          <div className="flex-grow-1 mb-1 mb-md-0">
            <h1 className="h3 fw-bold mb-2">Dashboard</h1>
            <h2 className="h6 fw-medium fw-medium text-muted mb-0">
              Welcome <a className="fw-semibold">John</a>, everything looks
              great.
            </h2>
          </div>
          <div className="mt-3 mt-md-0 ms-md-3 space-x-1">
            <a className="btn btn-sm btn-alt-secondary space-x-1">
              <i className="fa fa-cogs opacity-50" />
              <span>Settings</span>
            </a>
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn btn-sm btn-alt-secondary space-x-1"
                id="dropdown-analytics-overview"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-fw fa-calendar-alt opacity-50" />
                <span>All time</span>
                <i className="fa fa-fw fa-angle-down" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-end fs-sm"
                aria-labelledby="dropdown-analytics-overview"
              >
                <a className="dropdown-item fw-medium">Last 30 days</a>
                <a className="dropdown-item fw-medium">Last month</a>
                <a className="dropdown-item fw-medium">Last 3 months</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item fw-medium">This year</a>
                <a className="dropdown-item fw-medium">Last Year</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item fw-medium d-flex align-items-center justify-content-between">
                  <span>All time</span>
                  <i className="fa fa-check" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="row items-push">
          <div className="col-sm-6 col-xxl-3">
            <div className="block block-rounded d-flex flex-column h-100 mb-0">
              <div className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                <dl className="mb-0">
                  <dt className="fs-3 fw-bold">32</dt>
                  <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                    Groups
                  </dd>
                </dl>
                <div className="item item-rounded-lg bg-body-light">
                  <i className="far fa-gem fs-3 text-primary" />
                </div>
              </div>
              <div className="bg-body-light rounded-bottom">
                <a
                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  <span>View all groups</span>
                  <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="block block-rounded d-flex flex-column h-100 mb-0">
              <div className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                <dl className="mb-0">
                  <dt className="fs-3 fw-bold">124</dt>
                  <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                    Slides
                  </dd>
                </dl>
                <div className="item item-rounded-lg bg-body-light">
                  <i className="far fa-user-circle fs-3 text-primary" />
                </div>
              </div>
              <div className="bg-body-light rounded-bottom">
                <a
                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  <span>View all slides</span>
                  <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="block block-rounded d-flex flex-column h-100 mb-0">
              <div className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                <dl className="mb-0">
                  <dt className="fs-3 fw-bold">45</dt>
                  <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                    New topic
                  </dd>
                </dl>
                <div className="item item-rounded-lg bg-body-light">
                  <i className="far fa-paper-plane fs-3 text-primary" />
                </div>
              </div>
              <div className="bg-body-light rounded-bottom">
                <a
                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  <span>View all topics</span>
                  <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="block block-rounded d-flex flex-column h-100 mb-0">
              <div className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                <dl className="mb-0">
                  <dt className="fs-3 fw-bold">30</dt>
                  <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                    New quiz
                  </dd>
                </dl>
                <div className="item item-rounded-lg bg-body-light">
                  <i className="fa fa-chart-bar fs-3 text-primary" />
                </div>
              </div>
              <div className="bg-body-light rounded-bottom">
                <a
                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                  href="javascript:void(0)"
                >
                  <span>View Quiz</span>
                  <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
