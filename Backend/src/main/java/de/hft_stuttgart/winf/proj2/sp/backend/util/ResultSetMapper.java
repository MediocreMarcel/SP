package de.hft_stuttgart.winf.proj2.sp.backend.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ResultSetMapper<T> {

    public List<T> mapResultSetToObject(ResultSet rs, Class objectClass) throws SQLException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        List<T> list = new ArrayList<>();
        while (rs.next()) {

            T dto = (T) objectClass.getConstructor().newInstance();
            Field[] fields = objectClass.getDeclaredFields();

            for (Field field : fields) {
                Column col = field.getAnnotation(Column.class);
                if (col != null) {
                    String name = col.value();
                    try {
                        extractColumn(rs, dto, field, name);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            list.add(dto);

        }
        return list;
    }

    private void extractColumn(ResultSet rs, T dto, Field field, String name) throws SQLException, ClassNotFoundException, IllegalAccessException {
        ResultSetMetaData metaData = rs.getMetaData();

        for (int i = 1; i <= metaData.getColumnCount(); i++){
            if (metaData.getColumnName(i).equals(name)){
                //make private field accessable
                field.setAccessible(true);

                //get Class of Column
                Class classOfColumn = Class.forName(metaData.getColumnClassName(i));

                field.set(dto, classOfColumn.cast(rs.getObject(i)));
            }
        }

    }

}
