package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.CreateModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbModule;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    public List<ModuleDto> getModulesByUser(UserDto user) {
        try {
            DbModule dbAccess = new DbModule();
            return dbAccess.getCourses(user);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Endpoint to create a Module for a user
     *
     * @param module module that should be crated. JSON must match CrateModuleDto.
     * @return HTTP Status if insert was successful (200 OK) or did fail (409 Conflict)
     */
    @Path("new_module")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNewModule(CreateModuleDto module) {
        try {
            DbModule dbAccess = new DbModule();
            if (!dbAccess.createCourses(module)){
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Response.ok().build();
    }

}
