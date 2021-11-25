package dtos;

import java.util.ArrayList;

public class OurMenuDTO {

    private ArrayList<String> images;
    private String menuname;
    private String description;

    public OurMenuDTO() {
    }

    public OurMenuDTO(MenuDTO menuDTO) {
        this.images = menuDTO.getImages();
        this.menuname = menuDTO.getMenuname();
        this.description = menuDTO.getDescription();
    }

    public ArrayList<String> getImages() {
        return images;
    }

    public void setImages(ArrayList<String> images) {
        this.images = images;
    }

    public String getMenuname() {
        return menuname;
    }

    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
