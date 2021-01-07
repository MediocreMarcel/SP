package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.*;
import de.hft_stuttgart.winf.proj2.sp.backend.handler.QuestionsHandler;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DbExam extends DbConnector {

    private static Logger logger = LogManager.getLogger(DbExam.class);

    public DbExam() throws IllegalArgumentException, SQLException {
        super();
    }

    /**
     * Gets all Exams that a User has access created
     * @param user the user for whom the exams should be searched
     * @return List of all Exams
     * @throws SQLException Exception if connection to db fails or an error accrues
     */

    public List<ExamDto> getExams(UserDto user) throws SQLException {
        ResultSetMapper<ExamDto> resultSetMapper = new ResultSetMapper<>();

        PreparedStatement selectModules = conn.prepareStatement("SELECT e.exam_id, e.name, e.creation_date, e.exam_date, e.status, e.module_id FROM exams e inner join modules m on m.module_id = e.module_id " +
                "inner join is_reading r on m.module_id = r.module_id inner join users u on r.user_id = u.user_id WHERE u.user_id = ?");
        selectModules.setInt(1,user.getUser_id());
        ResultSet rs = selectModules.executeQuery();

        try {
            List<ExamDto> exams =  resultSetMapper.mapResultSetToObject(rs, ExamDto.class);
            QuestionsHandler questionsHandler = new QuestionsHandler();
            List<ModuleDto> modules = questionsHandler.getModulesByUser(user);
            for (ExamDto exam: exams) {
                exam.setModule(modules.stream().filter(x -> x.getModule_id() == exam.getModuleId()).findFirst().get());
            }
            return exams;
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            this.logger.error(e);
            e.printStackTrace();
            return null;
        }
    }
    /**
     * Creates a new Exam in the DB for a user.
     * @param exam exam that should be crated
     * @return boolean if the creation was successful
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public boolean createExams(CreateExamDto exam) throws SQLException {
        PreparedStatement insertExams = conn.prepareStatement("INSERT INTO exams (name,creation_date,status,module_id, exam_date) VALUES (?, ?, ?, ?,?); ");
        insertExams.setString(1, exam.getTitle());
        insertExams.setDate(2, new Date(exam.getCreation_date().getTime()));
        insertExams.setString(3, exam.getStatus());
        insertExams.setInt(4, exam.getModule().getModule_id());
        insertExams.setDate(5, new Date(exam.getExam_date().getTime()));
        return insertExams.executeUpdate()>0?true:false;
    }


    public List<ExamDto> getExamsforArchiv(UserDto user) throws SQLException {
        ResultSetMapper<ExamDto> resultSetMapper = new ResultSetMapper<>();

        PreparedStatement selectArchivedExams = conn.prepareStatement("SELECT * FROM exams e inner join modules m on m.module_id = e.module_id " +
                "inner join is_reading r on m.module_id = r.module_id inner join users u on r.user_id = u.user_id WHERE u.user_id = ? and e.status = 'corrected' ");
        selectArchivedExams.setInt(1,user.getUser_id());
        ResultSet rs = selectArchivedExams.executeQuery();

        try {
            List<ExamDto> exams =  resultSetMapper.mapResultSetToObject(rs, ExamDto.class);
            QuestionsHandler questionsHandler = new QuestionsHandler();
            List<ModuleDto> modules = questionsHandler.getModulesByUser(user);
            for (ExamDto exam: exams) {
                exam.setModule(modules.stream().filter(x -> x.getModule_id() == exam.getModuleId()).findFirst().get());
            }
            return exams;
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            this.logger.error(e);
            e.printStackTrace();
            return null;
        }
    }

}


