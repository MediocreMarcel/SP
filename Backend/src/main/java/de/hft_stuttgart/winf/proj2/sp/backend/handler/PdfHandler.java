package de.hft_stuttgart.winf.proj2.sp.backend.handler;


import de.hft_stuttgart.winf.proj2.sp.backend.dto.SaveExamAndQuestionsDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator.Pdf_generator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;

@Path("generatePdf")
public class PdfHandler {
    private static final Logger logger = LogManager.getLogger(QuestionsHandler.class);


    /**
     * Ues the Pdf_generator.printExam() - Method to print an exam with a cover sheet and a page for every question
     *
     * @param exam SaveExamAndQuestionsDTO: Needs object to search
     * @return No return apart from Response
     */

    @Path("generatePdfByExamId")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuestionsFromExam(SaveExamAndQuestionsDTO exam) {
        try {
            System.out.println(exam);
            if (exam != null) {
                Pdf_generator.writeExam(exam.getExam(), exam.getQuestions());
                return Response.ok().entity(exam.getQuestions()).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }

}
