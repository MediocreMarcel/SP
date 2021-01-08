package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.CourseDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DbCourse extends DbConnector {

    private static Logger logger = LogManager.getLogger(DbCourse.class);

    /**
     * This constructor needs to be called
     *
     * @throws IllegalArgumentException will be thrown if ip, user or password were not set by the setConnectionParameter method
     * @throws SQLException             will be thrown if connection to db could not be established
     */
    public DbCourse() throws IllegalArgumentException, SQLException {
    }

    /**
     * Gets all Courses from the DB
     * @return List of all courses
     * @throws SQLException thrown if something goes wrong with the db
     */
    public List<CourseDTO> getAllCourses() throws SQLException {
        PreparedStatement selectAll = conn.prepareStatement("SELECT * FROM courses");
        ResultSet rsCourses = selectAll.executeQuery();

        try {
            ResultSetMapper mapper = new ResultSetMapper();
            return mapper.mapResultSetToObject(rsCourses, CourseDTO.class);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            e.printStackTrace();
            logger.error(e);
            return null;
        }
    }
}
