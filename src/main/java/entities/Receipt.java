package entities;

import dtos.ReceiptDTO;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQuery(name = "Receipt.deleteAllRows", query = "DELETE from Receipt")
@Table(name = "receipt")

public class Receipt implements Serializable {


    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Receipt() {
    }

    private String menuname;
    private String amount;
    private String price;
    private String totalPrice;

    public Receipt(ReceiptDTO receiptDTO) {
        this.menuname = receiptDTO.getMenuname();
        this.amount = receiptDTO.getAmount();
        this.price = receiptDTO.getPrice();
        this.totalPrice = receiptDTO.getTotalPrice();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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