package de.hft_stuttgart.winf.proj2.sp.backend.util;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

public class ResultSetMapperTest {

    @Mock
    private ResultSet rs = mock(ResultSet.class);
    @Mock
    private ResultSetMetaData meta = mock(ResultSetMetaData.class);

    @BeforeEach
    public void prepare() throws SQLException {
        Mockito.when(rs.next()).thenReturn(true).thenReturn(false);
        Mockito.when(rs.getObject(1)).thenReturn("foo");
        Mockito.when(rs.getObject(2)).thenReturn(new Integer(123));
        Mockito.when(rs.getObject(3)).thenReturn(new Boolean(true));

        Mockito.when(meta.getColumnCount()).thenReturn(3);

        Mockito.when(meta.getColumnName(1)).thenReturn("String");
        Mockito.when(meta.getColumnName(2)).thenReturn("Int");
        Mockito.when(meta.getColumnName(3)).thenReturn("Bool");

        Mockito.when(meta.getColumnClassName(1)).thenReturn(String.class.getCanonicalName());
        Mockito.when(meta.getColumnClassName(2)).thenReturn(Integer.class.getCanonicalName());
        Mockito.when(meta.getColumnClassName(3)).thenReturn(Boolean.class.getCanonicalName());

        Mockito.when(rs.getMetaData()).thenReturn(meta);
    }

    @Test
    public void shouldThrowExceptionIfConParaNotSet() throws InvocationTargetException, SQLException, InstantiationException, IllegalAccessException, NoSuchMethodException {
        List<ExampleDTO> expected = new ArrayList<>();
        expected.add(new ExampleDTO("foo", 123, true));
        ResultSetMapper<ExampleDTO> mapper = new ResultSetMapper<>();
        assertEquals(expected, mapper.mapResultSetToObject(rs, ExampleDTO.class));
    }

}
