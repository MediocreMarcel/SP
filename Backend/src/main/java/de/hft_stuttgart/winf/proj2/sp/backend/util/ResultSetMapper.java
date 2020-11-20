package de.hft_stuttgart.winf.proj2.sp.backend.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.ResultSet;
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
                        String value = rs.getString(name);
                        field.setAccessible(true);
                        field.set(dto, field.getType().getConstructor(String.class).newInstance(value));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            list.add(dto);

        }
        return list;
    }

}
