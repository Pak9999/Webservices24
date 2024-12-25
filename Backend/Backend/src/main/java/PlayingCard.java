import java.util.Comparator;

public class PlayingCard {
    private String value;
    private String suit;
    private String imgURI;

    public PlayingCard(String value, String suit, String imgURI){
        this.value = value;
        this.suit = suit;
        this.imgURI = imgURI;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getSuit() {
        return suit;
    }

    public void setSuit(String suit) {
        this.suit = suit;
    }

    public String getImgURI() {
        return imgURI;
    }

    public void setImgURI(String imgURI) {
        this.imgURI = imgURI;
    }

    @Override
    public String toString() {
        return "PlayingCard: " +value + " " + suit + " " +imgURI;
    }
}
