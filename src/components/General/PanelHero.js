import React from "react";

function PanelHero({ title, desc, photo }) {
    const photoName = photo ? photo : title
    return (
        <div className="bg-image" style={{backgroundImage: 'url("/assets/media/photos/' + photoName + '-photo@2x.jpg")'}}>
            <div className="bg-primary-dark-op">
                <div className="content content-full">
                    <div className="py-3 text-center">
                        <h1 className="h3 text-white fw-bold mb-2">
                            {title}
                        </h1>
                        <h2 className="h6 fw-medium text-white-75 mb-0">
                            {desc}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PanelHero;
