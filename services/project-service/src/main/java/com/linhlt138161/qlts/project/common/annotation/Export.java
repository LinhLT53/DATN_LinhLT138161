package com.thao.qlts.project.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Export {
  final int NUM_DEFAULT = -1;

  final String STRING_DEFAULT = "";

  int size() default NUM_DEFAULT;

  int index() default NUM_DEFAULT;

  String type() default STRING_DEFAULT;

  String headerName() default STRING_DEFAULT;


}
