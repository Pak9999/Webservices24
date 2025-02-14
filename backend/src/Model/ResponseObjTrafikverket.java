package Model;

/**
 * Model klass som innehåller information från ett anrop till trafikverkets API
 */
public class ResponseObjTrafikverket
{
   private String name;
   private String url;

    public ResponseObjTrafikverket(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "ResponseObjTrafikverket{" +
                "name='" + name + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
