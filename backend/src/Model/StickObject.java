package Model;

public class StickObject {
    private PlayingCard c1;
    private PlayingCard c2;
    private PlayingCard c3;
    private PlayingCard c4;

    public StickObject(PlayingCard c1, PlayingCard c2, PlayingCard c3, PlayingCard c4){
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.c4 = c4;
    }

    public PlayingCard getC1(PlayingCard c1, PlayingCard c2, PlayingCard c3, PlayingCard c4) {
        return c1;
    }

    public void setC1(PlayingCard c1) {
        this.c1 = c1;
    }

    public PlayingCard getC2() {
        return c2;
    }

    public void setC2(PlayingCard c2) {
        this.c2 = c2;
    }

    public PlayingCard getC3() {
        return c3;
    }

    public void setC3(PlayingCard c3) {
        this.c3 = c3;
    }

    public PlayingCard getC4() {
        return c4;
    }

    public void setC4(PlayingCard c4) {
        this.c4 = c4;
    }
}
