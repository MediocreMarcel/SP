package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbStudents;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;

@Path("student")
public class StudentHandler {

    private static final Logger logger = LogManager.getLogger(StudentHandler.class);

    /**
     * Return all participants of a exam
     * @param exam exam that should be queried
     * @return a list of all participents or null if something goes wrong
     */
    @Path("getExamParticipants")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<StudentDTO> importStudent(ExamDto exam) {
        try {
            DbStudents dbAccess = new DbStudents();
            return dbAccess.getStudentsInExam(exam);
        } catch (SQLException | InvocationTargetException | NoSuchMethodException | InstantiationException | IllegalAccessException throwables) {
            throwables.printStackTrace();
            logger.error(throwables);
        }
        return null;
    }
}
