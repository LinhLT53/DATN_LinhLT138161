package common;

import java.lang.reflect.Field;

public class ConvetSetData {
    public static Object xetData(Object entity, Object dto) {
        Field[] fields = entity.getClass().getDeclaredFields();
        Field[] fieldsDto = dto.getClass().getDeclaredFields();
        for (Field field : fieldsDto) {
            for (Field field1 : fields) {
                if (field1.getName().equals(field.getName()) && (field.getType().equals(field1.getType()))) {
                    try {
                        field1.setAccessible(true);
                        field.setAccessible(true);
                        field1.set(entity, field.get(dto));

                    } catch (IllegalAccessException e) {
                        return null;
                    }

                }
            }
        }
        return entity;
    }
}
