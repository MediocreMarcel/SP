package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbModule;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.*;
import de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator.pdf_generator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.*;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbQuestions;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * Class provides endpoints for the question collection part of the application
 */
@Path("questions")
public class QuestionsHandler {

    private static final Logger logger = LogManager.getLogger(QuestionsHandler.class);

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
            logger.error(e);
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
            if (!dbAccess.createCourses(module)) {
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return Response.ok().build();
    }


    /**
     * Gets all questions from a Module
     *
     * @param module module of which the questions should be searched
     * @return List of questions
     */
    @Path("getQuestion")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<QuestionsDto> getQuestions(ModuleDto module) {
        try {
            DbQuestions dbAccess = new DbQuestions();
            return dbAccess.getQuestions(module);
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }

    /**
     * Creates Question in the database
     *
     * @param question question that should be stored
     * @return returns question if insert was successful
     */
    @Path("newQuestion")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public QuestionsDto createNewQuestion(QuestionsDto question) {
        try {
            DbQuestions dbAccess = new DbQuestions();
            if (dbAccess.createNewQuestion(question)) {
                return question;
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }


    /**
     * Deletes questions from the database. Deletes all questions. If something goes wrong there will be a rollback.
     *
     * @param questions A list of questions that should be deleted
     * @return HTTP 204 if successful, HTTP 500 if something went wrong
     */
    @Path("deleteQuestions")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteQuestions(List<QuestionsDto> questions) {
        try {
            DbQuestions dbAccess = new DbQuestions();
            if (dbAccess.deleteQuestions(questions)) {
                return Response.status(Response.Status.NO_CONTENT).build();
            } else {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }


    //KOmmentar bearbeiten

    /**
     * Endpoint to get all modules a user has Access to
     *
     * @param user user for whom the search should be performed for. Passed as JSON in the request.
     * @return List of modules. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */


    @Path("generatePDF")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuestionsFromExam(ExamDto exam) {
        try {
            DbQuestions dbAccess = new DbQuestions();
            List<QuestionsDto> questions = dbAccess.getQuestionsFromExam(exam);
            System.out.println(questions);
            if (!questions.isEmpty()) {
                pdf_generator.writeExam(exam, questions);
                return Response.ok().entity(questions).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        } catch (SQLException | IOException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }


}
