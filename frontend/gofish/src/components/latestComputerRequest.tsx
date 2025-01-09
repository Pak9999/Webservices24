import React from "react";



interface LatestComputerRequestProps {
    latestComputerRequest: string;
}

/**
 * Latest computer request
 * @param {LatestComputerRequestProps} latestComputerRequest - the latest computer request
 * @returns {JSX.Element} the rendered component
 */
const LatestComputerRequest: React.FC<LatestComputerRequestProps> = ({ latestComputerRequest }) => {
    console.log("computer latest request: ", latestComputerRequest);

    // Latest computer request layout
    return (
        <>
            <div className="computer-latest-request">
                <p>Datorn bad senast om: {latestComputerRequest}</p>
            </div>
        </>
    );
}

export default LatestComputerRequest;