package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dao.ModuleDao;
import de.hft_stuttgart.winf.proj2.sp.backend.dao.UserDao;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbModule;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

/**
 * Class provides endpoints for the question collection part of the application
 */
@Path("questions")
public class QuestionsHandler {

    /**
     * Endpoint to get all modules a user has Access to
     *
     * @param user user for whom the search should be performed for. Passed as JSON in the request.
     * @return List of modules. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */
    @Path("modules")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ModuleDao> getModulesByUser(UserDao user) {
        try {
            DbModule dbAccess = new DbModule();
            return dbAccess.getCourses(user);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}
