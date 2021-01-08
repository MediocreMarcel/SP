package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import java.sql.*;

/**
 * @author Marcel Heda
 * Class will connect to DB
 * This class is implemented that there is only one connection object to the DB
 * Inheritate from this class and use the conn object in the sub class to access the db
 */
public abstract class DbConnector {

    protected static Connection conn = null;
    private static String ip = null;
    private static String user = null;
    private static String password = null;

    /**
     * This constructor needs to be called
     * @throws IllegalArgumentException will be thrown if ip, user or password were not set by the setConnectionParameter method
     * @throws SQLException will be thrown if connection to db could not be established
     */
    protected DbConnector() throws IllegalArgumentException, SQLException {
        if (ip == null || user == null || password == null){
            throw new IllegalArgumentException("ip, user or password not set");
        }
        if (conn == null || conn.isClosed()) {
            DbConnector.conn = DriverManager.getConnection("jdbc:mariadb://" + ip + "/sp?allowMultiQueries=true", user, password);
        }
    }

    /**
     * Sets connection parameters. Needs to be called before creating an instance of any subclass
     * @param ip ip of the Maria DB server
     * @param user username of DB user
     * @param password password of DB user
     */
    public static void setConnectionParameter(String ip, String user, String password){
        DbConnector.ip = ip;
        DbConnector.user = user;
        DbConnector.password = password;
    }

}
