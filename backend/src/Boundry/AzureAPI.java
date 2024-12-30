package Boundry;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.json.JSONArray;
import kong.unirest.core.json.JSONObject;

import java.util.HashMap;

public class AzureAPI {
    private String apiKey;
    private String endPoint = "https://bilar.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Objects";
    private HashMap<String,String> map = new HashMap<>();
    public AzureAPI(String apiKey){
        this.apiKey = apiKey;
    }
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
                JSONObject j = response.getBody().getObject();
                JSONArray a = j.getJSONArray("objects");
                //System.out.println(a.toString());
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
