package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DBUser;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;


/**
 * Class provides endpoints for the Usermanagement of the application
 */
@Path("user")
public class UserHandler {
    /**
     * Endpoint to check login authentication of a User
     *
     * @param user user whos trying to log in. Passed as JSON in the request.
     * @return User as an Object. If there is a Match with the Database. Returned in the endpoint as JSON and the HTTP Status 200.
     * If none then it returns null and the HTTP Status 401.
     */
    @Path("login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response loginUser(UserDto user) {
        try {
            DBUser userAccess = new DBUser();
            user = userAccess.loginUser(user);
            if (user == null) {
                return Response
                        .status(Response.Status.UNAUTHORIZED)
                        .build();
            } else {
                return Response
                        .status(Response.Status.OK)
                        .entity(user)
                        .build();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
}