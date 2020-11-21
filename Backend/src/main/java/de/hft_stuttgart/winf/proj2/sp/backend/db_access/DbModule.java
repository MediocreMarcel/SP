package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dao.ModuleDao;
import de.hft_stuttgart.winf.proj2.sp.backend.dao.UserDao;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DbModule extends DbConnector{

    public DbModule() throws IllegalArgumentException, SQLException {
        super();
    }

    /**
     * Gets all Courses that a User has access to
     * @param user the user for whom the courses should be searched
     * @return List of all Courses
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public List<ModuleDao> getCourses(UserDao user) throws SQLException {
        ResultSetMapper<ModuleDao> resultSetMapper = new ResultSetMapper<>();

        PreparedStatement selectModules = conn.prepareStatement("SELECT m.course, m.definition, m.module_id FROM modules m inner join `reads` r on m.module_id = r.module_id inner join " +
                "users u on r.user_id = u.user_id WHERE u.user_id = ?");
        selectModules.setString(1,user.getUsername());
        ResultSet rs = selectModules.executeQuery();

        try {
            return resultSetMapper.mapResultSetToObject(rs, ModuleDao.class);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            e.printStackTrace();
            return null;
        }
    }

}
