import Controller.APIController;
import Model.AiMove;

public class Tester {

    public static void main(String[] args) {
        APIController c = new APIController();




        long before = System.currentTimeMillis();

        for (int i = 0; i < 10 ; i++) {
            AiMove move = c.newMove();
            System.out.println(move);
        }
        System.out.println((System.currentTimeMillis() - before) / 1000.0);


    }
}
