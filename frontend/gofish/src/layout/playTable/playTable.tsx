import React from 'react';


import CardPile from '../../components/cardPile.tsx';
import ComputerHand from '../../components/computerHand.tsx';
import ComputerLatestRequest from '../../components/computerLatestRequest.tsx';
import ComputerTricks from '../../components/computerTricks.tsx';
import PlayerHand from '../../components/playerHand.tsx';
import PlayerLatestRequest from '../../components/playerLatestRequest.tsx';
import PlayerTricks from '../../components/playerTricks.tsx';






const PlayTable: React.FC = () => {
    return (
        <div className="play-table">
            <PlayerHand></PlayerHand>
            <ComputerHand></ComputerHand>
            <CardPile></CardPile>
            <PlayerTricks></PlayerTricks>
            <ComputerTricks></ComputerTricks>
            <PlayerLatestRequest></PlayerLatestRequest>
            <ComputerLatestRequest></ComputerLatestRequest>
        </div>
    );
}

export default PlayTable;




