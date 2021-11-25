package dtos;

import java.util.ArrayList;

public class MenuDTO {

    private ArrayList<String> images;
    private String menuname;
    private String description;

    public MenuDTO() {
    }

    public MenuDTO(ArrayList<String> images, String menuname, String description) {
        this.images = images;
        this.menuname = menuname;
        this.description = description;
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

    @Override
    public String toString() {
        return "MenuDTO{" +
                "images=" + images +
                ", menuname='" + menuname + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
