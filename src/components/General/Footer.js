import React from "react";

function Footer() {
    return (
        <footer id="page-footer" className="bg-body-extra-light">
            <div className="content py-3">
                <div className="row fs-sm">
                    <div className="col-sm-6 order-sm-2 py-1 text-center text-sm-end">
                        Crafted with <i className="fa fa-heart text-danger"></i> by
                        <a className="fw-semibold"
                           href="https://1.envato.market/ydb"
                           target="_blank"> HCMUS</a>
                    </div>
                    <div className="col-sm-6 order-sm-1 py-1 text-center text-sm-start">
                        <a className="fw-semibold" href="https://1.envato.market/AVD6j" target="_blank">
                            HCMUS</a> © <span data-toggle="year-copy" className="js-year-copy-enabled">2022</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
