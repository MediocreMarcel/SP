package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.ModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.QuestionsDto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
        PreparedStatement insertQuestion = conn.prepareStatement("INSERT INTO questions (name, question_text, default_points, short_name, module_id, category) VALUES (?,?,?,?,?,?); ");
        insertQuestion.setString(1, question.getQuestionName());
        insertQuestion.setString(2, question.getQuestionText());
        insertQuestion.setFloat(3, question.getQuestionPoints());
        insertQuestion.setString(4, question.getShortName());
        insertQuestion.setInt(5, question.getModule_ID());
        insertQuestion.setString(6, question.getCategory());


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
            insertQuestion.setInt(1, question.getQuestion_id());

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

}


