import React from 'react';



interface CardPileProps {
    remainingCards: number;
}


const CardPile: React.FC<CardPileProps> = ({ remainingCards }) => {
    console.log("Cards left:", remainingCards.length);
    return (
        <>
            <div className="card-pile">
                <h3>Card Pile</h3>
                <p>Cards Left: {remainingCards}</p>
                
            </div>

        </>
    );
}

export default CardPile;