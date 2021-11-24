package dtos;

public class RestaurantDTO {

    private String id;
    private String businessname;
    private String image;
    private String location;
    private String phone;
    private String address;
    private String menu;

    public RestaurantDTO() {
    }

    public RestaurantDTO(String id, String businessname, String image, String location, String phone, String address, String menu) {
        this.id = id;
        this.businessname = businessname;
        this.image = image;
        this.location = location;
        this.phone = phone;
        this.address = address;
        this.menu = menu;
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

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    @Override
    public String toString() {
        return "RestaurantDTO{" +
                "id='" + id + '\'' +
                ", businessname='" + businessname + '\'' +
                ", image='" + image + '\'' +
                ", location='" + location + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
