package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.*;
import de.hft_stuttgart.winf.proj2.sp.backend.exceptions.InvalidUserException;
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
     *
     * @param user the user for whom the exams should be searched
     * @return List of all Exams
     * @throws SQLException Exception if connection to db fails or an error accrues
     */

    public List<ExamDto> getExams(UserDto user) throws SQLException {
        ResultSetMapper<ExamDto> resultSetMapper = new ResultSetMapper<>();

        PreparedStatement selectModules = conn.prepareStatement("SELECT e.exam_id, e.name, e.creation_date, e.exam_date, e.status, e.module_id, e.total_points FROM exams e inner join modules m on m.module_id = e.module_id " +
                "inner join is_reading r on m.module_id = r.module_id inner join users u on r.user_id = u.user_id WHERE u.user_id = ?");
        selectModules.setInt(1, user.getUser_id());
        ResultSet rs = selectModules.executeQuery();

        try {
            List<ExamDto> exams = resultSetMapper.mapResultSetToObject(rs, ExamDto.class);
            QuestionsHandler questionsHandler = new QuestionsHandler();
            List<ModuleDto> modules = questionsHandler.getModulesByUser(user);
            for (ExamDto exam : exams) {
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
     *
     * @param exam exam that should be crated
     * @return boolean if the creation was successful
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public boolean createExams(CreateExamDto exam) throws SQLException {
        PreparedStatement insertExams = conn.prepareStatement("INSERT INTO exams (name,creation_date,status,module_id,exam_date,total_points) VALUES (?, ?, ?, ?, ?, ?); ");
        insertExams.setString(1, exam.getTitle());
        insertExams.setDate(2, new Date(exam.getCreation_date().getTime()));
        insertExams.setString(3, exam.getStatus());
        insertExams.setInt(4, exam.getModule().getModule_id());
        insertExams.setDate(5, new Date(exam.getExam_date().getTime()));
        insertExams.setInt(6, exam.getTotalPoints());
        return insertExams.executeUpdate() > 0 ? true : false;
    }

    /**
     * Saves a Examen together with the questions that it contains
     *
     * @param examAndQuestions exam and questions which should be saved
     * @return true if save is successful
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public boolean saveExams(SaveExamAndQuestionsDTO examAndQuestions) throws SQLException {
        PreparedStatement updateExams = conn.prepareStatement("UPDATE exams SET name = ?, exam_date = ?, total_points = ?, module_id = ? WHERE exam_id = ?;");
        updateExams.setString(1, examAndQuestions.getExam().getTitle());
        updateExams.setDate(2, new Date(examAndQuestions.getExam().getExam_date().getTime()));
        updateExams.setInt(3, examAndQuestions.getExam().getTotalPoints());
        updateExams.setInt(4, examAndQuestions.getExam().getModuleId());
        updateExams.setInt(5, examAndQuestions.getExam().getExam_id());
        if (updateExams.executeUpdate() <= 0) {
            return false;
        }

        for (QuestionsDto question : examAndQuestions.getQuestions()) {
            PreparedStatement updateQuestion = conn.prepareStatement("REPLACE INTO contains (exam_id, question_id, points) VALUES (?,?,?)");
            updateQuestion.setInt(1, examAndQuestions.getExam().getExam_id());
            updateQuestion.setInt(2, question.getQuestionId());
            updateQuestion.setFloat(3, question.getQuestionPoints());
            if (updateQuestion.executeUpdate() <= 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Deletes an exam if the user in the deletionRequests matches the question owner
     *
     * @param deletionRequest contains exam which should be deleted and the user which requested the deletion
     * @return true if deletion was successful
     * @throws InvalidUserException thrown if user is not matching the question owner
     */
    public boolean deleteExam(DeleteExamDTO deletionRequest) throws InvalidUserException, SQLException {
        PreparedStatement updateQuestion = conn.prepareStatement("SELECT exam_id FROM exams e INNER JOIN modules m on e.module_id = m.module_id INNER JOIN is_reading ir on m.module_id = ir.module_id INNER JOIN users u on ir.user_id = u.user_id WHERE exam_id = ? AND u.user_id = ?");
        updateQuestion.setInt(1, deletionRequest.getExam().getExam_id());
        updateQuestion.setInt(2, deletionRequest.getUser().getUser_id());
        //if user owns the exam, there should be one result in the resultset. If not abort
        if (!updateQuestion.executeQuery().next()) {
            throw new InvalidUserException("User does not match the owner of the exam");
        }

        PreparedStatement deleteQuestion = conn.prepareStatement("DELETE FROM exams WHERE exam_id = ?");
        deleteQuestion.setInt(1, deletionRequest.getExam().getExam_id());
        return deleteQuestion.executeUpdate() > 0;
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


