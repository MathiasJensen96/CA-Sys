package dtos;

public class FetchRestaurantDTO {

    private RestaurantDTO data;

    public FetchRestaurantDTO() {
    }

    public FetchRestaurantDTO(RestaurantDTO data) {
        this.data = data;
    }

    public RestaurantDTO getData() {
        return data;
    }

    public void setData(RestaurantDTO data) {
        this.data = data;
    }
}
