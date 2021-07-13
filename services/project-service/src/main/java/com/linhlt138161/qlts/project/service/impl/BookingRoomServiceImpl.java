package com.thao.qlts.project.service.impl;

import com.thao.qlts.project.dto.BookingRoomDTO;
import com.thao.qlts.project.dto.BookingRoomServiceDTO;
import com.thao.qlts.project.dto.DataPage;
import com.thao.qlts.project.entity.*;
import com.thao.qlts.project.repository.customreporsitory.BookingRoomCustomRepository;
import com.thao.qlts.project.repository.jparepository.*;
import com.thao.qlts.project.service.BookingRoomService;
import com.thao.qlts.project.service.mapper.BookingRoomMapper;
import com.thao.qlts.project.service.mapper.BookingRoomServiceMapper;
import common.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service(value = "bookingRoomService")
public class BookingRoomServiceImpl implements BookingRoomService {
    @Autowired
    private BookingRoomMapper bookingRoomMapper;
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;
    @Autowired
    private BookingRoomCustomRepository bookingRoomCustomRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRoomServiceRepository bookingRoomServiceRepository;
    @Autowired
    private BookingRoomServiceMapper bookingRoomServiceMapper;
    private final Logger logger = LogManager.getLogger(BookingRoomServiceImpl.class);

