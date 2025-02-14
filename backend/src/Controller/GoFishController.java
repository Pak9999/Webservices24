package Controller;

import Boundry.CardAPIHandler;
import Model.AiMove;
import Model.CardGame;
import Model.PlayingCard;
import Model.StickObject;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.*;

/**
 * Class that handles the logic of the game.
 */
public class GoFishController {
    //private CardGame game = null;
    private APIController apiC = null;
    private HashMap<String, CardGame> allGames =new HashMap<>();

    public GoFishController() throws IOException, InterruptedException {
        this.apiC = new APIController();
    }

    /**
     * Method that returns a game.
     * @param id what game to be returned
     * @return a CardGame if it exists in the hashmap.
     */
    public CardGame getGame(String id) {
        return allGames.get(id);
    }

    /**
     * Main method used to test the logic in terminal.
     * @param args
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(String[] args) throws IOException, InterruptedException {
        GoFishController controller = new GoFishController();
        CardGame game = controller.createNewGame();
        System.out.println(game.getGameId());
        System.out.println(game.getRemainingCards());
        String id = game.getGameId();
        Scanner sc = new Scanner(System.in);

        while (game.getRemainingCards() > 0) {
            System.out.println("***********");
            System.out.println(game.getRemainingCards());
            System.out.println("*********");
            for (int i = 0; i < game.getPlayerHand().size(); i++) {
                System.out.println("Player: " + game.getPlayerHand().get(i));
            }
            System.out.println("***********");
            for (int i = 0; i < game.getComputerHand().size(); i++) {
                System.out.println("Computer: " + game.getComputerHand().get(i));
            }
            System.out.println("***********");
            String value = sc.next();
            controller.runGame(id, value);

            for (int i = 0; i < game.getCompletedPlayerPairs().size(); i++) {
                System.out.println("player completed: " + game.getCompletedPlayerPairs().get(i).toString());
            }
            System.out.println("-----------");
            for (int i = 0; i < game.getCompletedComputerPairs().size(); i++) {
                System.out.println("Comp completed: " + game.getCompletedComputerPairs().get(i).toString());
            }
            System.out.println("-----------");
            System.out.println("** " + (game.getRemainingCards() + game.getPlayerHand().size() + game.getCompletedPlayerPairs().size() + game.getComputerHand().size()+game.getCompletedComputerPairs().size()) + " **");
        }
        if (game.getCompletedPlayerPairs().size()>game.getCompletedComputerPairs().size()){
            System.out.println("Player won with: " + game.getCompletedPlayerPairs().size()/4 + " pairs");
        }
        else if (game.getCompletedComputerPairs().size() > game.getCompletedPlayerPairs().size()){
            System.out.println("Computer won with: " + game.getCompletedComputerPairs().size()/4 + " pairs");
        }
    }

    /**
     * Method that moves cards from player- or computer-hand to a completedPair list.
     * @param game What game to make the operations on
     * @param current Player- or computer-hand to move the cards from
     * @param completed Player- or computer-completed list to move cards to
     * @param s containing the value of the cards to be moved.
     * @throws InterruptedException
     */
    public void moveCards(CardGame game, ArrayList<PlayingCard> current, ArrayList<StickObject> completed, String s) throws InterruptedException {
        ArrayList<PlayingCard> a = new ArrayList<>();
        for (int i = 0; i < current.size(); i++) {
            if (current.get(i).getValue().equals(s)) {
                a.add(current.get(i));
                PlayingCard pc = current.get(i);
                current.remove(pc);
                i--;
            }
        }
        if(!a.isEmpty()) {
            StickObject obj = new StickObject(a.get(0), a.get(1), a.get(2), a.get(3));
            completed.add(obj);
        }

    }

    /**
     * Method that is used to create a new game
     * @return Returns a CardGame object.
     * @throws IOException
     * @throws InterruptedException
     */
    public CardGame createNewGame() throws IOException, InterruptedException {
        JsonNode deck = CardAPIHandler.getNewDeck();
        CardGame game = new CardGame();
        String id = deck.get("deck_id").toString();
        game.setGameId(id.substring(1,id.length()-1));
        System.out.println(game.getGameId());
        game.setRemainingCards(deck.get("remaining").asInt());
        setupGame(game);
        allGames.put(game.getGameId(), game);
        return game;
    }

    /**
     * Method that is used at the beginning of a new game to deal starting cards to player and computer.
     * Method also checks if the player or computer has a completed set after the starting cards has been dealt.
     * @param game what game to setup.
     * @throws IOException
     * @throws InterruptedException
     */
    public void setupGame(CardGame game) throws IOException, InterruptedException {
        dealCards(game, game.getPlayerHand(), 7);
        dealCards(game, game.getComputerHand(), 7);

        //Check if player has completed pairs at start of game
        String playerCompleted = checkPairs(game.getPlayerHand());
        moveCards(game, game.getPlayerHand(), game.getCompletedPlayerPairs(), playerCompleted);

        //Check if computer has completed pairs
        String compCompleted = checkPairs(game.getComputerHand());
        moveCards(game, game.getComputerHand(), game.getCompletedComputerPairs(), compCompleted);
    }

