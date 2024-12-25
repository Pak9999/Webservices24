import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

public class GoFishController {


    public static void main(String[] args) throws IOException, InterruptedException {
        CardGame game = createNewGame();
        System.out.println(game.getGameId());
        System.out.println(game.getRemainingCards());
        game.setPlayerHand(dealCards(game, null, 7));
        game.setComputerHand(dealCards(game, null, 7));
        Scanner sc = new Scanner(System.in);

        while (game.getRemainingCards() > 0){
            System.out.println("***********");
            System.out.println(game.getRemainingCards());
            System.out.println("*********");
            for (int i = 0; i < game.getPlayerHand().size(); i++){
                System.out.println("Player: "+game.getPlayerHand().get(i));
            }
            System.out.println("***********");
            for (int i = 0; i < game.getComputerHand().size(); i++){
                System.out.println("Computer: "+game.getComputerHand().get(i));
            }
            System.out.println("***********");

            if (game.getRoundCounter() %2 != 0) {
                String value = sc.next();
                if (value == "ö"){
                    for (int i = 0; i < game.getCompletedPlayerPairs().size(); i++){
                        System.out.println(game.getCompletedPlayerPairs().get(i).toString());
                    }
                    System.out.println("-----------");
                }

                System.out.println("***********");

                askFor(game, value);
                System.out.println("***********");
                String s = checkPlayerPairs(game.getPlayerHand());
                if (s != null) {
                    System.out.println("WOWOWOWOWOWOWOWOWOWOWOWOOWOWOWOWOWOW");
                    System.out.println(s);
                    ArrayList<PlayingCard> completedPairs = game.getCompletedPlayerPairs();
                    moveCards(game,game.getPlayerHand(), game.getCompletedPlayerPairs(), s);
                    System.out.println("---------");
                    for (int i = 0; i < completedPairs.size(); i++){
                        System.out.println(completedPairs.get(i).toString());
                    }
                    System.out.println("-----------");
                }
            }
            else {
                String value = "2";
                if (value == game.getLatestComputerRequest()){
                    shuffleArray(game.getComputerHand());
                    TimeUnit.SECONDS.sleep(1);
                    value=game.getComputerHand().get(0).getValue();
                }
                System.out.println("Computer asked for: "+ value);
                askFor(game, value);
                String s = checkComputerPairs(game.getComputerHand());
                if (s != null) {
                    System.out.println("WOWOWOWOWOWOWOWOWOWOWOWOOWOWOWOWOWOW");
                    System.out.println(s);
                    ArrayList<PlayingCard> completedPairs = game.getCompletedComputerPairs();
                    moveCards(game,game.getComputerHand(), game.getCompletedComputerPairs(), s);
                    System.out.println("---------");
                    for (int i = 0; i < completedPairs.size(); i++){
                        System.out.println("Comp completed: "+completedPairs.get(i).toString());
                    }
                    System.out.println("-----------");
                }
            }
        }
        for (int i = 0; i < game.getCompletedPlayerPairs().size(); i++){
            System.out.println("player completed: "+game.getCompletedPlayerPairs().get(i).toString());
        }
        System.out.println("-----------");
        for (int i = 0; i < game.getCompletedComputerPairs().size(); i++){
            System.out.println("Comp completed: "+game.getCompletedComputerPairs().get(i).toString());
        }
        System.out.println("-----------");
    }
    public static void moveCards(CardGame game,ArrayList<PlayingCard> current, ArrayList<PlayingCard> completed, String s) throws InterruptedException {

        TimeUnit.SECONDS.sleep(1);
        for(int i = 0; i < current.size(); i++){
            String st = s;
            if(current.get(i).getValue().equals(s)){
                PlayingCard pc = current.get(i);
                completed.add(pc);
                current.remove(i);
            }
        }
        for(int i = 0; i < current.size(); i++) {
            String st = s;
            if (current.get(i).getValue().equals(s)) {
                PlayingCard pc = current.get(i);
                completed.add(pc);
                current.remove(i);
            }
        }
        /*
        if (game.getRemainingCards() == 0 && game.getPlayerHand().size()==1){
            PlayingCard pc = currentArray.get(0);
            completed.add(pc);
            currentArray.remove(pc);
        }
         */
    }

