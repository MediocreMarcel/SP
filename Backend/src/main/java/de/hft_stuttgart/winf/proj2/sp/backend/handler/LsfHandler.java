package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.sun.xml.internal.messaging.saaj.util.ByteOutputStream;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbCorrection;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbExam;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbStudents;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.CorrectionDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentWithGradeDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.lsf.LsfExcelUtil;
import javassist.bytecode.ByteArray;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Path("lsf")
public class LsfHandler {

    private static Logger logger = LogManager.getLogger(LsfHandler.class);

    @Path("student_import")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public List<StudentDTO> importStudent(@FormDataParam("excel") InputStream uploadedInputStream,
                                          @FormDataParam("excel") FormDataContentDisposition fileDetail,
                                          @FormDataParam("exam") String exam) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            byte[] buffer = new byte[1024];
            int len;
            while ((len = uploadedInputStream.read(buffer)) > -1) {
                baos.write(buffer, 0, len);
            }
            baos.flush();

            LsfExcelUtil lsfExcelUtil = new LsfExcelUtil();
            DbExam dbAccess = new DbExam();
            ObjectMapper objectMapper = new ObjectMapper();
            ExamDto examDto = objectMapper.readValue(exam, ExamDto.class);
            System.out.println(exam);
            dbAccess.uploadLsfExcel(new ByteArrayInputStream(baos.toByteArray()), examDto);
            return lsfExcelUtil.getStudent(new ByteArrayInputStream(baos.toByteArray()));

        } catch (SQLException | IOException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return null;
    }

    @Path("student_export")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/vnd.ms-excel")
    public Response exportStudent(ExamDto exam) {
        try {
            DbCorrection correction = new DbCorrection();
            DbExam dbAccess = new DbExam();

            Map<Integer, List<CorrectionDTO>> corr = correction.getCorrectionAsMap(exam);

            LsfExcelUtil lsfExcelUtil = new LsfExcelUtil();
            ByteOutputStream out = lsfExcelUtil.writeIntoExcel(exam, dbAccess.getExcelByExamId(exam),getGradesByStudent(corr, exam));
            return Response.ok(out.toByteArray(),MediaType.APPLICATION_OCTET_STREAM).header("content-disposition", "attachment; filename = lsfExport.xls").build();
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return Response.status(500).build();
    }

    private List<StudentWithGradeDTO> getGradesByStudent(Map<Integer, List<CorrectionDTO>> corr, ExamDto exam) {
        List<StudentWithGradeDTO> studentsWithGrade = new ArrayList<>();
        for (Map.Entry<Integer, List<CorrectionDTO>> entry : corr.entrySet()) {
            int sumPoints = 0;
            for (CorrectionDTO innerCorrection: entry.getValue()) {
                sumPoints+=innerCorrection.getReachedPoints();
            }
            studentsWithGrade.add(new StudentWithGradeDTO(entry.getKey(), -1*((sumPoints*5/ exam.getTotalPoints())-6)));
        }
        System.out.println(studentsWithGrade);
        return studentsWithGrade;
    }
}