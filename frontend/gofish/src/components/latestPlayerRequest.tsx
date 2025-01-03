import React from "react";

interface LatestPlayerRequestProps {
    latestPlayerRequest: string;
}

const LatestPlayerRequest: React.FC<LatestPlayerRequestProps> = ({ latestPlayerRequest }) => {
    console.log("player latest request: ", latestPlayerRequest);
    return (
        <>
            <div className="player-latest-request">
                <p>Du bad senast om: {latestPlayerRequest}</p>
            </div>
        </>
    );
}

export default LatestPlayerRequest;