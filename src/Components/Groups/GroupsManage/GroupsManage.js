import React from "react";

function GroupsManage() {
  return (
    <div className="content content-boxed">
      <div className="input-group">
        <button type="button" className="btn btn-primary">
          <i className="fa fa-search me-1 opacity-50" /> Search
        </button>
        <input
          type="text"
          id="example-group3-input1"
          name="example-group3-input1"
          placeholder="Group name"
          style={{ width: "18rem" }}
        />
      </div>
      <div className="row items-push py-4">
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-city">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="fab fa-html5 fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">10 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">
                Learn HTML5 in 10 simple and easy to follow steps
              </h4>
              <div className="fs-sm text-muted">November 5, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-flat">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="fab fa-css3 fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">12 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Be a pro with CSS3 in only two weeks</h4>
              <div className="fs-sm text-muted">November 1, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-amethyst">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-vector fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">4 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Using SVG is easier than ever</h4>
              <div className="fs-sm text-muted">October 27, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-smooth">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-rocket fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">18 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">
                Build a modern web application from scratch
              </h4>
              <div className="fs-sm text-muted">October 25, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-default">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <span className="fs-lg fw-bold text-white-75">PS</span>
              </div>
              <div className="fs-sm text-white-75">5 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">
                UI Design in Photoshop: Tips &amp; Tricks
              </h4>
              <div className="fs-sm text-muted">October 10, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-modern">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-user-following fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">9 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Marketing 101: All the basics</h4>
              <div className="fs-sm text-muted">October 1, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-warning">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-target fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">5 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">
                How to make your page convert in 5 steps
              </h4>
              <div className="fs-sm text-muted">September 19, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-success">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-support fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">21 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">How to provide rock star support</h4>
              <div className="fs-sm text-muted">September 15, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-info">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-social-twitter fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">7 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Social marketing the right way</h4>
              <div className="fs-sm text-muted">September 7, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-danger">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-briefcase fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">5 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Project management in 5 simple steps</h4>
              <div className="fs-sm text-muted">August 28, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-gray-dark">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-camcorder fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">7 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">
                Learn how to create better screencasts
              </h4>
              <div className="fs-sm text-muted">August 19, 2021</div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-3">
          <a className="block block-rounded block-link-pop h-100 mb-0">
            <div className="block-content block-content-full text-center bg-primary">
              <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                <i className="si si-chemistry fa-2x text-white-75" />
              </div>
              <div className="fs-sm text-white-75">12 Users</div>
            </div>
            <div className="block-content block-content-full">
              <h4 className="h5 mb-1">Learn how to create jQuery plugins</h4>
              <div className="fs-sm text-muted">August 5, 2021</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default GroupsManage;
