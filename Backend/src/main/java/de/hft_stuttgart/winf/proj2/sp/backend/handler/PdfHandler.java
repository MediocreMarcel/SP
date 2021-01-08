package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbQuestions;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.QuestionsDto;
import de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator.Pdf_generator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@Path("generatePdf")
public class PdfHandler {
    private static final Logger logger = LogManager.getLogger(QuestionsHandler.class);

    //KOmmentar bearbeiten

    /**
     * Endpoint to get all modules a user has Access to
     *
     * @param user user for whom the search should be performed for. Passed as JSON in the request.
     * @return List of modules. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */


    @Path("generatePdfByExamId")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuestionsFromExam(ExamDto exam) {
        try {
            DbQuestions dbAccess = new DbQuestions();
            List<QuestionsDto> questions = dbAccess.getQuestionsFromExam(exam);
            System.out.println(questions);
            if (!questions.isEmpty()) {
                Pdf_generator.writeExam(exam, questions);
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
