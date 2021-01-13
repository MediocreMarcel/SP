package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbExam;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

public class CorrectionHandler {
    private static Logger logger = LogManager.getLogger(ExamHandler.class);



    /**
     * Endpoint to get all exams that are in the state in_correction for every user
     *
     * @param user user for whom the search should be performed for. Passed as JSON in the request.
     * @return List of exams that are in state in_correction. Returned in the endpoint as JSON with an array. If something goes wrong null will be returned
     */
    @Path("getExamsforCorrection")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<ExamDto> getExamsforCorrection(UserDto user) {
        try {
            DbExam dbAccess = new DbExam();
            return dbAccess.getExamsforCorrectedOverview(user);
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return null;
    }


}
