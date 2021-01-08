package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbCourse;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.CourseDTO;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("courses")
public class CourseService {

    private static Logger logger = LogManager.getLogger(ExamHandler.class);

    /**
     * Endpoint to get all available courses
     *
     * @return List of courses. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */
    @Path("get")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CourseDTO> getCourses() {
        try {
            DbCourse dbAccess = new DbCourse();
            return dbAccess.getAllCourses();
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }

}
