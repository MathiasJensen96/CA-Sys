package dtos;

public class OurDTO {

    private String id;
    private String businessname;
    private String image;
    private String location;
    private String phone;
    private String address;

    public OurDTO() {
    }

    public OurDTO(RestaurantDTO restaurantDTO) {
        this.id = restaurantDTO.getId();
        this.businessname = restaurantDTO.getBusinessname();
        this.image = restaurantDTO.getImage();
        this.location = restaurantDTO.getLocation();
        this.phone = restaurantDTO.getPhone();
        this.address = restaurantDTO.getAddress();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBusinessname() {
        return businessname;
    }

    public void setBusinessname(String businessname) {
        this.businessname = businessname;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}