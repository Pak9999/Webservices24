package Boundry;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.json.JSONArray;
import kong.unirest.core.json.JSONObject;

import java.util.HashMap;

/**
 * Klassen hanterar anrop och svar från Azure
 */
public class AzureAPI {
    private String apiKey;
    private String endPoint = "https://bilar.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Objects";
    private HashMap<String,String> map = new HashMap<>();

    public AzureAPI(String apiKey){
        this.apiKey = apiKey;
    }

    /**
     * Metoden skickar ett anrop till Azure och hanterar returen.
     * @param adress en sträng som inehålller URL till den aktuella bilden som ska analyseras
     * @return int antalet identifierade fordon
     */
    public int countCars(String adress) {
        map.clear();
        map.put("url", adress);
        try {
            HttpResponse<JsonNode> response = Unirest.post(endPoint)
                    .header("Ocp-Apim-Subscription-Key", apiKey)
                    .header("Content-Type", "application/json")
                    .body(map)
                    .asJson();

            if (response.getStatus() == 200){
                //Azure har i alla tester bara kunnat identifier fordon från bilderna. Därför kontroleras inte vilken typ av objekt det är.
                JSONObject j = response.getBody().getObject();
                JSONArray a = j.getJSONArray("objects");
                return a.length();
            }
            else {
                System.out.println("Nått gick fel i Azure retunerar 0");
               return 0;
            }
        }
        catch (Exception e){
            System.out.println("Nått gick fel i Azure retunerar 0");
            return 0;
        }




    }
}
