package dtos;

import entities.Receipt;

public class ReceiptDTO {

    private String menuname;
    private String amount;
    private String price;
    private String totalPrice;

    public ReceiptDTO() {
    }

    public ReceiptDTO(Receipt receipt) {
        this.menuname = receipt.getMenuname();
        this.amount = receipt.getAmount();
        this.price = receipt.getPrice();
        this.totalPrice = receipt.getTotalPrice();
    }

    public String getMenuname() {
        return menuname;
    }

    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }
}
