package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.Pojo.QuestionsPojo;
import de.hft_stuttgart.winf.proj2.sp.backend.dao.ModuleDao;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

 public class DbQuestions extends DbConnector {

    public DbQuestions() throws IllegalArgumentException, SQLException {
        super();
    }


     public List<QuestionsPojo> getQuestions(ModuleDao module) throws SQLException {
         ResultSetMapper<QuestionsPojo> resultSetMapper = new ResultSetMapper<>();
         PreparedStatement selectQuestions = conn.prepareStatement("SELECT qs.name , qs.default_points FROM questions qs INNER JOIN modules m  ON qs.module_id = m.module_id WHERE m.module_id = ?");
         selectQuestions.setInt(1, module.getModule_id());
         ResultSet rs = selectQuestions.executeQuery();

         try {
             return resultSetMapper.mapResultSetToObject(rs, QuestionsPojo.class);
         } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
             e.printStackTrace();
             return null;
         }
     }

     public boolean createNewQuestion(QuestionsPojo question) throws SQLException {
         PreparedStatement insertQuestion = conn.prepareStatement("INSERT INTO questions (name, default_points,module_id) VALUES (?, ?,?); ");
         insertQuestion.setString(1, question.getQuestionName());
         insertQuestion.setFloat(2, question.getQuestionPoints());
         insertQuestion.setInt(3,question.getModule_ID());

         return insertQuestion.executeUpdate()>0?true:false;

     }

}


