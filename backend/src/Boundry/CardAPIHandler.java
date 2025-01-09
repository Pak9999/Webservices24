package Boundry;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Class that is used to fetch a deck of cards and to deal cards from a deck
 */
public class CardAPIHandler {

    /**
     * Method that posts a request to the deckofcardsapi and recieves a JSON object in return.
     * @return A JsonNode that can be used in other classes.
     */
    public static JsonNode getNewDeck(){
        String getNewDeckURI = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(getNewDeckURI))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200){
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readTree(response.body());
            }

        }catch (Exception e){
            System.out.println(e);
        }
        return null;
    }

    /**
     * Class that is used to draw cards from a deck
     * @param id The id of the deck you want to draw cards from
     * @param number How many cards you wish to draw from the deck
     * @return A JsonNode that is used in other classes to handle the drawn cards.
     */
    public static JsonNode drawCards(String id, int number){
        String url = "https://deckofcardsapi.com/api/deck/"+id+"/draw/?count="+number;
        try {
            HttpClient httpClient = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200){
                ObjectMapper objectMapper = new ObjectMapper();
                return objectMapper.readTree(response.body());
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return null;

    }
}
