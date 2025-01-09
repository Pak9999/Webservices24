package Boundry;

import Model.ResponseObjTrafikverket;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.json.JSONObject;
import java.util.ArrayList;

/**
 * Klassen hanterar anrop och svar till/från Trafikverkets API
 */
public class TrafikverketAPI {
   private final String endPoint = "https://api.trafikinfo.trafikverket.se/v2/data.json";
   private String apiKey;
   private ArrayList<String> listaID;
   private int counter = 0;
   private String xmlRequest;


    public TrafikverketAPI(String apiKey) {
        this.listaID = new ArrayList<>();
        listaID.add("SE_STA_CAMERA_Geni_4483_K1");
        listaID.add("SE_STA_CAMERA_Geni_4869_K1");
        listaID.add("SE_STA_CAMERA_Orion_2500001");
        listaID.add("SE_STA_CAMERA_Orion_2500002");
        listaID.add("SE_STA_CAMERA_Orion_2500003");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500048");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500049");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500089");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500087");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500045");
        listaID.add("SE_STA_CAMERA_Orion_2500004");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500087");
        listaID.add("SE_STA_CAMERA_PacificSouth_2500089");
        this.apiKey = apiKey;
    }

    /**
     *  Metoden skapar ett xml objekt baserat på listan av kameror i listaID.
     *  Skickar ett postanrop med xml objektet.
     *  Plockar ut URL och namn från JSON svar.
     *  Lägger till "?type=fullsize" till url sträng
     *  Skapar och returnerar ett ResponseObjTrafikverket.
     * @return ResponseObjTrafikverket Innehåller två strängar. En URL till bilden och namn på aktuell kamera
     */
    public ResponseObjTrafikverket getNewPicture() {
        xmlRequest =  String.format("""
        <REQUEST>
        <LOGIN authenticationkey="%s"/>
        <QUERY objecttype="Camera" schemaversion="1" limit="1">
         <FILTER><EQ name="Id" value="%s" /></FILTER>
        </QUERY>
        </REQUEST>
        """,apiKey, listaID.get(counter % listaID.size()));

        HttpResponse<JsonNode> response = Unirest.post(endPoint)
                .header("Content-Type", "application/xml")
                .body(xmlRequest)
                .asJson();

    if (response.getStatus() == 200){
        try {
            JSONObject jsonResponse = response.getBody().getObject();
            String fotoURL = jsonResponse.getJSONObject("RESPONSE")
                    .getJSONArray("RESULT")
                    .getJSONObject(0)
                    .getJSONArray("Camera")
                    .getJSONObject(0)
                    .getString("PhotoUrl");

            String nameOfCamera = jsonResponse
                    .getJSONObject("RESPONSE")
                    .getJSONArray("RESULT")
                    .getJSONObject(0)
                    .getJSONArray("Camera")
                    .getJSONObject(0)
                    .getString("Name");

            fotoURL = fotoURL+"?type=fullsize";
            counter++;
            return new ResponseObjTrafikverket(nameOfCamera, fotoURL);
        }
        catch (Exception e){
            System.out.println("fel konvertering till String från Json");
            return new ResponseObjTrafikverket("Något gick snett hos Trafikverket så använder bild av August Persson 4 år", "https://i.postimg.cc/D0wrFBK3/IMG-5367.jpg");
        }
    }
    else {
        System.out.println("nått gick åt helvete" + response.getStatus());
        System.out.println("Använder standard bild och namn");
        counter++;
        return new ResponseObjTrafikverket("Något gick snett hos Trafikverket så använder bild av August Persson 4 år", "https://i.postimg.cc/D0wrFBK3/IMG-5367.jpg");
    }
    }
}
