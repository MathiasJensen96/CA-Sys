package rest;

import Fetcher.UrlFetcher;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import dtos.OurDTO;
import utils.EMF_Creator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

/**
 * @author lam@cphbusiness.dk
 */
@Path("info")
public class DemoResource {

    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory();
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static String securityToken;

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    //Just to verify if the database is setup
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Path("all")
//    public String allUsers() {
//        //return userFacade.getAllUsers();
//    }

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
    public String getUrls() throws IOException, InterruptedException, ExecutionException {
        ArrayList<OurDTO> dataFeched = (ArrayList<OurDTO>) UrlFetcher.runParrallel();
        String combinedJSON = gson.toJson(dataFeched);
        return combinedJSON;
    }
}