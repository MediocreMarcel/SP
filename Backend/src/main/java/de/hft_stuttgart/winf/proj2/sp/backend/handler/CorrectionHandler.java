package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbCorrection;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbExam;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.CorrectionDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
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

@Path("correction")
public class CorrectionHandler {

    private static Logger logger = LogManager.getLogger(CorrectionHandler.class);

    /**
     * Endpoint to save the correction of one Question. The CorrectionDTO will be passed as list. Every DTO Object represents
     * one evaluation criteria
     *
     * @param correction list of corrected evaluation criterias
     * @return HTTP Status if save was successful (200 OK) or did fail (409 Conflict)
     */
    @Path("save")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveCorrection(List<CorrectionDTO> correction) {
        try {
            DbCorrection dbAccess = new DbCorrection();
            if (dbAccess.saveCorrections(correction)){
                return Response.ok().build();
            }
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return Response.status(Response.Status.CONFLICT).build();
    }

    /**
     * Endpoint to load all corrections of a exam. Will return null if something goes wrong
     *
     * @param request exam of which the corrections should be loaded
     * @return List of correctionDtos grouped in a list
     */
    @Path("load")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<List<CorrectionDTO>> loadCorrections(ExamDto request) {
        try {
            DbCorrection dbAccess = new DbCorrection();
            return dbAccess.getCorrection(request);
        } catch (SQLException e) {
            e.printStackTrace();
            this.logger.error(e);
        }
        return null;
    }
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
