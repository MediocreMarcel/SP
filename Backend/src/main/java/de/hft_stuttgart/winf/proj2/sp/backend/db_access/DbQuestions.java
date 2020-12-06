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

    private static Logger logger = LogManager.getLogger(DbModule.class);

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
        ResultSetMapper<QuestionsDto> resultSetMapper = new ResultSetMapper<>();
        PreparedStatement selectQuestions = conn.prepareStatement("SELECT qs.name , qs.default_points FROM questions qs INNER JOIN modules m  ON qs.module_id = m.module_id WHERE m.module_id = ?");
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
     * @param question question that should be created
     * @return boolean showing if the insertion was completed
     * @throws SQLException  thrown if server is unavailable or some problem with the server accrues
     */
    public boolean createNewQuestion(QuestionsDto question) throws SQLException {
        PreparedStatement insertQuestion = conn.prepareStatement("INSERT INTO questions (name, default_points,module_id) VALUES (?, ?,?); ");
        insertQuestion.setString(1, question.getQuestionName());
        insertQuestion.setFloat(2, question.getQuestionPoints());
        insertQuestion.setInt(3, question.getModule_ID());

        return insertQuestion.executeUpdate() > 0 ? true : false;

    }

}


