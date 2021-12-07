package facades;

import dtos.ReceiptDTO;
import dtos.UserDTO;
import entities.Receipt;
import entities.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import java.util.List;

public class ReceiptFacade {

    private static EntityManagerFactory emf;
    private static ReceiptFacade instance;
    private static UserFacade userFacade = UserFacade.getUserFacade(emf);

    public static ReceiptFacade getReceiptFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new ReceiptFacade();
        }
        return instance;
    }

    public Receipt createReceipt(ReceiptDTO receiptDTO, UserDTO userDTO) {
        EntityManager em = emf.createEntityManager();
        Receipt receipt = new Receipt(receiptDTO);
        User user = userFacade.getUser(userDTO.getUserName());
        System.out.println(user);

        //TODO: fetch user from DB
        try {
            em.getTransaction().begin();
            //user.add(receipt)
            em.persist(receipt);
            em.getTransaction().commit();
            return receipt;
        } finally {
            em.close();
        }
    }

    public String getAllReceipts() {

        EntityManager em = emf.createEntityManager();
        try {
            TypedQuery<Receipt> query = em.createQuery("select r from Receipt r", Receipt.class);
            List<Receipt> receipts = query.getResultList();
            return "[" + receipts.size() + "]";

        } finally {
            em.close();
        }
    }
}
