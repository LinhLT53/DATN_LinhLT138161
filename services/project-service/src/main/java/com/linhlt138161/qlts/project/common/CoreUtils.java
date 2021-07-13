package com.linhlt138161.qlts.project.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CoreUtils {

    public static String castDateToStringByPattern(Date date, String pattern) {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        String strDate = formatter.format(date);
        return strDate;
    }
}
