import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/header/header.tsx";
import PlayTable from "../../layout/playtable/playTable.tsx";
import Footer from "../../layout/footer/footer.tsx";

import "./game.css";

const Game: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div className="missing-id-error">
                    <p>Error: Game ID is missing</p>
                </div>;
    }

    return (
        <>
            <div className="app-container">
                <Header />
                <PlayTable gameId={id} />
                <Footer />
            </div>
        </>
    );
}

export default Game;