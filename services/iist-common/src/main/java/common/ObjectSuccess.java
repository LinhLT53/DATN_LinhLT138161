package common;

import lombok.Data;

@Data
public class ObjectSuccess {
    private String code;
    private String msgSuccess;

    public ObjectSuccess(String code, String msgSuccess) {
        this.code = code;
        this.msgSuccess = msgSuccess;
    }
}
