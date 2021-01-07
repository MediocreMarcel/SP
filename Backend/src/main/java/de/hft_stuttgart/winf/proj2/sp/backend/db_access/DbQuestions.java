package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.QuestionsDto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DbQuestions extends DbConnector {

    private static final Logger logger = LogManager.getLogger(DbModule.class);

    public DbQuestions() throws IllegalArgumentException, SQLException {
        super();
    }


    /**
     * Gets all questions from a module
     *
     * @param module module of which the questions should be searched
     * @return list of all questions
     * @throws SQLException thrown if server is unavailable or some problem with the server accrues
     */
    public List<QuestionsDto> getQuestions(ModuleDto module) throws SQLException {

        if(module == null || module.getModule_id() == null){
            return null;
        }

        ResultSetMapper<QuestionsDto> resultSetMapper = new ResultSetMapper<>();
        PreparedStatement selectQuestions = conn.prepareStatement("SELECT * FROM questions qs INNER JOIN modules m  ON qs.module_id = m.module_id WHERE m.module_id = ?");
        selectQuestions.setInt(1, module.getModule_id());
        ResultSet rs = selectQuestions.executeQuery();

        try {
            return resultSetMapper.mapResultSetToObject(rs, QuestionsDto.class);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            e.printStackTrace();
            logger.error(e);
            return null;
        }
    }

    /**
     * Creates a new Question
     *
     * @param question question that should be created
     * @return boolean showing if the insertion was completed
     * @throws SQLException thrown if server is unavailable or some problem with the server accrues
     */
    public boolean createNewQuestion(QuestionsDto question) throws SQLException {
        PreparedStatement insertQuestion = conn.prepareStatement("INSERT INTO questions (name, default_points,module_id) VALUES (?, ?,?); ");
        insertQuestion.setString(1, question.getQuestionName());
        insertQuestion.setFloat(2, question.getQuestionPoints());
        insertQuestion.setInt(3, question.getModule_ID());

        return insertQuestion.executeUpdate() > 0;

    }

    /**
     * Deletes a List of questions from the Database. Will only delete all questions or no question
     * @param questions List of questions that should be deleted
     * @return boolean weather the deletion was successful
     * @throws SQLException hrown if server is unavailable or some problem with the server accrues
     */
    public boolean deleteQuestions(List<QuestionsDto> questions) throws SQLException {
        conn.setAutoCommit(false);

        for (QuestionsDto question : questions) {

            PreparedStatement insertQuestion = conn.prepareStatement("DELETE FROM questions WHERE question_id = ? ");
            insertQuestion.setInt(1, question.getQuestionId());

            if (insertQuestion.executeUpdate() <= 0) {
                logger.warn("Could not delete element : " + question);
                System.err.println("Could not delete element : " + question);
                conn.rollback();
                conn.setAutoCommit(true);
                return false;
            }

        }
        conn.commit();
        conn.setAutoCommit(true);
        return true;

    }

    /**
     * Gets all questions from a exam
     *
     * @param exam exam of which the questions should be searched
     * @return list of all questions in the exam
     * @throws SQLException thrown if server is unavailable or some problem with the server accrues
     */
    public List<QuestionsDto> getQuestionsFromExam(ExamDto exam) throws SQLException {
        List<QuestionsDto> questions = new ArrayList<>();

        PreparedStatement selectQuestionIds = conn.prepareStatement("SELECT question_id FROM contains WHERE exam_id = ?");
        selectQuestionIds.setInt(1, exam.getExam_id());
        ResultSet questionIds = selectQuestionIds.executeQuery();
        while(questionIds.next()) {
            int id = questionIds.getInt("question_id");
            questions.add(getQuestionFromId(id));
        }
        return questions;
    }

    private QuestionsDto getQuestionFromId(int id) throws SQLException{
        ResultSetMapper<QuestionsDto> resultSetMapper = new ResultSetMapper<>();
        PreparedStatement selectQuestions = conn.prepareStatement("SELECT * FROM questions WHERE question_id = ?");
        selectQuestions.setInt(1, id);
        ResultSet rs = selectQuestions.executeQuery();

        try {
            return resultSetMapper.mapResultSetToObject(rs, QuestionsDto.class).get(0);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            e.printStackTrace();
            logger.error(e);
            return null;
        }
    }

}


