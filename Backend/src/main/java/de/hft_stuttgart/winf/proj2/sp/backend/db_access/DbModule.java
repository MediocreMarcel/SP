package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.CreateModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ModuleDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DbModule extends DbConnector {

    private static Logger logger = LogManager.getLogger(DbModule.class);

    public DbModule() throws IllegalArgumentException, SQLException {
        super();
    }

    /**
     * Gets all Courses that a User has access to
     *
     * @param user the user for whom the courses should be searched
     * @return List of all Courses
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public List<ModuleDto> getCourses(UserDto user) throws SQLException {
        ResultSetMapper resultSetMapper = new ResultSetMapper();

        PreparedStatement selectModules = conn.prepareStatement("SELECT c.course_name, c.course_id, m.definition, m.module_id FROM modules m inner join is_reading r on m.module_id = r.module_id inner join " +
                "users u on r.user_id = u.user_id INNER JOIN courses c on m.course_id = c.course_id WHERE u.user_id = ?");
        selectModules.setInt(1,user.getUser_id());
        ResultSet rs = selectModules.executeQuery();

        try {
            return resultSetMapper.mapResultSetToObject(rs, ModuleDto.class);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            this.logger.error(e);
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Creates a new Module in the DB for a user. The entry in isReading will automatically set.
     *
     * @param module module that should be crated
     * @return boolean if the creation was successful
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public boolean createCourses(CreateModuleDto module) throws SQLException {
        PreparedStatement insertModules = conn.prepareStatement("INSERT INTO modules (course_id, definition) VALUES (?, ?); INSERT INTO is_reading VALUES (last_insert_id(), ?);");
        insertModules.setInt(1, module.getCourse().getCourseId());
        insertModules.setString(2, module.getDefinition());
        insertModules.setInt(3, module.getUserId());
        return insertModules.executeUpdate() > 0 ? true : false;
    }
}
