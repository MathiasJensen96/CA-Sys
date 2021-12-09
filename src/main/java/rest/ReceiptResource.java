package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dtos.ReceiptDTO;
import dtos.UserDTO;
import entities.Receipt;
import facades.ReceiptFacade;
import utils.EMF_Creator;

import javax.json.Json;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import java.io.IOException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;

@Path("receipt")
public class ReceiptResource {

    private static final EntityManagerFactory emf = EMF_Creator.createEntityManagerFactory();
    private final ReceiptFacade facade = ReceiptFacade.getReceiptFacade(emf);
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static String securityToken;

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response createReceipt(String receipt, @Context HttpHeaders headers) throws IOException, InterruptedException, ExecutionException {
        ReceiptDTO receiptDTO = gson.fromJson(receipt, ReceiptDTO.class);
        String token = headers.getRequestHeader("x-access-token").get(0);
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getDecoder();
        String payload = new String(decoder.decode(chunks[1]));
        String[] payloadArr = payload.split(":");
        String username = payloadArr[6].replaceAll("[\"}]", "");
        ReceiptDTO newReceipt = facade.createReceipt(receiptDTO, username);
        return Response.ok(gson.toJson(newReceipt), MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("all")
    public String allReceipts() {
        return facade.getAllReceipts();
    }
}
