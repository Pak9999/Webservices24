import React from "react";



interface LatestPlayerRequestProps {
    latestPlayerRequest: string;
}

/**
 * Latest player request
 * @param {LatestPlayerRequestProps} latestPlayerRequest - the latest player request
 * @returns {JSX.Element} the rendered component
 */
const LatestPlayerRequest: React.FC<LatestPlayerRequestProps> = ({ latestPlayerRequest }) => {
    console.log("player latest request: ", latestPlayerRequest);

    // Latest player request layout
    return (
        <>
            <div className="player-latest-request">
                <p>Du bad senast om: {latestPlayerRequest}</p>
            </div>
        </>
    );
}

export default LatestPlayerRequest;