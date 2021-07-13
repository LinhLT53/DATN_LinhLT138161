package common;

import org.joda.time.Days;
import org.joda.time.LocalDate;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public static final SimpleDateFormat FORMAT_YYYY_MM_DD = new SimpleDateFormat("yyyy-MM-dd");
    public static final SimpleDateFormat FORMAT_DD_MM_YYYY = new SimpleDateFormat("dd-MM-yyyy");
    public static final int SUNDAY = 1;
    public static final int MONDAY = 2;
    public static final int TUESDAY = 3;
    public static final int WEDNESDAY = 4;
    public static final int THURSDAY = 5;
    public static final int FRIDAY = 6;
    public static final int SATURDAY = 7;

    /*
     * @author: lvchinh
     * @return: 1-Su, 2-Mo, 3-Tu, 4-We, 5-Th, 6-Fr, 7-Sa
     * */
    public static int getDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    public static Date getDate(String date, String pattern){
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        try {
            return format.parse(date);
        }catch (Exception ex){
            return null;
        }
    }

    public static boolean isDayBetweenWeek(Date day, Date startWeek, Date endWeek) {
        if (!day.before(startWeek) && !day.after(endWeek)) {
            return true;
        }
        return false;
    }

    public static Date getFirstDayOfWeek(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return calendar.getTime();
    }

    public static Date getLastDayOfWeek(Date date) {
        return addDate(getFirstDayOfWeek(date), 6);
    }

    public static Date addDate(Date date, int amount) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, amount);
        Date date2 = calendar.getTime();
        return date2;
    }

    public static Date subDate(Date date, int amount) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, -amount);
        Date date2 = calendar.getTime();
        return date2;
    }

    public static String formatDateTime(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String format = sdf.format(date);
        return format;
    }

    public static String formatDateTime2(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String format = sdf.format(date);
        return format;
    }

    public static String formatDate(Date date) {
        return FORMAT_YYYY_MM_DD.format(date);
    }

    public static boolean isEqualsNullOrEmpty(Object objects) {
        if (objects == null || objects == "") {
            return true;
        } else {
            return false;
        }
    }

    public static String formatDateTwo(Date date) {
        return FORMAT_DD_MM_YYYY.format(date);
    }


    public static int getDayBetweenTwoDay(Date fromDate, Date toDate) {
        LocalDate localDate = LocalDate.fromDateFields(fromDate);
        LocalDate localDate1 = LocalDate.fromDateFields(toDate);
        int days = Days.daysBetween(localDate, localDate1).getDays();
        return days;
    }
}
