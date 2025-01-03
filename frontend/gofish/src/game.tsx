import React from "react";
import { useParams } from "react-router-dom";
import Header from "./layout/header/header.tsx";
import PlayTable from "./layout/playTable/playTable.tsx";
import Footer from "./layout/footer/footer.tsx";
const Game: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <Header />
            <PlayTable gameId={id} />
            <Footer />
        </>
    );
}

export default Game;