    @Override
    public ResultResp add(BookingRoomDTO bookingRoomDTO) {
        List<BookingRoomEntity> listEntity = null;
        if (CommonUtils.isEqualsNullOrEmpty(bookingRoomDTO.getBookingroomId())){
            logger.info("Thêm mới lịch đặt phòng khách sạn");
            if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                bookingRoomDTO.setBookingDate(bookingRoomDTO.getBookingCheckin());
                bookingRoomDTO.setBookingDateOut(bookingRoomDTO.getBookingCheckout());
                logger.info("Đặt phòng lẻ, phòng số "+bookingRoomDTO.getRoomId());
                listEntity = bookingRoomRepository.checkExistAdd(
                        bookingRoomDTO.getRoomId(),
                        bookingRoomDTO.getBookingCheckin(),
                        bookingRoomDTO.getBookingCheckout());
            }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                logger.info("Đặt phòng trước, phòng số "+bookingRoomDTO.getRoomId());
                listEntity = bookingRoomRepository.checkExistAdd(
                        bookingRoomDTO.getRoomId(),
                        bookingRoomDTO.getBookingDate(),
                        bookingRoomDTO.getBookingDateOut());
            }
            if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                logger.error("Lỗi đặt phòng: Thời gian đặt phòng trùng với thời gian đã đặt trong hệ thống");
                return ResultResp.serverError(new ObjectError("Exists","Đặt phòng thất bại, Thời gian đặt phòng đã trùng so với thời gian đặt trong hệ thống, vui lòng kiểm tra lại"));
            }else {
                BookingRoomEntity bookingEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                RoomEntity roomEntity = roomRepository.findById(bookingEntity.getRoomId()).get();
                if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                    bookingEntity.setStatus(Enums.BOOKING_TYPE.DANG_DAT.value());
                    roomEntity.setStatus(Enums.ROOM_TYPE.DANG_DAT_PHONG.value());
                    roomRepository.save(roomEntity);
                }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                    bookingEntity.setStatus(Enums.BOOKING_TYPE.DA_DAT.value());
                }
                bookingRoomRepository.save(bookingEntity);
                logger.info("Thêm mới lịch đặt phòng thành công");
                return ResultResp.success(new ObjectSuccess("Complete","Đặt phòng thành công"));
            }
        }else {
            BookingRoomEntity currEntity = bookingRoomRepository.findById(bookingRoomDTO.getBookingroomId()).get();
            if (currEntity.getRoomId().equals(bookingRoomDTO.getRoomId())){
                logger.info("Cập nhật lịch đặt phòng khách sạn");
                if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                    logger.info("Cập nhật lịch đặt phòng lẻ, phòng số "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistUpdate(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingCheckin(),
                            bookingRoomDTO.getBookingCheckout(),
                            bookingRoomDTO.getBookingroomId());
                }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                    logger.info("Cập nhật lịch đặt phòng trước, phòng số "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistUpdate(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingDate(),
                            bookingRoomDTO.getBookingDateOut(),
                            bookingRoomDTO.getBookingroomId());
                }
                if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                    logger.error("Lỗi cập nhật: Thời gian đặt phòng trùng với thời gian đã đặt trong hệ thống");
                    return ResultResp.serverError(new ObjectError("Exists","Cập nhật thất bại, Thời gian đặt phòng đã trùng so với thời gian đặt trong hệ thống, vui lòng kiểm tra lại"));
                }else {
                    BookingRoomEntity bookingEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                    bookingRoomRepository.save(bookingEntity);
                    logger.info("Cập nhật lịch đặt phòng thành công");
                    return ResultResp.success(new ObjectSuccess("Complete","Cập nhật đặt phòng thành công"));
                }
            }else {
                logger.info("Chuyển phòng khách sạn");
                if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                    logger.info("Chuyển phòng khách sạn, phòng số "+currEntity.getRoomId()+" sang phòng số "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistAdd(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingCheckin(),
                            bookingRoomDTO.getBookingCheckout());
                }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                    logger.info("Cập nhật thông tin đặt phòng trước, chuyển phòng số "+currEntity.getRoomId()+" sang phòng số "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistAdd(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingDate(),
                            bookingRoomDTO.getBookingDateOut());
                }
                if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                    logger.error("Lỗi chuyển phòng: Thời gian đặt phòng trùng với thời gian đã đặt trong hệ thống");
                    return ResultResp.serverError(new ObjectError("Exists","Chuyển phòng thất bại, Thời gian đặt phòng đã trùng so với thời gian đặt trong hệ thống, vui lòng kiểm tra lại"));
                }else {
                    if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                        //currentEntity: findById(dto)
                        BookingRoomEntity newEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                        newEntity = convertToAdd(newEntity);
                        RoomEntity newRoom = roomRepository.findById(newEntity.getRoomId()).get();
                        newEntity.setStatus(Enums.BOOKING_TYPE.DANG_DAT.value());
                        newRoom.setStatus(Enums.ROOM_TYPE.DANG_DAT_PHONG.value());
                        String oldBookRoom = "";
                        if (CommonUtils.isEqualsNullOrEmpty(currEntity.getOldBookRoom())){
                            oldBookRoom = currEntity.getBookingroomId()+"";
                        }else {
                            oldBookRoom = currEntity.getOldBookRoom()+","+currEntity.getBookingroomId();
                        }
                        newEntity.setOldBookRoom(oldBookRoom);

                        currEntity.setBookingCheckout(newEntity.getBookingCheckin());
                        RoomEntity currRoom = roomRepository.findById(currEntity.getRoomId()).get();
                        currEntity.setStatus(Enums.BOOKING_TYPE.DA_CHUYEN.value());
                        currRoom.setStatus(Enums.ROOM_TYPE.HOAT_DONG.value());

                        bookingRoomRepository.save(currEntity);
                        bookingRoomRepository.save(newEntity);
                        roomRepository.save(currRoom);
                        roomRepository.save(newRoom);

                        logger.info("Chuyển phòng thành công");
                        return ResultResp.success(new ObjectSuccess("Complete","Chuyển phòng thành công"));
                    }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                        BookingRoomEntity bookingEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                        bookingRoomRepository.save(bookingEntity);
                        logger.info("Cập nhật lịch đặt phòng thành công");
                        return ResultResp.success(new ObjectSuccess("Complete","Cập nhật thông tin đặt phòng thành công"));
                    }
                }
            }
        }
        return ResultResp.badRequest(new ObjectError("aaaa", "aaaaaaaaa"));
    }

    private BookingRoomEntity convertToAdd(BookingRoomEntity entity){
        BookingRoomEntity newEntity = new BookingRoomEntity();
        newEntity.setCustomerId(entity.getCustomerId());
        newEntity.setEmployeeId(entity.getEmployeeId());
        newEntity.setRoomId(entity.getRoomId());
        newEntity.setBookingDate(entity.getBookingDate());
        newEntity.setBookingDateOut(entity.getBookingDateOut());
        newEntity.setBookingCheckin(entity.getBookingCheckin());
        newEntity.setBookingCheckout(entity.getBookingCheckout());
        newEntity.setAdvanceAmount(entity.getAdvanceAmount());
        newEntity.setOldRoomCode(entity.getOldRoomCode());
        newEntity.setOldBookRoom(entity.getOldBookRoom());
        newEntity.setStatus(entity.getStatus());
        newEntity.setBookingType(entity.getBookingType());
        newEntity.setNote(entity.getNote());
        return newEntity;
    }

    @Override
    public DataPage<BookingRoomDTO> onSearch(BookingRoomDTO dto) {
        DataPage<BookingRoomDTO> dtoDataPage = new DataPage<>();
        dto.setPage(null != dto.getPage() ? dto.getPage().intValue() : 1);
        dto.setPageSize(null != dto.getPageSize() ? dto.getPageSize().intValue() : 10);
        List<BookingRoomDTO> list;
        try {
            list = bookingRoomCustomRepository.onSearch(dto);
            for (BookingRoomDTO bookingRoomDTO : list) {
                if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomDTO.getBookingDate())) {
                    bookingRoomDTO.setComein_timeshow(DateUtils.formatDateTime(bookingRoomDTO.getBookingDate()));
                    if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomDTO.getBookingDateOut())){
                        bookingRoomDTO.setComeout_timeshow(DateUtils.formatDateTime(bookingRoomDTO.getBookingDateOut()));
                    }
                }else {
                    bookingRoomDTO.setComein_timeshow(DateUtils.formatDateTime(bookingRoomDTO.getBookingCheckin()));
                    if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomDTO.getBookingCheckout())){
                        bookingRoomDTO.setComeout_timeshow(DateUtils.formatDateTime(bookingRoomDTO.getBookingCheckout()));
                    }
                }
                if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomDTO.getStatus())){
                    if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_DAT.value())){
                        bookingRoomDTO.setStatusName("Đã đặt");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DANG_DAT.value())){
                        bookingRoomDTO.setStatusName("Đang đặt");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_THANH_TOAN.value())){
                        bookingRoomDTO.setStatusName("Đã thanh toán");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_HUY.value())){
                        bookingRoomDTO.setStatusName("Đã hủy");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_CHUYEN.value())){
                        bookingRoomDTO.setStatusName("Đã chuyển phòng");
                    }
                }
            }
            dtoDataPage.setData(list);
        } catch (Exception e) {
            throw e;
        }
        dtoDataPage.setPageIndex(dto.getPage());
        dtoDataPage.setPageSize(dto.getPageSize());
        dtoDataPage.setDataCount(dto.getTotalRecord());
        dtoDataPage.setPageCount(dto.getTotalRecord() / dto.getPageSize());
        if (dtoDataPage.getDataCount() % dtoDataPage.getPageSize() != 0) {
            dtoDataPage.setPageCount(dtoDataPage.getPageCount() + 1);
        }
        return dtoDataPage;
    }

    @Override
    public ResultResp addService(BookingRoomDTO dto) {
        if (CommonUtils.isEqualsNullOrEmpty(dto.getBookingroomId())) {
            return ResultResp.badRequest(new ObjectError("BK001", "Lỗi không tìm thấy mã đặt phòng"));
        } else {
            List<BookingRoomServiceEntity> listBookingService = bookingRoomServiceRepository.findByBookingId(dto.getBookingroomId());
            if (!CommonUtils.isEqualsNullOrEmpty(listBookingService) && listBookingService.size() > 0) {
                bookingRoomServiceRepository.deleteAll(listBookingService);
            }
            if (!CommonUtils.isEqualsNullOrEmpty(dto.getListService()) && dto.getListService().size() > 0) {
                bookingRoomServiceRepository.saveAll(bookingRoomServiceMapper.toEntity(dto.getListService()));
            }
            return ResultResp.success("Thêm mới dịch vụ thành công");
        }
    }

    @Override
    public List<BookingRoomServiceDTO> getServiceByBookingId(Long bookingId) {
        return bookingRoomServiceMapper.toDto(bookingRoomServiceRepository.findByBookingId(bookingId));
    }

    @Override
    public ResultResp receive(Long bookingRoomId) {
        if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomId)){
            BookingRoomEntity bookingEntity = bookingRoomRepository.findById(bookingRoomId).get();
            if (!CommonUtils.isEqualsNullOrEmpty(bookingEntity.getRoomId())){
                RoomEntity roomEntity = roomRepository.findById(bookingEntity.getRoomId()).get();
                if (!roomEntity.getStatus().equals(Enums.ROOM_TYPE.HOAT_DONG.value())){
                    return ResultResp.serverError(new ObjectError("Error","Phòng chưa sẵn sàng để nhận, vui lòng kiểm tra lại"));
                }
                Date start = null;
                Date end = null;
                Date curr = new Date();
                if (!CommonUtils.isEqualsNullOrEmpty(bookingEntity.getBookingCheckin())){
                    start = bookingEntity.getBookingCheckin();
                    end = bookingEntity.getBookingCheckout();
                }else if (!CommonUtils.isEqualsNullOrEmpty(bookingEntity.getBookingDate())){
                    start = bookingEntity.getBookingDate();
                    end = bookingEntity.getBookingDateOut();
                }
                if (!curr.after(start)){
                    return ResultResp.serverError(new ObjectError("Error","Chưa đến thời gian nhận phòng, vui lòng kiểm tra lại"));
                }else if (!curr.before(end)){
                    return ResultResp.serverError(new ObjectError("Error","Phòng đã quá thời gian nhận, vui lòng hủy phòng"));
                }
                bookingEntity.setStatus(Enums.BOOKING_TYPE.DANG_DAT.value());
                bookingEntity.setBookingCheckin(bookingEntity.getBookingDate());
                bookingEntity.setBookingCheckout(bookingEntity.getBookingDateOut());
                roomEntity.setStatus(Enums.ROOM_TYPE.DANG_DAT_PHONG.value());
                bookingRoomRepository.save(bookingEntity);
                roomRepository.save(roomEntity);
                return ResultResp.success(new ObjectSuccess("Complete","Nhận phòng thành công!"));
            }else {
                return ResultResp.serverError(new ObjectError("Error","Không tồn tại số phòng đã đặt"));
            }
        }else {
            return ResultResp.serverError(new ObjectError("Error","Không tồn tại bản ghi trong hệ thống"));
        }
    }

    @Override
    public ResultResp delete(Long bookingRoomId) {
        if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomId)){
            BookingRoomEntity bookingEntity = bookingRoomRepository.findById(bookingRoomId).get();
            bookingEntity.setStatus(Enums.BOOKING_TYPE.DA_HUY.value());
            bookingRoomRepository.save(bookingEntity);
            return ResultResp.success(new ObjectSuccess("Complete","Xóa lịch đặt phòng thành công!"));
        }else {
            return ResultResp.serverError(new ObjectError("Error","Không tồn tại bản ghi trong hệ thống"));
        }
    }

    @Override
    public BookingRoomDTO getInfo(Long bookingRoomId) {
        BookingRoomEntity bookingEntity = bookingRoomRepository.findById(bookingRoomId).get();
        if (!CommonUtils.isEqualsNullOrEmpty(bookingEntity)){
            BookingRoomDTO dto = bookingRoomMapper.toDto(bookingEntity);
            RoomEntity room = roomRepository.findById(dto.getRoomId()).get();
            Long roomTypeId = room.getRoomType().longValue();
            RoomTypeEntity roomType = roomTypeRepository.findById(roomTypeId).get();
            List<BookingRoomServiceEntity> bookingService = bookingRoomServiceRepository.findByBookingId(dto.getBookingroomId());
            double priceService = 0L;
            List<BookingRoomServiceDTO> dtos=new ArrayList<>();
            if (!CommonUtils.isEqualsNullOrEmpty(bookingService)){
                for (BookingRoomServiceEntity bks : bookingService){
                    BookingRoomServiceDTO serviceDTO=new BookingRoomServiceDTO();
                    ServiceEntity serviceEntity = serviceRepository.findById(bks.getServiceId()).get();
                    priceService = priceService + (bks.getQuantity())*(serviceEntity.getPrice());
                    serviceDTO.setBookingId(bks.getBookingId());
                    serviceDTO.setServiceId(bks.getServiceId());
                    serviceDTO.setPrice(bks.getPrice());
                    serviceDTO.setQuantity(bks.getQuantity());
                    serviceDTO.setTotal(bks.getTotal());
                    serviceDTO.setBookingroomServiceId(bks.getBookingroomServiceId());
                    dtos.add(serviceDTO);
                }
            }
            dto.setListService(dtos);
            if (dto.getBookingType().equals(Enums.ADD_BOOKING_TYPE.THEO_GIO.value())){
                DateTime start = null;
                DateTime end = null;
                if (!CommonUtils.isEqualsNullOrEmpty(dto.getBookingCheckin())){
                    start = new DateTime(dto.getBookingCheckin());
                    end = new DateTime(dto.getBookingCheckout());
                }else if (!CommonUtils.isEqualsNullOrEmpty(dto.getBookingDate())){
                    start = new DateTime(dto.getBookingDate());
                    end = new DateTime(dto.getBookingDateOut());
                }
                Period p = new Period(start,end);
                int hours = p.getHours()+1;
                if (p.getMinutes() > 0){
                    hours = hours + 1;
                }
                Long price = roomType.getHourPrice();
                dto.setPrice(price);
                dto.setTotalDate(hours);
                dto.setPriceBooking(price);
                Double advanceAmount = !CommonUtils.isEqualsNullOrEmpty(dto.getAdvanceAmount())?dto.getAdvanceAmount():0D;
                Double total = price*hours+priceService-advanceAmount;
                dto.setPriceTotal(total);
            }else if (dto.getBookingType().equals(Enums.ADD_BOOKING_TYPE.THEO_NGAY.value())){
                int dates = 0;
                if (!CommonUtils.isEqualsNullOrEmpty(dto.getBookingCheckin())){
                    dates = DateUtils.getDayBetweenTwoDay(dto.getBookingCheckin(),dto.getBookingCheckout());
                }else if (!CommonUtils.isEqualsNullOrEmpty(dto.getBookingDate())){
                    dates = DateUtils.getDayBetweenTwoDay(dto.getBookingDate(),dto.getBookingDateOut());
                }
                dates = dates + 1;
                Long price = roomType.getDayPrice();
                dto.setPrice(price);
                dto.setTotalDate(dates);
                dto.setPriceBooking(price);
                Double advanceAmount = !CommonUtils.isEqualsNullOrEmpty(dto.getAdvanceAmount())?dto.getAdvanceAmount():0D;
                Double total = price*dates+priceService-advanceAmount;
                dto.setPriceTotal(total);
            }else if (dto.getBookingType().equals(Enums.ADD_BOOKING_TYPE.QUA_DEM.value())){
                Long price = roomType.getNightPrice();
                dto.setPrice(price);
                dto.setTotalDate(1);
                dto.setPriceBooking(price);
                Double advanceAmount = !CommonUtils.isEqualsNullOrEmpty(dto.getAdvanceAmount())?dto.getAdvanceAmount():0D;
                Double total = price+priceService-advanceAmount;
                dto.setPriceTotal(total);
            }
            if (!CommonUtils.isEqualsNullOrEmpty(dto.getOldBookRoom())){
                String[] listPhongCu = dto.getOldBookRoom().split(",");
                String message = "";
                RoomEntity currRoomEntity = roomRepository.findById(dto.getRoomId()).get();
                if (listPhongCu.length == 1){
                    Long idPhongCu = Long.parseLong(listPhongCu[0]);
                    BookingRoomEntity entity = bookingRoomRepository.findById(idPhongCu).get();
                    RoomEntity roomEntity = roomRepository.findById(entity.getRoomId()).get();
                    message = "Chuyển từ phòng "+roomEntity.getRoomCode()+" sang phòng "+currRoomEntity.getRoomCode();
                }else if (listPhongCu.length >= 2){
                    for (int i = 0; i < listPhongCu.length; i++){
                        Long idPhongCu = Long.parseLong(listPhongCu[i]);
                        BookingRoomEntity entity = bookingRoomRepository.findById(idPhongCu).get();
                        RoomEntity roomEntity = roomRepository.findById(entity.getRoomId()).get();
                        if (i <= listPhongCu.length - 2){
                            Long idPhongTiep = Long.parseLong(listPhongCu[i+1]);
                            BookingRoomEntity entityNext = bookingRoomRepository.findById(idPhongTiep).get();
                            RoomEntity nextRoomEntity = roomRepository.findById(entityNext.getRoomId()).get();
                            message = message +" Phòng "+roomEntity.getRoomCode()+" chuyển sang phòng "+nextRoomEntity.getRoomCode()+"\n";
                        }
                        if (i == listPhongCu.length - 1){
                            message = message +" Phòng "+roomEntity.getRoomCode()+" chuyển sang phòng "+currRoomEntity.getRoomCode();
                        }
                    }
                }
                dto.setNoteAddition(message);
                String listArray = bookingEntity.getOldBookRoom();
                List<Long> list = new ArrayList<>();
                if (listArray != null) {
                    String[] s = listArray.split(",");
                    Arrays.asList(s).forEach(s1 -> list.add(Long.valueOf(s1)));
                }
                List<BookingRoomServiceEntity> entityList = getListService(list);
                List<BookingRoomServiceDTO> dtoList=new ArrayList<>();
                entityList.forEach(entity -> {
                    BookingRoomServiceDTO serviceDTO=new BookingRoomServiceDTO();
                    serviceDTO.setBookingroomServiceId(entity.getBookingroomServiceId());
                    serviceDTO.setQuantity(entity.getQuantity());
                    serviceDTO.setPrice(entity.getPrice());
                    serviceDTO.setServiceId(entity.getServiceId());
                    serviceDTO.setBookingId(entity.getBookingId());
                    serviceDTO.setTotal(entity.getTotal());
                    dtoList.add(serviceDTO);
                });
                dto.setListServiceOld(dtoList);
            }

            return dto;
        }
        return null;
    }

    @Override
    public BookingRoomEntity getIdBookRoom(Long bookingRoomId) {
        if(bookingRoomRepository.findById(bookingRoomId).isPresent()){
            return bookingRoomRepository.findById(bookingRoomId).get();
        }
        return null;
    }



    @Override
    public List<BookingRoomEntity> getListBook(List<Long> id) {

        return bookingRoomRepository.findAllById(id);
    }


    @Override
    public List<BookingRoomServiceEntity> getListService(List<Long> id) {

        return bookingRoomServiceRepository.findList(id);
    }

    @Override
    public void addEntity(BookingRoomEntity bookingRoomEntity) {
        bookingRoomRepository.save(bookingRoomEntity);
    }
}