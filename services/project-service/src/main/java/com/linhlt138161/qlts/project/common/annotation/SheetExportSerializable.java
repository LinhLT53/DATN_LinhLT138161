package com.linhlt138161.qlts.project.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface SheetExportSerializable {
    final String STRING_DEFAUL = "";
    final int NUM_DEFAULT = 0;

    String sheetName() default STRING_DEFAUL;

    int totalCols() default NUM_DEFAULT;

    String header() default STRING_DEFAUL;


}
