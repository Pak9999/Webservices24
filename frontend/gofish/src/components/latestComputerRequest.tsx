import React from "react";


interface LatestComputerRequestProps {
    latestComputerRequest: string;
}

const LatestComputerRequest: React.FC<LatestComputerRequestProps> = ({ latestComputerRequest }) => {
    console.log("computer latest request: ", latestComputerRequest);
    return (
        <>
            <div className="computer-latest-request">
                <p>Datorn bad senast om: {latestComputerRequest}</p>
            </div>
        </>
    );
}

export default LatestComputerRequest;