package Boundry;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.json.JSONArray;
import kong.unirest.core.json.JSONObject;
import java.util.ArrayList;
import java.util.HashSet;

public class GoogleAPI {
    private String apiKey;
    private String endPoint = "https://vision.googleapis.com/v1/images:annotate?key=";
    private HashSet<String> fordon;

    public GoogleAPI(String apiKey){
        this.fordon = new HashSet<>();
        fordon.add("Car");
        fordon.add("Truck");
        fordon.add("Bus");
        fordon.add("Motorcycle");
        fordon.add("Bicycle");
        this.apiKey = apiKey;
        this.endPoint = endPoint + apiKey;
    }

    public int countCars(String adress) {
        GoogleRequest req = new GoogleRequest(adress);
        try {
            HttpResponse<JsonNode> response = Unirest.post(endPoint)
                    .header("Content-Type", "application/json")
                    .body(req)
                    .asJson();

            if (response.getStatus() == 200)  {
                //System.out.println(response.getBody().toPrettyString());
                JSONObject jsonObject = response.getBody().getObject();
                if (!jsonObject.has("responses")) {

                    return 0;
                }
                if (!jsonObject.has("localizedObjectAnnotations")) {

                    return 0;
                }

               JSONArray resultArray =  jsonObject.getJSONArray("responses").getJSONObject(0).getJSONArray("localizedObjectAnnotations");

               if (resultArray.isEmpty()){
                   return 0;
                }

               int counter = 0;
                for (int i = 0; i < resultArray.length() ; i++) {
                    JSONObject foundObj = resultArray.getJSONObject(i);

                    if (fordon.contains(foundObj.getString("name"))){
                        counter++;
                    }
                }
                return counter;
            } else {
                System.out.println("Nått gick fel i Google retunerar 0");
                return 0;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("Nått gick fel i Google retunerar 0");
            return 0;
        }
    }
    /**
     Inre klasser för att skapa JSON objekt till body i anropet.
     */
    private static class GoogleRequest {
        private ArrayList<Req> requests;

        public GoogleRequest(String uri) {
            requests = new ArrayList<>();
            requests.add(new Req(uri));
        }

        public ArrayList<Req> getRequests() {
            return requests;
        }

        public void setRequests(ArrayList<Req> requests) {
            this.requests = requests;
        }

        private static class Req {
            private Image image;
            private ArrayList<Feature> features;

            public Req(String imageUri) {
                this.image = new Image(imageUri);
                this.features = new ArrayList<>();
                this.features.add(new Feature());
            }

            public Image getImage() {
                return image;
            }

            public void setImage(Image image) {
                this.image = image;
            }

            public ArrayList<Feature> getFeatures() {
                return features;
            }

            public void setFeatures(ArrayList<Feature> features) {
                this.features = features;
            }
        }

        private static class Image {
            private Source source;

            public Image(String imageUri) {
                this.source = new Source(imageUri);
            }

            public Source getSource() {
                return source;
            }

            public void setSource(Source source) {
                this.source = source;
            }
        }

        private static class Source {
            private String imageUri;

            public Source(String imageUri) {
                this.imageUri = imageUri;
            }

            public String getImageUri() {
                return imageUri;
            }

            public void setImageUri(String imageUri) {
                this.imageUri = imageUri;
            }
        }

        private static class Feature {
            private String type = "OBJECT_LOCALIZATION";
            private int maxResults = 100;

            public String getType() {
                return type;
            }

            public void setType(String type) {
                this.type = type;
            }

            public int getMaxResults() {
                return maxResults;
            }

            public void setMaxResults(int maxResults) {
                this.maxResults = maxResults;
            }
        }
    }



}

