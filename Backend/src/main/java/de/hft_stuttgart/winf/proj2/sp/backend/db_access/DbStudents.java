package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class DbStudents extends DbConnector {

    /**
     * This constructor calls super to gain DB Access
     *
     * @throws IllegalArgumentException will be thrown if ip, user or password were not set by the setConnectionParameter method
     * @throws SQLException             will be thrown if connection to db could not be established
     */
    public DbStudents() throws IllegalArgumentException, SQLException {
        super();
    }

    /**
     * gets all students that participated in an exam
     * @param exam exam that should be queried
     * @return List of all students that participated in that exam
     * @throws SQLException will be thrown if something sql related goes wrong
     * @throws InvocationTargetException will be thrown if the ResultSetMapper could not map the result set to the object list
     * @throws NoSuchMethodException will be thrown if the ResultSetMapper could not map the result set to the object list
     * @throws InstantiationException will be thrown if the ResultSetMapper could not map the result set to the object list
     * @throws IllegalAccessException will be thrown if the ResultSetMapper could not map the result set to the object list
     */
    public List<StudentDTO> getStudentsInExam(ExamDto exam) throws SQLException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
        ResultSetMapper rsMapper = new ResultSetMapper();
        PreparedStatement getStudents = conn.prepareStatement("SELECT s.matr_nr, s.course_shortname FROM students s INNER JOIN is_corrected ic on s.matr_nr = ic.matr_nr WHERE ic.exam_id = ? GROUP BY s.matr_nr, s.course_shortname");
        getStudents.setInt(1, exam.getExam_id());
        return rsMapper.mapResultSetToObject(getStudents.executeQuery(), StudentDTO.class);
    }
}
