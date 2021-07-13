package common;

import lombok.Data;

/**
 * @author chinhlv
 * @created 26/06/2020 - 12:58 PM
 * @project booking-room-services
 **/
@Data
public class ObjectError {
    private String code;
    private String msgError;

    public ObjectError(String code, String msgError) {
        this.code = code;
        this.msgError = msgError;
    }
}
