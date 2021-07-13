export const AUTHORITY_CODE: any = {
  // action
  'action.view': 'VIEW',
  'action.receive': 'RECEIVE',
  'action.insert': 'INSERT',
  'action.update': 'UPDATE',
  'action.delete': 'DELETE',
  'action.import': 'IMPORT',
  'action.export.excel': 'EXPORT_EXCEL',
  'action.export.pdf': 'EXPORT_PDF',
  'action.export.xml': 'EXPORT_XML',
  'action.approval': 'APPROVAL',
  'action.active': 'ACTIVE',
  'action.deactivate': 'DEACTIVATE',
  'action.enable': 'ENABLE',
  'action.disable': 'DISABLE',
  // resource
  'resource.hddt_qlht_chdn_chc': 'HDDT_QLHT_CHDN_CHC', // Cấu hình chung
  'resource.hddt_qlht_chdn_dtp': 'HDDT_QLHT_CHDN_DTP', // Dấu thập phân
  'resource.hddt_qlht_chdn_e': 'HDDT_QLHT_CHDN_E', // Email
  'resource.hddt_qlht_chdn_e_che': 'HDDT_QLHT_CHDN_E_CHE', // Cấu hình email
  'resource.hddt_qlht_chdn_e_chtm': 'HDDT_QLHT_CHDN_E_CHTM', // Cấu hình các trường mẫu
  'resource.hddt_qlht_chdn_bme': 'HDDT_CHDN_BME', // Biểu mẫu email
  'resource.hddt_qlht_chdn_bme_ds': 'HDDT_CHDN_BME_DS', // Danh sách biểu mẫu email
  'resource.hddt_qlht_chdn_bme_tm': 'HDDT_CHDN_BME_TM', // Thêm mới biểu mẫu email
  'resource.hddt_qlht_chdn_bme_cn': 'HDDT_CHDN_BME_CN', // Cập nhật biểu mẫu email
  'resource.hddt_qlht_chdn_bme_xct': 'HDDT_CHDN_BME_XCT', // Xem biểu mẫu email
  'resource.hddt_qlht_chdn_bme_mkbme': 'HDDT_CHDN_BME_MKBME', // Mở khoá biểu mẫu email
  'resource.hddt_qlht_chdn_bme_kbme': 'HDDT_CHDN_BME_KBME', // Khoá biểu mẫu email
  'resource.hddt_qlht_chdn_bme_ge': 'HDDT_CHDN_BME_GE', // Gửi email
  'resource.hddt_qlht_chdn_bme_dbme': 'HDDT_CHDN_BME_DBME', // Xóa biểu mẫu email
  'resource.hddt_qlht_chdn_chsms': 'HDDT_CHDN_CHSMS', // Cấu hình SMS
  'resource.hddt_qlht_chdn_chsms_hd': 'HDDT_CHDN_CHSMS_HD', // Cấu hình SMS từng loại hóa đơn
  'resource.hddt_qlht_nnd_ds': 'HDDT_QLHT_NND_DS', // Danh sách nhóm người dùng
  'resource.hddt_qlht_nnd_tm': 'HDDT_QLHT_NND_TM', // Thêm mới nhóm người dùng
  'resource.hddt_qlht_nnd_cn': 'HDDT_QLHT_NND_CN', // Cập nhật nhóm người dùng
  'resource.hddt_qlht_nnd_xct': 'HDDT_QLHT_NND_XCT', // Xem nhóm người dùng
  'resource.hddt_qlht_nnd_pqnnd': 'HDDT_QLHT_NND_PQNND', // Phân quyền nhóm người dùng
  'resource.hddt_qlht_nnd_knnd': 'HDDT_QLHT_NND_KNND', // Khóa nhóm người dùng
  'resource.hddt_qlht_nnd_mknnd': 'HDDT_QLHT_NND_MKNND', // Mở khóa nhóm người dùng
  'resource.hddt_qlht_nd_ds': 'HDDT_QLHT_NND_DS', // Danh sách người dùng
  'resource.hddt_qlht_nd_tm': 'HDDT_QLHT_NND_TM', // Thêm mới người dùng
  'resource.hddt_qlht_nd_cn': 'HDDT_QLHT_NND_CN', // Cập nhật người dùng
  'resource.hddt_qlht_nd_xct': 'HDDT_QLHT_NND_XCT', // Xem người dùng
  'resource.hddt_qlht_nd_pqkhhd': 'HDDT_QLHT_ND_PQKHHD', // Phân quyền ký hiệu hóa đơn
  'resource.hddt_qlht_nd_knd': 'HDDT_QLHT_ND_KND', // Khóa người dùng
  'resource.hddt_qlht_nd_mknd': 'HDDT_QLHT_ND_MKND', // Mở khóa người dùng
  'resource.hddt_dm_cn_ds': 'HDDT_DM_CN_DS', // Danh sách chi nhánh
  'resource.hddt_dm_cn_tm': 'HDDT_DM_CN_TM', // Thêm mới chi nhánh
  'resource.hddt_dm_cn_cn': 'HDDT_DM_CN_CN', // Cập nhật chi nhánh
  'resource.hddt_dm_cn_xct': 'HDDT_DM_CN_XCT', // Xem chi nhánh
  'resource.hddt_dm_cn_kcn': 'HDDT_DM_CN_KCN', // Khóa chi nhánh
  'resource.hddt_dm_cn_mkcn': 'HDDT_DM_CN_MKCN', // Mở khóa chi nhánh
  'resource.hddt_dm_kh_ds': 'HDDT_DM_KH_DS', // Danh sách khách hàng
  'resource.hddt_dm_kh_tm': 'HDDT_DM_KH_TM', // Thêm mới khách hàng
  'resource.hddt_dm_kh_cn': 'HDDT_DM_KH_CN', // Cập nhật khách hàng
  'resource.hddt_dm_kh_xct': 'HDDT_DM_KH_XCT', // Xem khách hàng
  'resource.hddt_dm_kh_xkh': 'HDDT_DM_KH_DKH', // Xóa khách hàng
  'resource.hddt_dm_kh_ikh': 'HDDT_DM_KH_IKH', // Import khách hàng
  'resource.hddt_dm_kh_ekh': 'HDDT_DM_KH_EKH', // Export khách hàng
  'resource.hddt_dm_hh_ds': 'HDDT_DM_HH_DS', // Danh sách hàng hóa
  'resource.hddt_dm_hh_tm': 'HDDT_DM_HH_TM', // Thêm mới hàng hóa
  'resource.hddt_dm_hh_cn': 'HDDT_DM_HH_CN', // Cập nhật hàng hóa
  'resource.hddt_dm_hh_xct': 'HDDT_DM_HH_XCT', // Xem hàng hóa
  'resource.hddt_dm_hh_xkh': 'HDDT_DM_HH_DKH', // Xóa hàng hóa
  'resource.hddt_dm_hh_ikh': 'HDDT_DM_HH_IKH', // Import hàng hóa
  'resource.hddt_dm_hh_ekh': 'HDDT_DM_HH_EKH', // Export hàng hóa
  'resource.hddt_qlph_ktttdn': 'HDDT_QLPH_KTTTDN', // Khởi tạo thông tin doanh nghiệp
  'resource.hddt_qlph_ktttdn_cntt': 'HDDT_QLPH_KTTTDN_CNTT', // Cập nhật thông tin chính
  'resource.hddt_qlph_ktttdn_cts': 'HDDT_QLPH_KTTTDN_CTS', // Tra cứu chứng thư số
  'resource.hddt_qlph_ktttdn_cts_ds': 'HDDT_QLPH_KTTTDN_CTS_DS', // Danh sách chứng thư số
  'resource.hddt_qlph_ktttdn_cts_tm': 'HDDT_QLPH_KTTTDN_CTS_TM', // Thêm mới chứng thư số
  'resource.hddt_qlph_ktttdn_cts_cn': 'HDDT_QLPH_KTTTDN_CTS_CN', // Cập nhật chứng thư số
  'resource.hddt_qlph_ktttdn_cts_xct': 'HDDT_QLPH_KTTTDN_CTS_XCT', // Xem chứng thư số
  'resource.hddt_qlph_ktttdn_cts_kh': 'HDDT_QLPH_KTTTDN_CTS_KH', // Kích hoạt chứng thư số
  'resource.hddt_qlph_ktttdn_mhd': 'HDDT_QLPH_KTTTDN_MHD', // Quản lý mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_ds': 'HDDT_QLPH_KTTTDN_MHD_DS', // Danh sách mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_tm': 'HDDT_QLPH_KTTTDN_MHD_TM', // Thêm mới mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_cn': 'HDDT_QLPH_KTTTDN_MHD_CN', // Cập nhật mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_xct': 'HDDT_QLPH_KTTTDN_MHD_XCT', // Xem mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_dmhd': 'HDDT_QLPH_KTTTDN_MHD_DMHD', // Xóa mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_kmhd': 'HDDT_QLPH_KTTTDN_MHD_KMHD', // Khoá mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_mkmhd': 'HDDT_QLPH_KTTTDN_MHD_MKMHD', // Mở khoá mẫu hóa đơn
  'resource.hddt_qlph_ktttdn_mhd_kpmhd': 'HDDT_QLPH_KTTTDN_MHD_KPMHD', // Khôi phục mẫu hóa đơn
  'resource.hddt_qlph_khhd_ds': 'HDDT_QLPH_KHHD_DS', // Danh sách ký hiệu hóa đơn
  'resource.hddt_qlph_khhd_tm': 'HDDT_QLPH_KHHD_TM', // Thêm mới ký hiệu hóa đơn
  'resource.hddt_qlph_khhd_cn': 'HDDT_QLPH_KHHD_CN', // Cập nhật ký hiệu hóa đơn
  'resource.hddt_qlph_khhd_xct': 'HDDT_QLPH_KHHD_XCT', // Xem ký hiệu hóa đơn
  'resource.hddt_qlph_khhd_kkhhd': 'HDDT_QLPH_KHHD_KKHHD', // Khóa ký hiệu hóa đơn
  'resource.hddt_qlph_khhd_mkkhhd': 'HDDT_QLPH_KHHD_MKKHHD', // Mở khóa ký hiệu hóa đơn
  'resource.hddt_qlph_ltbph_ds': 'HDDT_QLPH_LTBPH_DS', // Danh sách thông báo phát hành
  'resource.hddt_qlph_ltbph_tm': 'HDDT_QLPH_LTBPH_TM', // Thêm mới thông báo phát hành
  'resource.hddt_qlph_ltbph_cn': 'HDDT_QLPH_LTBPH_CN', // Cập nhật thông báo phát hành
  'resource.hddt_qlph_ltbph_xct': 'HDDT_QLPH_LTBPH_XCT', // Xem thông báo phát hành
  'resource.hddt_qlph_ltbph_xldkpd': 'HDDT_QLPH_LTBPH_XLDKPD', // Xem lý do không phê duyệt
  'resource.hddt_qlph_ltbph_gycpd': 'HDDT_QLPH_LTBPH_GYCPD', // Gửi yêu cầu phê duyệt
  'resource.hddt_qlph_ltbph_huytbph': 'HDDT_QLPH_LTBPH_HUYTBPH', // Hủy thông báo phát hành
  'resource.hddt_qlph_ltbph_xldhuy': 'HDDT_QLPH_LTBPH_XLDHUY', // Xem lý do hủy
  'resource.hddt_qlph_ltbph_huyds': 'HDDT_QLPH_LTBPH_HUYDS', // Hủy dải số
  'resource.hddt_qlph_ltbph_filebc': 'HDDT_QLPH_LTBPH_FILEBC', // Xem file bằng chứng
  'resource.hddt_qlhd_hdcph_ds': 'HDDT_QLHD_HDCPH_DS', // Danh sách hóa đơn chưa phát hành
  'resource.hddt_qlhd_hdcph_tm': 'HDDT_QLHD_HDCPH_TM', // Lập hóa đơn nháp
  'resource.hddt_qlhd_hdcph_cn': 'HDDT_QLHD_HDCPH_CN', // Cập nhật hóa đơn chưa phát hành
  'resource.hddt_qlhd_hdcph_ihdcph': 'HDDT_QLHD_HDCPH_IHDCPH', // Import hóa đơn chưa phát hành theo file
  'resource.hddt_qlhd_hdcph_phhd': 'HDDT_QLHD_HDCPH_PHHD', // Phát hành hóa đơn
  'resource.hddt_qlhd_hdcph_dhdcph': 'HDDT_QLHD_HDCPH_DHDCPH', // Xóa hóa đơn chưa phát hành
  'resource.hddt_qlhd_hddph_ds': 'HDDT_QLHD_HDDPH_DS', // Quản lý hóa đơn đã phát hành
  'resource.hddt_qlhd_hddph_tm': 'HDDT_QLHD_HDDPH_TM', // Lập hóa đơn
  'resource.hddt_qlhd_hddph_ihddph': 'HDDT_QLHD_HDDPH_IHDDPH', // Lập hóa đơn theo file
  'resource.hddt_qlhd_hddph_cdnhd': 'HDDT_QLHD_HDDPH_CDNHD', // Chuyển đổi nhiều hóa đơn
  'resource.hddt_qlhd_hddph_tnhd': 'HDDT_QLHD_HDDPH_TNHD', // Tải nhiều hóa đơn
  'resource.hddt_qlhd_hddph_cnkkt': 'HDDT_QLHD_HDDPH_CNKKT', // Cập nhật kê khai thuế
  'resource.hddt_qlhd_hddph_xct': 'HDDT_QLHD_HDDPH_XCT', // Xem chi tiết hóa đơn
  'resource.hddt_qlhd_hddph_dcttin': 'HDDT_QLHD_HDDPH_DCTTIN', // Điều chỉnh thông tin
  'resource.hddt_qlhd_hddph_dctt': 'HDDT_QLHD_HDDPH_DCTT', // Điều chỉnh tiền tệ
  'resource.hddt_qlhd_hddph_lhdtt': 'HDDT_QLHD_HDDPH_LHDTT', // Lập hóa đơn thay thế
  'resource.hddt_qlhd_hddph_dhd': 'HDDT_QLHD_HDDPH_DHD', // Xóa bỏ hóa đơn
  'resource.hddt_qlhd_hddph_lhdcd': 'HDDT_QLHD_HDDPH_LHDCD', // Lập hóa đơn chuyển đổi
  'resource.hddt_qlhd_hddph_ge': 'HDDT_QLHD_HDDPH_GE', // Gửi email
  'resource.hddt_qlhd_hddph_gtn': 'HDDT_QLHD_HDDPH_GTN', // Gửi tin nhắn
  'resource.hddt_qlhd_hddph_tchd': 'HDDT_QLHD_TCHD', // Tra cứu hóa đơn
  'resource.hddt_qlhd_hddph_kphdxb': 'HDDT_QLHD_HDDPH_KPHDXB', // Khôi phục hóa đơn xóa bỏ
  //QLPH
  'resource.qlns':'HR', //Quản lý nhân sự
  'resource.qlns_import':'HR_1',//Import excel
  'resource.qlns_tmns':'HR_2',//Thêm mới nhân sự
  'resource.qlns_cnns':'HR_3',//Cập nhật nhân sự
  'resource.qlns_xttns':'HR_4',//Xem thông tin nhân sự
  'resource.qlns_dlmk':'HR_5',//Đặt lại mật khẩu
  'resource.qlns_xns':'HR_6',//Xóa nhân sự
  'resource.qlns_kns':'HR_6',//Khóa nhân sự
  'resource.pqht':'PQHT',//Phân quyền hệ thống
  'resource.pqht_tqht':'PQHT_1',//Thêm nhóm quyền hệ thống
  'resource.pqht_sqht':'PQHT_2',//Sửa nhóm quyền hệ thống
  'resource.pqht_xqht':'PQHT_3',//Xóa nhóm quyền hệ thống
  'resource.pqht_ttqht':'PQHT_4',//Thêm thành viên vào nhóm quyền hệ thống
  'resource.qlda':'QLDA',//Quản lý dự án
  'resource.qlda_dbda':'QLDA_1',//Đồng bộ thông tin dự án
  'resource.qlda_tda':'QLDA_2',//Thêm thông tin dự án
  'resource.qlda_sda':'QLDA_3',//Sửa thông tin dự án
  'resource.qlda_xda':'QLDA_4',//Xóa thông tin dự án
  'resource.qlda_xttda':'QLDA_5',//Xem thông tin dự án
  'resource.qlda_xttda_ulnl':'QLDA_5_1',//Xác nhận ước lượng nỗ lực dự án
  'resource.qlda_tnvda':'QLDA_6',//Thêm nhân viên vào dự án
  'resource.qlda_spda':'QLDA_7',//Sản phẩm dự án
  'resource.qlda_spda_tspbg':'QLDA_7_1',//Thêm sản phẩm bàn giao
  'resource.qlda_spda_sspbg':'QLDA_7_2',//Sửa sản phẩm bàn giao
  'resource.qlda_spda_xspbg':'QLDA_7_3',//Xóa sản phẩm bàn giao
  'resource.qlda_spda_xttspbg':'QLDA_7_4',//Xem sản phẩm bàn giao
  'resource.qlda_khda':'QLDA_8',//Kế hoạch dự án
  'resource.qlda_khda_tkhda':'QLDA_8_1',//Thêm kế hoạch dự án
  'resource.qlda_khda_skhda':'QLDA_8_2',//Sửa kế hoạch dự án
  'resource.qlda_khda_xkhda':'QLDA_8_3',//Xóa kế hoạch dự án
  'resource.qlda_khda_xttkhda':'QLDA_8_4',//Xem kế hoạch dự án
  'resource.qlda_khda_xnkhda':'QLDA_8_5',//Xác nhạn kế hoạch dự án
  'resource.qldt':'QLDT', //Quản lý đối tác
  'resource.qldt_tdt':'QLDT_1', //Thêm đối tác
  'resource.qldt_sdt':'QLDT_2', //Sửa đối tác
  'resource.qldt_xdt':'QLDT_3', //Xóa đối tác
  'resource.qldt_dsdt':'QLDT_4', //Xóa đối tác
  'resource.qlda_qlrr':'QLRR', //danh sách rủi ro
  'resource.qlda_qlrr_trr':'QLRR_1', //Thêm rủi ro
  'resource.qlda_qlrr_srr':'QLRR_2', //Sủa rủi ro
  'resource.qlda_qlrr_xrr':'QLRR_3', //Xóa rủi ro
  'resource.qlda_qlrr_xctrr': 'QLRR_4', //Xem chi tiết
  'resource.qlda_vdtv':'VDTV', //danh sách vấn đề thành viên
  //menu

  'menu': 'menu',
  'menu.hddt_qlht': 'HDDT_QLHT', // Quản lý hệ thống
  'menu.hddt_qlht_chdn': 'HDDT_QLHT_CHDN', // Cấu hình doanh nghiệp
  'menu.hddt_qlht_nnd': 'HDDT_QLHT_NND', // Quản lý nhóm người dùng
  'menu.hddt_qlht_nd': 'HDDT_QLHT_ND', // Quản lý người dùng
  'menu.hddt_dm': 'HDDT_DM', // Danh mục
  'menu.hddt_dm_cn': 'HDDT_DM_CN', // Quản lý chi nhánh
  'menu.hddt_dm_kh': 'HDDT_DM_KH', // Quản lý khách hàng
  'menu.hddt_dm_hh': 'HDDT_DM_HH', // Quản lý hàng hóa
  'menu.hddt_qlph': 'HDDT_QLPH', // Quản lý phát hành
  'menu.hddt_qlph_ktttdn': 'HDDT_QLPH_KTTTDN', // Khởi tạo thông tin doanh nghiệp,
  'menu.hddt_qlph_khhd': 'HDDT_QLPH_KHHD', // Quản lý ký hiệu hóa đơn
  'menu.hddt_qlph_ltbph': 'HDDT_QLPH_LTBPH', // Lập thông báo phát hành
  'menu.hddt_qlhd': 'HDDT_QLHD', // Quản lý hóa đơn
  'menu.hddt_qlhd_hdcph': 'HDDT_QLHD_HDCPH', // Quản lý hóa đơn chưa phát hành
  'menu.hddt_qlhd_hddph': 'HDDT_QLHD_HDDPH', // Quản lý hóa đơn đã phát hành
  'menu.hddt_qlhd_tchd': 'HDDT_QLHD_TCHD', // Tra cứu hóa đơn
  'menu.hddt_bc': 'HDDT_BC', // Báo cáo
  'menu.hddt_bc_thsdhd': 'HDDT_BC_THSDDHD', // Báo cáo tình hình sử dụng hóa đơn
  'menu.hddt_bc_thsdhd_excel': 'HDDT_BC_THSDDHD_EXCEL', // Xuất Excel
  'menu.hddt_bc_thsdhd_pdf': 'HDDT_BC_THSDDHD_PDF', // Xuất PDF
  'menu.hddt_bc_thsdhd_xml': 'HDDT_BC_THSDDHD_MXL', // Xuất xml
  'menu.hddt_bc_bkhdctdv': 'HDDT_BC_BKHDCTDV', // Bảng kê hóa đơn, chứng từ HH, DV bán ra
  'menu.hddt_bc_bkhdctdv_xct': 'HDDT_BC_BKHDCTDV_XCT', // Xem chi tiết
  'menu.hddt_bc_bkhdctdv_excel': 'HDDT_BC_BKHDCTDV_EXCEL', // Xuất excel
  'menu.hddt_bktlphhd': 'HDDT_BC_BKTLPHHDD', // Báo cáo bảng kê tạo lập phát hành hóa đơn
  'menu.hddt_bktlphhd_xct': 'HDDT_BC_BKTLPHHD_XCT', // Xem chi tiết báo cáo
  'menu.hddt_bktlphhd_excel': 'HDDT_BC_BKTLPHHD_EXCEL', // Xuất Excel
  'menu.hddt_bktlphhd_pdf': 'HDDT_BC_BKTLPHHD_PDF', // Xuất PDF
  'menu.hddt_bkhdtt': 'HDDT_BC_BKHDTT', // Báo cáo bảng kê hóa đơn thay thế
  'menu.hddt_bkhdtt_xct': 'HDDT_BC_BKHDTT_XCT', // Xem báo cáo
  'menu.hddt_bkhdtt_pdf': 'HDDT_BC_BKHDTT_PDF', // Xuất PDF
  'menu.hddt_bkhdtt_excel': 'HDDT_BC_BKHDTT_ECXEL', // Xuất Excel
  'menu.hddt_bkhddc': 'HDDT_BC_BKHDDC', // Báo cáo bảng kê hóa đơn điều chỉnh
  'menu.hddt_bkhddc_xct': 'HDDT_BC_BKHDDC_XCT', // Xem báo cáo
  'menu.hddt_bkhddc_pdf': 'HDDT_BC_BKHDDC_PDF', // Xuất PDF
  'menu.hddt_bkhddc_excel': 'HDDT_BC_BKHDDC_EXCEL', // Xuất Excel
  'menu.hddt_bkhdxb': 'HDDT_BC_BKHDXB', // Báo cáo bảng kê hóa đơn xóa bỏ
  'menu.hddt_bkhdxb_xct': 'HDDT_BC_BKHDXB_XCT', // Xem chi tiết
  'menu.hddt_bkhdxb_excel': 'HDDT_BC_BKHDXB_EXCEL', // Xuất Excel
  'menu.hddt_bkhdxb_pdf': 'HDDT_BC_BKHDXB_PDF', // Xuất PDF
  'menu.hddt_bvtmhh': 'HDDT_BC_BVTMHH', // Báo cáo bênh viện truyền máu huyết học
  'menu.hddt_bvtmhh_xct': 'HDDT_BC_BVTMHH_XCT', // Xem chi tiết
  'menu.hddt_bvtmhh_excel': 'HDDT_BC_BVTMHH_EXCEL', // Xuất Excel
  'menu.hddt_bvtmhh_pdf': 'HDDT_BC_BVTMHH_PDF', // Xuất PDF
  'menu.hddt_hdhd': 'HDDT_BC_HDHD', // Báo cáo hủy dải hóa đơn
  'menu.hddt_hdhd_xct': 'HDDT_BC_HDHD_XCT', // Xem báo cáo
  'menu.hddt_hdhd_excel': 'HDDT_BC_HDHD_EXCEL', // Xuất Excel
  'menu.hddt_hdhd_pdf': 'HDDT_BC_HDHD_PDF', // Xuất PDF
  'menu.hddt_thdttshd': 'HDDT_BC_THDTTSHD', // Báo cáo tổng hợp doanh thu theo số HĐ
  'menu.hddt_thdttshd_xct': 'HDDT_BC_THDTTSHD_XCT', // Xem báo cáo
  'menu.hddt_thdttshd_excel': 'HDDT_BC_THDTTSHD_EXCEL', // Xuất Excel
  'menu.hddt_thdttshd_pdf': 'HDDT_BC_THDTTSHD_PDF', // Xuất PDF
  'menu.hddt_tktttdb': 'HDDT_BC_TKTTTDB', // Tờ khai thuế tiêu thụ đặc biệt
  'menu.hddt_tktttdb_excel': 'HDDT_BC_TKTTTDB_EXCEL', // Xuất Excel
  'menu.hddt_tktttdb_pdf': 'HDDT_BC_TKTTTDB_PDF', // Xuất PDF
  'menu.hddt_hdks': 'HDDT_BC_HDKS', // Báo cáo hóa đơn khách sạn
  'menu.hddt_hdks_xct': 'HDDT_BC_HDKS_XCT', // Xem báo cáo
  'menu.hddt_hdks_excel': 'HDDT_BC_HDKS_EXCEL', // Xuất excel
  'menu.hddt_hdks_pdf': 'HDDT_BC_HDKS_PDF', // Xuất PDF
  'menu.hddt_thsdbl': 'HDDT_BC_THSDBL', // Báo cáo tình hình sử dụng biên lai
  'menu.hddt_thsdbl_excel': 'HDDT_BC_THSDBL_EXCEL', // Xuất Excel
  'menu.hddt_thsdbl_pdf': 'HDDT_BC_THSDBL_PDF', // Xuất PDF
  'menu.hddt_thsdbl_xml': 'HDDT_BC_THSDBL_XML', // Xuất xml
  'menu.hddt_plbktttdbks': 'HDDT_BC_PLBKTTTDBKS', // Phụ lục BK thuế TTDB cho KS
  'menu.hddt_plbktttdbks_excel': 'HDDT_BC_PLBKTTTDBKS_EXCEL', // Xuất Excel
  'menu.hddt_plbktttdbks_pdf': 'HDDT_BC_PLBKTTTDBKS_PDF', // Xuất PDF
  'menu.hddt_bhct': 'HDDT_BC_BHCT', // Báo cáo bán hàng chi tiết
  'menu.hddt_bhct_xct': 'HDDT_BC_BHCT_XCT', // Xem báo cáo
  'menu.hddt_bhct_excel': 'HDDT_BC_BHCT_EXCEL', // Xuất excel
  'menu.hddt_bhct_pdf': 'HDDT_BC_BHCT_PDF', // Xuất PDF
  'menu.hddt_ge': 'HDDT_BC_GE', // Báo cáo gửi email
  'menu.hddt_ge_xct': 'HDDT_BC_GE_XBC', // Xem báo cáo
  'menu.hddt_ge_excel': 'HDDT_BC_GE_EXCEL', // Xuất Excel
  'menu.hddt_ge_pdf': 'HDDT_BC_GE_PDF', // Xuất PDF
  'menu.hddt_httq': 'HDDT_BC_HTTQ', // Báo cáo hoàn thuế theo quý
  'menu.hddt_httq_excel': 'HDDT_BC_HTTQ_EXCEL', // Xuất excel
  'menu.hddt_httq_pdf': 'HDDT_BC_HTTQ_PDF', // Xuất pdf
  'menu.hddt_bthdlhddt': 'HDDT_BC_BTHDLHDDT', // Mẫu bảng tổng hợp dữ liệu hóa đơn điện tử gửi cơ quan thuế
  'menu.hddt_bthdlhddt_xct': 'HDDT_BC_BTHDLHDDT_XCT', // Xem báo cáo
  'menu.hddt_bthdlhddt_excel': 'HDDT_BC_BTHDLHDDT_EXCEL' // Xuất Excel



};

