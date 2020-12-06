package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.UserDto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUser extends DbConnector {

    private static Logger logger = LogManager.getLogger(DBUser.class);

    /**
     * This constructor needs to be called
     *
     * @throws IllegalArgumentException will be thrown if ip, user or password were not set by the setConnectionParameter method
     * @throws SQLException             will be thrown if connection to db could not be established
     */
    public DBUser() throws IllegalArgumentException, SQLException {
        super();
    }


    /**
     * Compares user_id and password with database entries
     * if values match and return a resultSet, method will return an object with the users info
     *
     * @param user from UserDto which comes from the request
     * @return Userobject contains the users information with the values received from the DB
     * @throws SQLException Exception if connection to db fails or an error accrues
     */
    public UserDto loginUser(UserDto user) throws SQLException {
        ResultSetMapper<UserDto> resultSetMapper = new ResultSetMapper<>();
        PreparedStatement compareUser = conn.prepareStatement("SELECT * FROM users WHERE user_id = ? AND password = PASSWORD(?)");
        compareUser.setInt(1, user.getUser_id());
        compareUser.setString(2, user.getPassword());
        ResultSet rs = compareUser.executeQuery();
        try {
            if (!rs.isBeforeFirst()) {
                return null;
            } else {
                return resultSetMapper.mapResultSetToObject(rs, UserDto.class).get(0);
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException | IndexOutOfBoundsException e) {
            e.printStackTrace();
            this.logger.error(e);
            return null;
        }
    }
}
