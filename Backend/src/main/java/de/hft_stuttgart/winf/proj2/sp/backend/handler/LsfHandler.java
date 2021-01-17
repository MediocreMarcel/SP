package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.lsf.LsfExcelUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;
import java.util.List;

@Path("lsf")
public class LsfHandler {

    private static Logger logger = LogManager.getLogger(LsfHandler.class);

    @Path("student_import")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public List<StudentDTO> importStudent(@FormDataParam("excel") InputStream uploadedInputStream,
                                          @FormDataParam("excel") FormDataContentDisposition fileDetail) {
        LsfExcelUtil lsfExcelUtil = new LsfExcelUtil();
        return lsfExcelUtil.getStudent(uploadedInputStream);
    }


}
