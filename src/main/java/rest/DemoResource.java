package rest;

import Fetcher.UrlFetcher;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.annotation.security.RolesAllowed;
import javax.persistence.Column;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import com.google.gson.reflect.TypeToken;
import com.nimbusds.jose.shaded.json.JSONArray;
import dtos.OurMenuDTO;
import dtos.OurRestaurantDTO;
import dtos.ReceiptDTO;
import entities.Receipt;
import entities.User;
import facades.UserFacade;
import utils.EMF_Creator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * @author lam@cphbusiness.dk
 */
@Path("info")
public class DemoResource {

    private static final EntityManagerFactory emf = EMF_Creator.createEntityManagerFactory();
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static final UserFacade userFacade = UserFacade.getUserFacade(emf);
    private static String securityToken;

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser() {
        String thisuser = securityContext.getUserPrincipal().getName();
        return "{\"msg\": \"Hello to User: " + thisuser + "\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin() {
        String thisuser = securityContext.getUserPrincipal().getName();
        return "{\"msg\": \"Hello to (admin) User: " + thisuser + "\"}";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getRestaurantUrls() throws IOException, InterruptedException, ExecutionException {
        ArrayList<OurRestaurantDTO> dataFeched = (ArrayList<OurRestaurantDTO>) UrlFetcher.runParrallelRestaurants();
        String combinedJSON = gson.toJson(dataFeched);
        return combinedJSON;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("menu")
    public String getMenuUrls() throws IOException, InterruptedException, ExecutionException {
        ArrayList<OurMenuDTO> dataFeched = (ArrayList<OurMenuDTO>) UrlFetcher.runParrallelMenus();
        String combinedJSON = gson.toJson(dataFeched);
        return combinedJSON;
    }

    @POST
    @Path("newUser")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String createUser(String user) {
        User u1 = gson.fromJson(user, User.class);
        userFacade.createUser(u1.getUserName(), u1.getUserPass());
        return "{\"msg\": \"Welcome: " + u1.getUserName() + "\"}";
    }

    @GET
    @Path("order")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String getOrderFromUser(@Context HttpHeaders headers) {
        String token = headers.getRequestHeader("x-access-token").get(0);
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        String[] payloadArr = payload.split(":");
        String username = payloadArr[6].replaceAll("[\"}]", "");
        List<ReceiptDTO> receipts = userFacade.getAllReceiptsFromUser(username);
        String receiptJSON = gson.toJson(receipts);

        return receiptJSON;

    }
}