import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.http.Header;

import java.io.IOException;


public class GoFishAPI {
    private Gson gson = null;
    private GoFishController GFController = null;

    public GoFishAPI(){
        this.gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    }

    public void CreateNewGame(Context ctx) throws IOException, InterruptedException {
        this.GFController = new GoFishController();
        ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.createNewGame()));
    }
    public void GetGame(Context ctx){
        ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.getGame()));
    }
    public void PlayerAskFor(Context ctx) throws IOException, InterruptedException {
        ctx.header(Header.CONTENT_TYPE, "application/json").json(gson.toJson(GFController.runGame(ctx.attribute("value"))));
        //Osäker på om denna fungerar som den ska. Kanske fpr tänka om här
    }
    public void DeleteGame(Context ctx){
        String id = ctx.pathParam("id"); //Används dock inte
        GFController.deletegame();
    }

    public static void main(String[] args) {
        GoFishAPI GFAPI = new GoFishAPI();
        Javalin javalin = Javalin.create(config -> {
                config.plugins.enableCors(cors -> {
                    cors.add(it ->{
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
