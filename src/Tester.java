public class Tester {
    //Ola
    public static void main(String[] args) {
        APIController c = new APIController();
        for (int i = 0; i < 12 ; i++) {
            AiMove move = c.newMove();
            System.out.println(move);
        }



    }
}
