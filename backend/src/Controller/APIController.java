package Controller;

import Boundry.AzureAPI;
import Boundry.GoogleAPI;
import Boundry.TrafikverketAPI;
import Model.AiMove;
import Model.ResponseObjTrafikverket;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Klassen hanterar kedjan av händelser när Datorspelaren ska göra ett drag
 */
public class APIController {
   private TrafikverketAPI trafikverketAPI;
   private AzureAPI azureAPI;
   private GoogleAPI googleAPI;


    public APIController(){
        Dotenv dotenv = Dotenv.load();
        this.trafikverketAPI = new TrafikverketAPI(dotenv.get("Trafik"));
        this.azureAPI = new AzureAPI(dotenv.get("Azure"));
        this.googleAPI = new GoogleAPI(dotenv.get("Google"));
    }

    /**
     * Metoden hanterar kedjan av händelser när Datorspelaren ska göra ett drag
     * @return ett AiMove som innehåller informationen om hur många objekt som identifierats, url till bilden och namn på kameran,
     */
    public AiMove newMove(){
        ResponseObjTrafikverket response = trafikverketAPI.getNewPicture();
        int nbrGoogle = googleAPI.countCars(response.getUrl());
        int nbrAzure = azureAPI.countCars(response.getUrl());
        if (nbrAzure>nbrGoogle){
            return new AiMove(response.getUrl(), nbrAzure,response.getName());
                    }
        else {
            return new AiMove(response.getUrl(), nbrGoogle,response.getName());
        }
    }
}
