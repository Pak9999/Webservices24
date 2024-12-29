import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class GoFishController {
    private CardGame game = null;

    public GoFishController() throws IOException, InterruptedException {
        this.game = createNewGame();
    }

    public CardGame getGame() {
        return game;
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        GoFishController controller = new GoFishController();
        CardGame game = controller.getGame();
        System.out.println(game.getGameId());
        System.out.println(game.getRemainingCards());
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
            controller.runGame(value);

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

    public void moveCards(CardGame game, ArrayList<PlayingCard> current, ArrayList<PlayingCard> completed, String s) throws InterruptedException {

        TimeUnit.SECONDS.sleep(1);
        for (int i = 0; i < current.size(); i++) {
            if (current.get(i).getValue().equals(s)) {
                PlayingCard pc = current.get(i);
                completed.add(pc);
                current.remove(pc);
            }
        }
        TimeUnit.SECONDS.sleep(1);
        for (int i = 0; i < current.size(); i++) {
            if (current.get(i).getValue().equals(s)) {
                PlayingCard pc = current.get(i);
                completed.add(pc);
                current.remove(pc);
            }
        }


    }

    public CardGame createNewGame() throws IOException, InterruptedException {
        JsonNode deck = CardAPIHandler.getNewDeck();
        this.game = new CardGame();
        game.setGameId(deck.get("deck_id").toString());
        game.setRemainingCards(deck.get("remaining").asInt());
        setupGame();
        return game;
    }

    public void setupGame() throws IOException, InterruptedException {
        dealCards(game, game.getPlayerHand(), 7);
        dealCards(game, game.getComputerHand(), 7);

        //Check if player has completed pairs at start of game
        String playerCompleted = checkPairs(game.getPlayerHand());
        moveCards(game, game.getPlayerHand(), game.getCompletedPlayerPairs(), playerCompleted);

        //Check if computer has completed pairs
        String compCompleted = checkPairs(game.getComputerHand());
        moveCards(game, game.getComputerHand(), game.getCompletedComputerPairs(), compCompleted);
    }

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

    public void askFor(CardGame currentGame, String value) throws IOException, InterruptedException {
        boolean foundCards = false;
        if (currentGame.getRoundCounter() % 2 != 0) {
            currentGame.setLatestPlayerRequest(value);
            for (int i = 0; i < currentGame.getComputerHand().size(); i++) {
                PlayingCard card = currentGame.getComputerHand().get(i);
                if (card.getValue().equalsIgnoreCase(value)) {
                    currentGame.getPlayerHand().add(card);
                    currentGame.getComputerHand().remove(card);
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
                    foundCards = true;
                }
            }
            if (!foundCards) {
                dealCards(currentGame, currentGame.getComputerHand(), 1);
            }
        }
        currentGame.setRoundCounter((currentGame.getRoundCounter() + 1));
    }

    private void shuffleArray(ArrayList<PlayingCard> arrayList) {
        Collections.shuffle(arrayList);
    }
    public String checkCompChoise(String compvalue){
        if (compvalue == game.getLatestComputerRequest()) {
            shuffleArray(game.getComputerHand());
            compvalue = game.getComputerHand().get(0).getValue();
        }
        return compvalue;
    }

    public CardGame runGame(String value) throws IOException, InterruptedException {
        //Player choice and moves
        askFor(game, value);
        String playerCompleted = checkPairs(game.getPlayerHand());
        moveCards(game, game.getPlayerHand(), game.getCompletedPlayerPairs(), playerCompleted);

        //Computers choice and moves
        String compValue = checkCompChoise("2"); //byt ut 2 mot Olas metod i senare skede.
        askFor(game, compValue);
        String compCompleted = checkPairs(game.getComputerHand());
        moveCards(game, game.getComputerHand(), game.getCompletedComputerPairs(), compCompleted);

        return game;
    }
    public void deletegame(){
        this.game = null;
    }
}

