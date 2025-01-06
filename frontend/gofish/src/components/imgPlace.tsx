import React from 'react';

"decisionBasedOnPicture": "https://api.trafikinfo.trafikverket.se/v2/Images/TrafficFlowCamera_39635213.Jpeg?type=fullsize",
"computerID": "Bulltofta österut",

interface ImgPlaceProps {
    decisionBasedOnPicture: string;
    computerID: string;
}

const ImgPlace: React.FC<ImgPlaceProps> = ({ decisionBasedOnPicture, computerID }) => {
    return (
        <div className="img-place">
            <h3>Computer's ID: {computerID}</h3>
            <img src={decisionBasedOnPicture} alt="Traffic Camera" className="img" />
        </div>
    );
}