    /**
     * Method used to deal cards to the players of the game.
     * @param currentGame The game that is being updated
     * @param whosTurn If the playerhand or computerhand should recieve the cards.
     * @param nbrOfCards How many cards to deal
     * @throws IOException
     */
    public void dealCards(CardGame currentGame, ArrayList<PlayingCard> whosTurn, int nbrOfCards) throws IOException {
        JsonNode currentCards = CardAPIHandler.drawCards(currentGame.getGameId(), nbrOfCards);
        try {
            for (JsonNode card : currentCards.get("cards")) {
                String value = card.get("value").toString();
                String suit = card.get("suit").toString();
                String imgURI = card.get("image").toString();
                whosTurn.add(new PlayingCard(value.substring(1, value.length() - 1),
                        suit.substring(1, suit.length() - 1),
                        imgURI));
            }
            currentGame.setRemainingCards(currentCards.get("remaining").asInt());
        } catch (Exception e) {
            System.out.println("Execption i dealStartingCards");
            System.out.println(e);
        }
    }

    /**
     * Method that checks if there's a completed pair in a hand.
     * @param currentHand what hand to check.
     * @return If there is 4 of the same value it returns the value of this card as a String, else it returns nothing.
     */
    public String checkPairs(ArrayList<PlayingCard> currentHand) {
        HashMap<String, Integer> hm = new HashMap<>();
        for (PlayingCard pc : currentHand) {
            String s = pc.getValue();
            if (!hm.containsKey(s)) {
                hm.put(s, 1);
            } else {
                hm.put(s, hm.get(s) + 1);
            }
            if (hm.get(s) == 4) {
                return s;
            }
        }
        return null;
    }

    /**
     * Method that is used to ask for cards and move said cards if the opponent has any cards with that value
     * @param currentGame what game to run the method un.
     * @param value what value that is being asked for
     * @throws IOException
     * @throws InterruptedException
     */
    public void askFor(CardGame currentGame, String value) throws IOException, InterruptedException {
        boolean foundCards = false;
        if (currentGame.getRoundCounter() % 2 != 0) {
            currentGame.setLatestPlayerRequest(value);
            for (int i = 0; i < currentGame.getComputerHand().size(); i++) {
                PlayingCard card = currentGame.getComputerHand().get(i);
                if (card.getValue().equalsIgnoreCase(value)) {
                    currentGame.getPlayerHand().add(card);
                    currentGame.getComputerHand().remove(card);
                    i--;
                    foundCards = true;
                }
            }
            if (!foundCards) {
                dealCards(currentGame, currentGame.getPlayerHand(), 1);
            }
        } else {
            currentGame.setLatestComputerRequest(value);
            for (int i = 0; i < currentGame.getPlayerHand().size(); i++) {
                PlayingCard card = currentGame.getPlayerHand().get(i);
                if (card.getValue().equalsIgnoreCase(value)) {
                    currentGame.getComputerHand().add(card);
                    currentGame.getPlayerHand().remove(card);
                    i--;
                    foundCards = true;
                }
            }
            if (!foundCards) {
                dealCards(currentGame, currentGame.getComputerHand(), 1);
            }
        }
        currentGame.setRoundCounter((currentGame.getRoundCounter() + 1));
    }

    /**
     * Method that shuffles an array. Used for shuffling the computers hand to have it ask for different cards.
     * @param arrayList what arraylist to shuffle.
     */
    private void shuffleArray(ArrayList<PlayingCard> arrayList) {
        Collections.shuffle(arrayList);
    }

    /**
     * Method that is used to complete a full turn of the game.
     * @param id what game to be used
     * @param value The value of a card the player ask for
     * @return An updated CardGame object after both the player and computer has made a move
     * @throws IOException
     * @throws InterruptedException
     */
    public CardGame runGame(String id, String value) throws IOException, InterruptedException {
        CardGame game = allGames.get(id);
        //Player choice and moves
        askFor(game, value);
        String playerCompleted = checkPairs(game.getPlayerHand());
        moveCards(game, game.getPlayerHand(), game.getCompletedPlayerPairs(), playerCompleted);

        //Computers choice and moves
        AiMove nextMove = apiC.newMove();
        game.setDecisionBasedOnPicture(nextMove.getAdress());
        game.setComputerID(nextMove.getName());
        if (game.getComputerHand().isEmpty() && game.getRemainingCards() != 0){
            dealCards(game, game.getComputerHand(), 1);
        }
        shuffleArray(game.getComputerHand());
        try {
            String compValue = game.getComputerHand().get(nextMove.getNumber()).getValue();
            askFor(game, compValue);
        }catch (Exception e){
            try {
                String compValue = game.getComputerHand().get(0).getValue();
                askFor(game, compValue);
            }
            catch (Exception exception){
                System.out.println(exception.getMessage());
            }
        }
        String compCompleted = checkPairs(game.getComputerHand());
        moveCards(game, game.getComputerHand(), game.getCompletedComputerPairs(), compCompleted);

        if (game.getPlayerHand().isEmpty() && game.getRemainingCards() != 0){
            dealCards(game, game.getPlayerHand(), 1);
        }
        if (game.getComputerHand().isEmpty() && game.getRemainingCards() != 0){
            dealCards(game, game.getComputerHand(), 1);
        }

        return game;
    }

    /**
     * Method that deletes a game from the hashmap
     * @param id What game to remove
     */
    public void deletegame(String id){
        CardGame game = allGames.get(id);
        allGames.remove(game.getGameId());
    }

    /**
     * Method that returns the hashmap
     * @return a hashmap containing all games
     */
    public HashMap<String, CardGame> getAllgames(){
        return allGames;
    }
}

