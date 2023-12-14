import React from 'react';

function Title() {
    const imageURL = "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhaW58ZW58MHx8MHx8fDA%3D";
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center mt-5">
                <div className="col-md-6 mb-4">
                    <div className="card border-0">
                        <div className="card-body">
                            <h2 className="card-title">Welcome,</h2>
                            <p className="card-text w-75">
                                Revolutionize your travel experience with our train travel website, offering seamless booking, real-time updates, and curated itineraries. Explore the world by rail, where every journey is a story waiting to be written.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card" style={{ maxWidth: "100%" }}>
                        <img src={imageURL} className="card-img-top" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Title;
