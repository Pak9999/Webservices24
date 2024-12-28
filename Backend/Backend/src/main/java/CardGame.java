import java.sql.Time;
import java.util.ArrayList;

public class CardGame {
    private String gameId;
    private String CardDeckid;
    private ArrayList<PlayingCard> playerHand = new ArrayList<>();
    private ArrayList<PlayingCard> computerHand = new ArrayList<>();
    private int remainingCards;
    private int roundCounter = 1;
    private String latestPlayerRequest;
    private String latestComputerRequest;
    private String decisionBasedOnPicture;
    private String playerID;
    private String computerID;
    private ArrayList<PlayingCard> completedPlayerPairs = new ArrayList<>();
    private ArrayList<PlayingCard> completedComputerPairs = new ArrayList<>();

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getCardDeckid() {
        return CardDeckid;
    }

    public void setCardDeckid(String cardDeckid) {
        CardDeckid = cardDeckid;
    }

    public ArrayList<PlayingCard> getPlayerHand() {
        return playerHand;
    }

    public void setPlayerHand(ArrayList<PlayingCard> playerHand) {
        this.playerHand = playerHand;
    }

    public ArrayList<PlayingCard> getComputerHand() {
        return computerHand;
    }

    public void setComputerHand(ArrayList<PlayingCard> computerHand) {
        this.computerHand = computerHand;
    }

    public int getRemainingCards() {
        return remainingCards;
    }

    public void setRemainingCards(int remainingCards) {
        this.remainingCards = remainingCards;
    }

    public int getRoundCounter() {
        return roundCounter;
    }

    public void setRoundCounter(int roundCounter) {
        this.roundCounter = roundCounter;
    }

    public ArrayList<PlayingCard> getCompletedPlayerPairs() {
        return completedPlayerPairs;
    }

    public void setCompletedPlayerPairs(ArrayList<PlayingCard> completedPlayerPairs) {
        this.completedPlayerPairs = completedPlayerPairs;
    }

    public ArrayList<PlayingCard> getCompletedComputerPairs() {
        return completedComputerPairs;
    }

    public void setCompletedComputerPairs(ArrayList<PlayingCard> completedComputerPairs) {
        this.completedComputerPairs = completedComputerPairs;
    }

    public String getLatestPlayerRequest() {
        return latestPlayerRequest;
    }

    public void setLatestPlayerRequest(String latestPlayerRequest) {
        this.latestPlayerRequest = latestPlayerRequest;
    }

    public String getLatestComputerRequest() {
        return latestComputerRequest;
    }

    public void setLatestComputerRequest(String latestComputerRequest) {
        this.latestComputerRequest = latestComputerRequest;
    }

    public String getDecisionBasedOnPicture() {
        return decisionBasedOnPicture;
    }

    public void setDecisionBasedOnPicture(String decisionBasedOnPicture) {
        this.decisionBasedOnPicture = decisionBasedOnPicture;
    }

    public String getPlayerID() {
        return playerID;
    }

    public void setPlayerID(String playerID) {
        this.playerID = playerID;
    }

    public String getComputerID() {
        return computerID;
    }

    public void setComputerID(String computerID) {
        this.computerID = computerID;
    }
}
