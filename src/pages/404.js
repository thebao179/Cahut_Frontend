function NotFoundPage() {
    return (
        <div id="page-container">
            <main id="main-container">
                <div className="hero">
                    <div className="hero-inner text-center">
                        <div className="bg-body-extra-light">
                            <div className="content content-full overflow-hidden">
                                <div className="py-4">
                                    <h1 className="display-1 fw-bolder text-city">
                                        404
                                    </h1>
                                    <h2 className="h4 fw-normal text-muted mb-5">
                                        We are sorry but the page you are looking for was not found..
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="content content-full text-muted fs-sm fw-medium">
                            <a className="link-fx" href="/">Go Back to Dashboard</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default NotFoundPage;
