package facades;

import dtos.ReceiptDTO;
import entities.Receipt;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import java.util.List;

public class ReceiptFacade {

    private static EntityManagerFactory emf;
    private static ReceiptFacade instance;

    public static ReceiptFacade getReceiptFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new ReceiptFacade();
        }
        return instance;
    }

    public Receipt createReceipt(ReceiptDTO receiptDTO) {
        EntityManager em = emf.createEntityManager();
        Receipt receipt = new Receipt(receiptDTO);
        try {
            em.getTransaction().begin();
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
