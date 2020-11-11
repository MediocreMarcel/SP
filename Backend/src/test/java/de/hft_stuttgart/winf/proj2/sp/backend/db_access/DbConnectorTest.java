package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

import java.sql.SQLException;

public class DbConnectorTest {


    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionIfConParaNotSet() throws SQLException {
        new DbConnector() {
        };
    }

    @Test(expected = SQLException.class)
    public void shouldThrowExceptionIfNotAbleToConnect() throws SQLException {
        DbConnector.setConnectionParameter("ip", "usr", "pw");
        new DbConnector() {
        };
    }
}
