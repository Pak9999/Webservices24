package Boundry;

import Controller.GoFishController;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.Header;


import java.io.IOException;


public class GoFishAPI {
    private Gson gson = null;
    private GoFishController GFController = null;

    public GoFishAPI() throws IOException, InterruptedException{
        this.gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        this.GFController = new GoFishController();
    }

    public void CreateNewGame(Context ctx) throws IOException, InterruptedException {
        ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.createNewGame()));
    }
    public void GetGame(Context ctx) {
        if (GFController.getGame(ctx.pathParam("id")) != null) {
            ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.getGame(ctx.pathParam("id"))));
        } else {
            ctx.status(404).result("Spelet finns inte");
        }
    }
    public void PlayerAskFor(Context ctx) throws IOException, InterruptedException {
        String id = ctx.pathParam("id");
        if (GFController.getAllgames().containsKey(id)) {
            ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.runGame(id, ctx.queryParam("value"))));
        }
        else{
            ctx.status(404).result("Spelet finns inte");
        }
    }        //Osäker på om denna fungerar som den ska. Kanske får tänka om här


    public void DeleteGame(Context ctx){
        String id = ctx.pathParam("id"); //Används dock inte
        if(GFController.getAllgames().containsKey(id)) {
            GFController.deletegame(id);
        }
        else {
            ctx.status(404).result("Spelet finns inte");
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        GoFishAPI GFAPI = new GoFishAPI();

        Javalin app = Javalin.create(config -> {
                    config.bundledPlugins.enableCors(cors ->{
                        cors.addRule(it -> {
                            it.anyHost();
                        });
                    });
                })
                .post("/api/v1/gofishgames/", ctx -> {GFAPI.CreateNewGame(ctx);})
                .get("/api/v1/gofishgames/{id}", ctx -> {GFAPI.GetGame(ctx);})
                .put("/api/v1/gofishgames/{id}", ctx -> {GFAPI.PlayerAskFor(ctx);})
                .delete("/api/v1/gofishgames/{id}", ctx -> {GFAPI.DeleteGame(ctx);})
                .start(5008);
    }
}
