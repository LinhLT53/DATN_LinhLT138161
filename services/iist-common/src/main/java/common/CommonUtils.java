package common;

import exception.CustomExceptionHandler;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * @author : SyPT-IIST
 * @since : 6/19/2020
 **/


public class CommonUtils {
    public static void validParams(Object object, Class<?>... groups) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Object>> violations = validator.validate(object, groups);
        for (ConstraintViolation<Object> violation : violations) {
            throw new CustomExceptionHandler(violation.getMessage(), HttpStatus.BAD_REQUEST, ErrorCode.VALID_OBJ);
        }
    }


  /*  public static ResponseEntity getResponseFromByte(String fileName, byte[] exportInputStream) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set("File", fileName);
        headers.set("Content-Disposition", "attachment; filename=" + fileName);
        headers.set("Access-Control-Expose-Headers", "File");
        return ResponseEntity.ok().headers(headers).body(exportInputStream);
    }*/

    public static InputStream getInputStreamByFileName(String fileName) {
        try {
            if (!StringUtils.isEmpty(fileName) && fileName.contains(".")) {
                return new ClassPathResource("/templates/" + fileName).getInputStream();
            } else {
                return null;
            }
        } catch (IOException ioE) {
//      logCommon.error("Error Get Input Stream for : " + Constants.TEMPLATE_PATH + fileName + " is : " + ioE.toString(), ioE);
            return null;
        }
    }

    public static String getFileNameReportUpdate(String preName) {
        String pattern = "yyMMdd_HHmmss";
        DateFormat dtf = new SimpleDateFormat(pattern);
        String date = dtf.format(new Date());
        return preName + "_" + date + ".xlsx";
    }

    public static boolean isNullOrEmpty(Object[] objects) {
        if (objects == null || objects.length == 0) {
            return true;
        } else {
            for (Object o : objects) {
                if (o != null && o.toString() != null && !"".equals(o.toString().trim())) {
                    return false;
                }
            }
            return true;
        }
    }

    public static boolean isEqualsNullOrEmpty(Object objects) {
        if (objects == null || objects == "") {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isNullOrEmpty(List data) {
        return (data == null || data.isEmpty());
    }
}
