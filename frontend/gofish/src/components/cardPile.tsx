import React from 'react';



interface CardPileProps {
    remainingCards: number;
}


const CardPile: React.FC<CardPileProps> = ({ remainingCards }) => {
    console.log("Cards left:", remainingCards.length);
    return (
        <>
            <div className="card-pile">
                <p>Cards Left: {remainingCards}</p>
                
            </div>

        </>
    );
}

export default CardPile;