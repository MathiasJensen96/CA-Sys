package facades;

import entities.Receipt;
import entities.Role;
import entities.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

import security.errorhandling.AuthenticationException;

import java.util.List;

/**
 * @author lam@cphbusiness.dk
 */
public class UserFacade {

    private static EntityManagerFactory emf;
    private static UserFacade instance;

    private UserFacade() {
    }

    /**
     * @param _emf
     * @return the instance of this facade.
     */
    public static UserFacade getUserFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new UserFacade();
        }
        return instance;
    }

    public User getVeryfiedUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.find(User.class, username);
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }
    //TODO: fix response when user is empty or already created
    public User createUser(String userName, String password) {
        EntityManager em = emf.createEntityManager();
        User user = new User(userName, password);
        Role userRole = new Role("user");
        try {
            em.getTransaction().begin();
            user.addRole(userRole);
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } finally {
            em.close();
        }
    }

    public String getAllUsers() {

        EntityManager em = emf.createEntityManager();
        try {
            TypedQuery<User> query = em.createQuery("select u from User u", entities.User.class);
            List<User> users = query.getResultList();
            return "[" + users.size() + "]";
        } finally {
            em.close();
        }
    }

    public User getUser(String name, EntityManager em) {
        TypedQuery<User> query = em.createQuery("Select u From User u Where u.userName =:name", User.class);
        query.setParameter("name", name);
        User user = query.getSingleResult();
        System.out.println(user);
        return user;
    }

    public List<Receipt> getAllReceiptsFromUser(String name) {
        EntityManager em = emf.createEntityManager();
        try {
            TypedQuery<Receipt> query = em.createQuery("Select r From Receipt r join r.userList u Where u.userName =:name", Receipt.class);
            query.setParameter("name", name);
            List<Receipt> allReceipts = query.getResultList();
            System.out.println(allReceipts);
            return allReceipts;
        } finally {
            em.close();
        }
    }
}