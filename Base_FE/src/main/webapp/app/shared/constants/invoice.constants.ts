export const INVOICE = {
  CURRENCY: 'CURRENCY',
  TAX_VAT: 'TAX_VAT',
  PROPERTY_INVOICE: 'PROPERTY_INVOICE',
  PAYMENT_METHOD: 'PAYMENT_METHOD',
  TAX_SPREAD: 'TAX_SPREAD',
  VALID_PRODUCT_INVOICE: 'VALID_PRODUCT_INVOICE',
  INVOICE_TYPE_CODE_INTERNAL_ORDER: '03XKNB',
  INDUSTRY_SPECIFIC_WATER_ELECTRIC: 1,
  TAX_POLICY_UNIT: 1,
  TAX_POLICY_TOTAL: 2,
  DISCOUNT_POLICY_BEFORE_TAX: 1,
  DISCOUNT_POLICY_AFTER_TAX: 2,
  DISCOUNT_POLICY_NO: 0,
  ERROR_OUT_OF_REGISTER_INVOICE: 'error-2',
  ERROR_OUT_OF_CHANGE_ORDER_INVOICE: 'error-4',
  ERROR_OUT_OF_RELEASE_INVOICE: 'error-4',
  ERROR_NOT_ACTIVE_INVOICE: 'error-3',
  ERROR_TIME_RELEASE: 'error-1',
  ERROR_NOT_ACTIVE_SIGNATURE: 'error-3',
  INFO_UPDATE_DATE: '3',
  INFO_UPDATE_TEXT: '1',
  INFO_UPDATE_NUMBER: '2',
  TYPE_PRODUCT_GOODS: 1,
  TYPE_PRODUCT_OTHER_FEE: 5,
  ADJUSTED_STATUS: '3',
  ADJUSTMENT_TYPE: '7',
  SIZE_RESPONSE_SEARCH: 20,
  MAX_LENGTH_MONEY: 15,
  MAX_LENGTH_MONEY_EXTRA: 100,
  MAX_LENGTH_DISCOUNT: 15,
  TYPE_PRODUCT_PROMOTION: 6,
  TAX_VAT_NO: 'tax.vat.no',
  TAX_VAT_DECLARATION: 'tax.vat.declaration'
};

// Trạng thái hóa đơn. 0: hóa đơn nháp, 1: Hóa đơn phát hành, 2: Hóa đơn Lỗi (hoặc Hủy)
export const INVOICE_STATUS = {
  INVOICE_DRAFT: 0,
  INVOICE_ANNOUNCEMENT: 1,
  INVOICE_CANCEL: 2
};

// Trang thai ke khai thue: 1:da khai thue, 0 chua khai thue
export const TAX_DECLARATION_STATUS = {
  NOT_DECLARED: 0,
  DECLARED: 1
};

// Trạng thái chuyển đổi: '1':da chuyen doi, '0':chua chuyen doi
export const EXCHANGE_STATUS = {
  NOT_EXCHANGE: 0,
  EXCHANGE: 1
};

// Trạng thái điều chỉnh hóa đơn, 1:hoa don goc,3:hoa don thay the,5: hóa đơn điều chỉnh thông tin ,7:hoa don xoa bo,9:hoa don dieu chinh tiền
export const ADJUSTMENT_TYPE = {
  INVOICE: '1',
  ADJUSTMENT_REPLACE: '3',
  ADJUSTMENT_INFORMATION: '5',
  ADJUSTMENT_DELETE: '7',
  ADJUSTMENT_CURRENCY: '9'
};

// Trạng thái điều chỉnh 1. Bị điều chỉnh thông tin 2. bị điều chỉnh tiền 3. bị thay thế - 0 chưa bị điều chỉnh
export const ADJUSTED_STATUS = {
  NOT_ADJUSTED: 0,
  ADJUSTED_INFORMATION: 1,
  ADJUSTED_CURRENCY: 2,
  ADJUSTED_REPLACE: 3
};

// Trạng thái thanh toán hóa đơn: '1':da thanh toan, '2':chua thanh toan
export const PAYMENT_STATUS = {
  PAID: 1,
  UNPAID: 2
};

export const CURRENCY_STATUS = {
  SUCCESS: 1,
  WAITING: 2
};

export const ACTION_INVOICE = {
  HIDDEN: 0,
  SHOW: 1,
  SHOW_PROCESS_STATUS: 2,
  LHD: 'LHD',
  LHDN: 'LHDN',
  PHHD: 'PHHD',
  IMPORT: 'IMPORT'
};

// Trạng thái xử lý hóa đơn
// 1.Đã cấp số, mã bí mật, đẩy kafka thành công, chờ ký, sinh file
// 2.Xử lý thành công
// 3.Đã cấp số, mã bí mật, đẩy kafka không thành công
// 4.Xử lý ký, sinh file không thành công
export const PROCESS_STATUS = {
  SUCCESS: 2
};