    public static CardGame createNewGame(){
        JsonNode deck = CardAPIHandler.getNewDeck();
        CardGame game = new CardGame();
        game.setGameId(deck.get("deck_id").toString());
        game.setRemainingCards(deck.get("remaining").asInt());
        return game;
    }

    public static ArrayList<PlayingCard> dealCards(CardGame currentGame, ArrayList<PlayingCard> whosTurn, int nbrOfCards) throws IOException {
        JsonNode currentCards = CardAPIHandler.drawCards(currentGame.getGameId(), nbrOfCards);
        if (whosTurn == null){
            whosTurn = new ArrayList<>();
        }
        try {
            for(JsonNode card : currentCards.get("cards")){
                String value = card.get("value").toString();
                String suit = card.get("suit").toString();
                String imgURI = card.get("image").toString();
                whosTurn.add(new PlayingCard(value.substring(1, value.length()-1),
                        suit.substring(1, suit.length()-1),
                        imgURI));
            }
            currentGame.setRemainingCards(currentCards.get("remaining").asInt());
            return whosTurn;
        }catch (Exception e){
            System.out.println("Execption i dealStartingCards");
            System.out.println(e);
        }
        return null;
    }

    public static String checkPlayerPairs(ArrayList<PlayingCard> currentHand) throws InterruptedException {
        HashMap<String, Integer> hm = new HashMap<>();
        for (PlayingCard pc : currentHand) {
            String s = pc.getValue();
            if (!hm.containsKey(s)) {
                hm.put(s, 1);
            } else {
                hm.put(s, hm.get(s)+1);
            }
            if(hm.get(s) == 4){
                return s;
            }
        }

        return null;
    }

    public static String checkComputerPairs(ArrayList<PlayingCard> currentHand){
        HashMap<String, Integer> hm = new HashMap<>();
        for (PlayingCard pc : currentHand){
            String s = pc.getValue();
            if (!hm.containsKey(s)){
                hm.put(s, 1);
            } else {
                hm.put(s, hm.get(s)+1);
            }
            if (hm.get(s) == 4){
                return s;
            }
        }
        return null;
    }

    public static void askFor(CardGame currentGame, String value) throws IOException, InterruptedException {
        boolean foundCards = false;
        if(currentGame.getRoundCounter() % 2 != 0) {
            currentGame.setLatestPlayerRequest(value);
            for (int i = 0; i < currentGame.getComputerHand().size(); i++){
                PlayingCard card = currentGame.getComputerHand().get(i);
                if (card.getValue().equalsIgnoreCase(value)){
                    currentGame.getPlayerHand().add(card);
                    currentGame.getComputerHand().remove(card);
                    foundCards = true;
                }
            }
            System.out.println("*******");
            if (!foundCards) {
                currentGame.setPlayerHand(dealCards(currentGame,currentGame.getPlayerHand(),1));
            }
        }
        else {
            currentGame.setLatestComputerRequest(value);
            for (int i = 0; i < currentGame.getPlayerHand().size(); i++){
                PlayingCard card = currentGame.getPlayerHand().get(i);
                if (card.getValue().equalsIgnoreCase(value)){
                    currentGame.getComputerHand().add(card);
                    currentGame.getPlayerHand().remove(card);
                    foundCards = true;
                }
            }
            if (!foundCards){
                currentGame.setComputerHand(dealCards(currentGame, currentGame.getComputerHand(), 1));
            }
        }
        currentGame.setRoundCounter((currentGame.getRoundCounter()+1));
    }

    private static ArrayList<PlayingCard> shuffleArray(ArrayList<PlayingCard> arrayList){
        PlayingCard[] tempArray = new PlayingCard[arrayList.size()];
        for (int i = 0; i < arrayList.size(); i++){
            tempArray[i] = arrayList.get(i);
            arrayList.remove(i);
        }
        int N = arrayList.size();

        Random randomGenerator = new Random();
        for (int i = 0; i < N; i++) {
            int r = i + randomGenerator.nextInt(N-i);     // between i and N-1
            PlayingCard t = tempArray[i]; tempArray[i] = tempArray[r]; tempArray[r] = t;
        }
        for (int i = 0; i < N; i++){
            PlayingCard pc = tempArray[i];
            arrayList.add(pc);
        }
        return arrayList;
    }
}
