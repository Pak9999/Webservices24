package Model;

/**
 * Modelklass som innehåller information om ett drag/val av datorspelaren.
 */
public class AiMove {
   private String adress;
   private String name;
   private int number;

    public AiMove(String adress, int number, String name) {
        this.adress = adress;
        this.number = number;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "AiMove{" +
                "adress='" + adress + '\'' +
                ", name='" + name + '\'' +
                ", number=" + number +
                '}';
    }
}
