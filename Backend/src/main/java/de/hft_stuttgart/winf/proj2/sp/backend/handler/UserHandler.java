package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DBUser;

import io.jsonwebtoken.security.Keys;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


import javax.crypto.SecretKey;
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

    private static Logger logger = LogManager.getLogger(UserHandler.class);

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
            user = authenticate(user);
            String token = issueToken(user.getName());
            user.setToken(token);
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private UserDto authenticate(UserDto user) {
        try {
            DBUser userAccess = new DBUser();
            user = userAccess.loginUser(user);
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return user;
    }

    private String issueToken(String username) {

        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String jwt = Jwts.builder()
                .setSubject(username)
                .signWith(key)
                .compact();
        return jwt;
    }
}
