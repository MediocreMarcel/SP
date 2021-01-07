package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbExam;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbModule;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.*;
import de.hft_stuttgart.winf.proj2.sp.backend.exceptions.InvalidUserException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

@Path("exams")
public class ExamHandler {
    private static Logger logger = LogManager.getLogger(ExamHandler.class);

    /**
     * Endpoint to get all modules a user has Access to
     *
     * @param user user for whom the search should be performed for. Passed as JSON in the request.
     * @return List of exams. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */
    @Path("getExams")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ExamDto> getExamsByUser(UserDto user) {
        try {
            DbExam dbAccess = new DbExam();
            return dbAccess.getExams(user);
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return null;
    }

    /**
     * Endpoint to create a Module for a user
     *
     * @param exam exam that should be crated. JSON must match CrateExamDto.
     * @return HTTP Status if insert was successful (200 OK) or did fail (409 Conflict)
     */
    @Path("new_exam")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNewExam(CreateExamDto exam) {

        try {
            DbExam dbAccess = new DbExam();
            if (!dbAccess.createExams(exam)){
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return Response.ok().build();
    }

    /**
     * Endpoint to save a Exam and the questions it contains
     *
     * @param examAndQuestions exam and questions that should be saved
     * @return HTTP Status if insert/update was successful (200 OK) or did fail (409 Conflict)
     */
    @Path("save_exam")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveExam(SaveExamAndQuestionsDTO examAndQuestions){
        try {
            DbExam dbAccess = new DbExam();
            if (!dbAccess.saveExams(examAndQuestions)){
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.ok().build();
    }

    /**
     * Deletes a question
     * @param deleteRequest a delete request object
     * @return HTTP Status if deletion was successful (200 OK) or did fail (409 Conflict)
     */
    @Path("delete")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response delete(DeleteExamDTO deleteRequest){
        try {
            DbExam dbAccess = new DbExam();
            dbAccess.deleteExam(deleteRequest);
        } catch (SQLException | InvalidUserException e) {
            e.printStackTrace();
            this.logger.error(e);
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.ok().build();
    }
}
