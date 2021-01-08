package de.hft_stuttgart.winf.proj2.sp.backend.util;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * This Class will provide methods to extract values out of a ResultSet and put them into DTO Objects
 *
 */
public class ResultSetMapper {

    private static Logger logger = LogManager.getLogger(ResultSetMapper.class);

    /**
     * @param rs          ResultSet that should be converted to DTOs
     * @param objectClass Class of the DTO Object that should be created
     * @return Generated DTO Object
     * @throws SQLException
     * @throws NoSuchMethodException
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws InstantiationException
     */
    public <T> List<T> mapResultSetToObject(ResultSet rs, Class<T> objectClass) throws SQLException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        List<T> list = new ArrayList<>();
        while (rs.next()) {
            list.add(createObject(rs, objectClass));
        }
        return list;
    }

    private <T> T createObject(ResultSet rs, Class<T> objectClass) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {

        T dto = objectClass.getConstructor().newInstance();

        Class workingClassVar = objectClass;
        List<Field> fields = new ArrayList<>();

        while (workingClassVar != Object.class) {
            fields.addAll(Arrays.asList(workingClassVar.getDeclaredFields()));
            workingClassVar = workingClassVar.getSuperclass();
        }


        for (Field field : fields) {
            Column col = field.getAnnotation(Column.class);
            if (col != null) {
                if (!col.isObject()) {
                    String name = col.value();
                    try {
                        extractColumn(rs, dto, field, name);
                    } catch (Exception e) {
                        e.printStackTrace();
                        logger.error(e);
                    }
                } else {
                    field.setAccessible(true);
                    field.set(dto, createObject(rs, field.getType()));
                }
            }
        }
        return dto;
    }

    private <T> void extractColumn(ResultSet rs, T dto, Field field, String name) throws SQLException, ClassNotFoundException, IllegalAccessException {
        ResultSetMetaData metaData = rs.getMetaData();

        for (int i = 1; i <= metaData.getColumnCount(); i++) {
            if (metaData.getColumnName(i).equals(name)) {
                //make private field accessable
                field.setAccessible(true);

                //get Class of Column
                Class classOfColumn = Class.forName(metaData.getColumnClassName(i));

                field.set(dto, classOfColumn.cast(rs.getObject(i)));
            }
        }

    }
}