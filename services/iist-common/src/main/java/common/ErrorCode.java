package common;

/**
 * @author : SyPT-IIST
 * @since : 6/18/2020
 **/


public class ErrorCode {

    public static final String OK = "200";

    public static final ObjectError VALID_OBJ = new ObjectError("BK000", "Lỗi valid dữ liệu");

    public static final String NUMBER_FORMAT_EXCEPTION = "NUMBER_FORMAT_EXCEPTION";

    public static final ObjectError USERNAME_NOT_FOUND = new ObjectError("BK0000", "User khong ton tai");

    public static final ObjectError AUTHENTICATION_FAILED = new ObjectError("BK0015", Constants.LOGIN_FAILE);

    public static final ObjectError OBJ_ALREADY_EXISTS = new ObjectError("BK001", Constants.CREATED_FAILE);

    public static final ObjectError UPDATED_OK = new ObjectError("BK002", Constants.UPDATED_OK);

    public static final ObjectError CREATED_OK = new ObjectError("BK006", Constants.CREATED_OK);

    public static final ObjectError FIELD_NULL = new ObjectError("BK005", "Day la truong bat buo khong duoc thieu");

    public static final ObjectError UPDATED_FAILE = new ObjectError("BK007", Constants.UPDATED_FAILE);

    public static final ObjectError EMAIL_INCORRECT = new ObjectError("BK0010", Constants.EMAIL_PATTERN);

    public static final ObjectError PASSWORD_CONFIRM_INCORRECT = new ObjectError("BK0012", Constants.PASSWORD_CONFIRM_NULL);

    public static final ObjectError NEW_PASSWORD_CONFIRM_INCORRECT = new ObjectError("BK0014", Constants.NEW_PASSWORD_CONFIRM_NULL);

    public static final ObjectError OBJECT_NOT_FOUND = new ObjectError("BK998", Constants.SELECT_FAILE);

    public static final ObjectError SERVER_ERROR = new ObjectError("BK999", Constants.SERVER_ERROR);
    //Test
    public static final String TEST_DESC_NULL = "TEST_DESC_NULL";

    /*TanNV*/
    public static final ObjectError EMAIL_IS_EXIST = new ObjectError("BK010", Constants.EMAIL_IS_EXIST);

    public static final ObjectError CREATED_HR_OK = new ObjectError("BK006", Constants.CREATE_HR_OK);
    public static final ObjectError CREATED_CUSTOMER_OK = new ObjectError("BK006", Constants.CREATE_CUSTOMER_OK);

    public static final ObjectError CREATED_HR_EXIST = new ObjectError("BK001", Constants.HR_CODE_EXIST);
    public static final ObjectError CREATED_CUSTOMER_EXIST = new ObjectError("BK001", Constants.CUSTOMER_CODE_EXIST);

    public static final ObjectError CREATED_HR_FALSE = new ObjectError("BK001", Constants.CREATE_HR_FALSE);
    public static final ObjectError CREATED_CUSTOMER_FALSE = new ObjectError("BK001", Constants.CREATE_CUSTOMER_FALSE);

    public static final ObjectError UPDATED_HR_OK = new ObjectError("BK002", Constants.UPDATED_ROOM_OK);

    public static final ObjectError UPDATED_HR_FAIL = new ObjectError("BK001", Constants.UPDATED_ROOM_FAILE);

    public static final ObjectError DELETE_HR_FAIL = new ObjectError("BK008", Constants.DELETE_HR_FALI);

    public static final ObjectError DELETE_HR_OK = new ObjectError("BK009", Constants.DELETE_HR_OK);

    public static final ObjectError UNLOCK_HR_OK = new ObjectError("BK0010", Constants.UNLOCK_HR_OK);

    public static final ObjectError DELETE_CUSTOMER_OK = new ObjectError("BK021", Constants.DELETE_CUSTOMER_OK);

    public static final ObjectError DELETE_CUSTOMER_FAIL = new ObjectError("BK022", Constants.DELETE_CUSTOMER_FAIL);

    //nuctv 08/07/2020
    public static final ObjectError USER_ALREADY_IN_ANOTHER_TABLE = new ObjectError("BK008", "Đang có ràng buộc dữ liệu, Không thể xóa thông tin account!");

    public static final ObjectError DELETE_USER_SUCCESS = new ObjectError("BK009", "Xóa account thành công!");

    /* ERROR CODE GROUP PERMISSION */
    public static final ObjectError DEPARTMENT_EMPTY = new ObjectError("EGP001", Constants.DEPARTMENTS_EMPTY);
    public static final ObjectError OBJ_NOT_FOUND = new ObjectError("EGP002", Constants.OBJ_NOT_FOUND);
    public static final ObjectError USER_NOT_FOUND = new ObjectError("EGP003", Constants.USER_NOT_FOUND);
    public static final ObjectError SAVE_GROUP_PERMISSION_ERROR = new ObjectError("EGP003", Constants.SAVE_GROUP_PERMISSION_ERROR);
    public static final ObjectError OBJ_EXIST = new ObjectError("EGP004", Constants.OBJ_EXIST);
    public static final ObjectError SAVE_USER_ERROR = new ObjectError("EGP005", Constants.SAVE_USER_ERROR);
    public static final ObjectError SAVE_DEPARTMENTS_ERROR = new ObjectError("EGP006", Constants.SAVE_DEPARTMENTS_ERROR);
    public static final ObjectError DELETE_DEPARMENTS_ERROR = new ObjectError("EGP007", Constants.DELETE_DEPARMENTS_ERROR);
    public static final ObjectError SAVE_PERMISSIONS_ERROR = new ObjectError("EGP008", Constants.SAVE_PERMISSIONS_ERROR);
    public static final ObjectError DELETE_PERMISSIONS_ERROR = new ObjectError("EGP009", Constants.DELETE_PERMISSIONS_ERROR);
    public static final ObjectError PERMISSION_LIST_EXIST = new ObjectError("EGP010", Constants.PERMISSION_LIST_EXIST);
    public static final ObjectError GROUPPERMISSION_EXIST = new ObjectError("EGP012", Constants.PERMISSION_LIST_EXIST);
    public static final ObjectError GROUP_PERMISSION_INACTIVE = new ObjectError("EGP011", Constants.GROUP_PERMISSION_INACTIVE);
    /*
     *@author ThaoLC - IIST
     *created on 7/30/2020
     */
    public static final ObjectError RESET_PASSWORD_OK = new ObjectError("BK0046",Constants.RESET_PASSWORD_OK);
    public static final ObjectError RESET_PASSWORD_FAIL = new ObjectError("BK001",Constants.RESET_PASSWORD_FAIL);
    public static final ObjectError OLD_PASSWORD_FAILE= new ObjectError("BK0013",Constants.OLD_PASSWORD_FAILE);
    public static final ObjectError EMAIL_NULL = new ObjectError("BK0044", Constants.EMAIL_NULL);
    public static final ObjectError EMAIL_NOT_FOUND = new ObjectError("BK0045", Constants.EMAIL_NOT_FOUND);
    public static final ObjectError VERIFY_KEY_NOT_FOUND = new ObjectError("BK0047", Constants.VERIFY_KEY_NOT_FOUND);
    public static final ObjectError START_OR_END_PROJECT_NULL = new ObjectError("BK0048",Constants.START_OR_END_PROJECT_NULL);
    public static final ObjectError ESTIMATE_NULL = new ObjectError("BK0049", Constants.ESTIMATE_NULL);


    public static final ObjectError CAPCHA_FAILED = new ObjectError("KH001", "Lỗi cap cha");

}
