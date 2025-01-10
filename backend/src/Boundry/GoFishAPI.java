package Boundry;

import Controller.GoFishController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.Header;


import java.io.IOException;

/**
 * Class for our API. Frontend and Backend communicate through this API-class.
 */

public class GoFishAPI {
    private Gson gson = null;
    private GoFishController GFController = null;

    public GoFishAPI() throws IOException, InterruptedException{
        this.gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        this.GFController = new GoFishController();
        Javalin app = Javalin.create(config -> {
                    config.bundledPlugins.enableCors(cors ->{
                        cors.addRule(it -> {
                            it.anyHost();
                        });
                    });
                })
                .post("/api/v1/gofishgames/", ctx -> {this.CreateNewGame(ctx);})
                .get("/api/v1/gofishgames/{id}", ctx -> {this.GetGame(ctx);})
                .put("/api/v1/gofishgames/{id}", ctx -> {this.PlayerAskFor(ctx);})
                .delete("/api/v1/gofishgames/{id}", ctx -> {this.DeleteGame(ctx);})
                .start(5008);
    }

    /**
     * Method that creats a new game.
     * @param ctx containing information to be sent back.
     * @throws IOException
     * @throws InterruptedException
     */
    public void CreateNewGame(Context ctx) throws IOException, InterruptedException {
        ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.createNewGame()));
    }

    /**
     * Method that returns a Json-object of the requested game.
     * @param ctx containing information to be sent back
     */
    public void GetGame(Context ctx) {
        if (GFController.getGame(ctx.pathParam("id")) != null) {
            ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.getGame(ctx.pathParam("id"))));
        } else {
            ctx.status(404).result("Spelet finns inte");
        }
    }

    /**
     * Method that calls the GoFishController to make a move in a game.
     * @param ctx Contains information such as what game to update and what value to ask for
     * @throws IOException
     * @throws InterruptedException
     */
    public void PlayerAskFor(Context ctx) throws IOException, InterruptedException {
        String id = ctx.pathParam("id");
        if (GFController.getAllgames().containsKey(id)) {
            ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.runGame(id, ctx.queryParam("value"))));
        }
        else{
            ctx.status(404).result("Spelet finns inte");
        }
    }        //Osäker på om denna fungerar som den ska. Kanske får tänka om här

    /**
     * Method that is used to delete a game.
     * @param ctx contains information such as what game to be deleted.
     */
    public void DeleteGame(Context ctx){
        String id = ctx.pathParam("id"); //Används dock inte
        if(GFController.getAllgames().containsKey(id)) {
            GFController.deletegame(id);
        }
        else {
            ctx.status(404).result("Spelet finns inte");
        }
    }

}
