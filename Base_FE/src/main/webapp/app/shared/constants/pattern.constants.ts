export const REGEX_PATTERN = {
  // EMAIL: /^[a-zA-Z0-9][a-zA-Z0-9_*$&+,:;=?#|'<>.^*()%!-]{2,}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,}){1,2}$/,
  EMAIL: /^[a-zA-Z0-9]{1,}([._%+-]{0,1}[a-zA-Z0-9]{1,}){0,}@[a-zA-Z0-9]{3,}([.-]{0,1}[a-zA-Z0-9]{2,3}){1,2}$/,
  EXCHANGE_RATE: /^[\d]{1,11}([,]\d{0,6})?$/,
  IP: /^[0-9.]*$/,
  NUMBER: /^[0-9]*$/,

  /*IIST - LongPC - CREATED 200514*/
  FLOAT: /^[0-9]*[.0-9]{0,3}$/,
  FLOAT_INFINITY: /^[0-9]*[.0-9]*$/,
  /*END - IIST - LongPC - CREATED 200514*/

  USERNAME: /^[a-zA-Z0-9-._]*$/,
  INVOICE_SERIAL: /^[a-zA-Z0-9]*$/,
  DATA_CATEGORIES: /[^A-Za-z0-9_]+/g,
  INVOICE_TEMPLATE_NAME: /[^_|-|[|]]*$/,
  PASSWORD_INVALID: /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ·]*/g,
  SEARCH_DROPDOWN_LIST: /[\s,.-]/g
};

export const REGEX_REPLACE_PATTERN = {
  REPRESENTATIVE_ID_NO: /[^A-Za-z0-9-_]*/g,
  BANK_NAME: /[^A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ·\-_ ]*/g,
  UNIT_NAME: /[^a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ·\-_/ ]*/g,
  TAX_CODE: /[^0-9-]*/g,
  COUNTRY_CODE: /[^A-Za-z0-9]*/g,
  IP: /[^0-9.]*/g,
  NUMBER: /[^0-9]*/g,
  USERNAME: /[^a-zA-Z0-9-._]*/g,
  DECIMAL: /[^.|,]*/g,
  INVOICE_SERIAL: /[^a-zA-Z0-9·]*/g,
  DATA_CATEGORIES: /[^A-Za-z0-9_]+/g,
  INVOICE_TEMPLATE_NAME: /[^_|-|[|]]*/g,
  // ThucDV modifily start 27/05/2020
  CODE_USER_GROUP: /[^a-zA-Z0-9-._]*/g,
  // ThucDV modifily end 27/05/2020
  PARTNER_CODE: /[^A-Za-z0-9_]*/g,
  // TanNV 28/9/2020
  INTEGER: /[^0-9]*$/,
};
