package dtos;

public class FetchDTO {

    private RestaurantDTO data;

    public FetchDTO() {
    }

    public FetchDTO(RestaurantDTO data) {
        this.data = data;
    }

    public RestaurantDTO getData() {
        return data;
    }

    public void setData(RestaurantDTO data) {
        this.data = data;
    }
}
