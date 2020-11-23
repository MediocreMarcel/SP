package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import org.junit.jupiter.api.Test;

import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertThrows;


public class DbConnectorTest {


    @Test()
    public void shouldThrowExceptionIfConParaNotSet() throws SQLException {
        assertThrows(IllegalArgumentException.class, () -> {
            new DbConnector() {
            };
        });
    }

    @Test()
    public void shouldThrowExceptionIfNotAbleToConnect() throws SQLException {
        DbConnector.setConnectionParameter("ip", "usr", "pw");
        assertThrows(SQLException.class, () -> {
            new DbConnector() {
            };
        });
    }
}
