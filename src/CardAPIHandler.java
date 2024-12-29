import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import netscape.javascript.JSObject;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class CardAPIHandler {

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

    public static JsonNode drawCards(String id, int number){
        String url = "https://deckofcardsapi.com/api/deck/"+id.substring(1,id.length()-1)+"/draw/?count="+number;
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
