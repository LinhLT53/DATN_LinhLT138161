package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.BookingRoomDTO;
import com.linhlt138161.qlts.project.dto.BookingRoomServiceDTO;
import com.linhlt138161.qlts.project.dto.DataPage;
import com.linhlt138161.qlts.project.entity.*;
import com.linhlt138161.qlts.project.repository.customreporsitory.BookingRoomCustomRepository;
import com.linhlt138161.qlts.project.repository.jparepository.*;
import com.linhlt138161.qlts.project.service.BookingRoomService;
import com.linhlt138161.qlts.project.service.mapper.BookingRoomMapper;
import com.linhlt138161.qlts.project.service.mapper.BookingRoomServiceMapper;
import common.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import sun.util.resources.LocaleData;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

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
            logger.info("Th??m m???i l???ch ?????t ph??ng kh??ch s???n");
            if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                bookingRoomDTO.setBookingDate(bookingRoomDTO.getBookingCheckin());
                bookingRoomDTO.setBookingDateOut(bookingRoomDTO.getBookingCheckout());
                logger.info("?????t ph??ng l???, ph??ng s??? "+bookingRoomDTO.getRoomId());
                listEntity = bookingRoomRepository.checkExistAdd(
                        bookingRoomDTO.getRoomId(),
                        bookingRoomDTO.getBookingCheckin(),
                        bookingRoomDTO.getBookingCheckout());
            }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                logger.info("?????t ph??ng tr?????c, ph??ng s??? "+bookingRoomDTO.getRoomId());
                listEntity = bookingRoomRepository.checkExistAdd(
                        bookingRoomDTO.getRoomId(),
                        bookingRoomDTO.getBookingDate(),
                        bookingRoomDTO.getBookingDateOut());
            }
            if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                logger.error("L???i ?????t ph??ng: Th???i gian ?????t ph??ng tr??ng v???i th???i gian ???? ?????t trong h??? th???ng");
                return ResultResp.serverError(new ObjectError("Exists","?????t ph??ng th???t b???i, Th???i gian ?????t ph??ng ???? tr??ng so v???i th???i gian ?????t trong h??? th???ng, vui l??ng ki???m tra l???i"));
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
                logger.info("Th??m m???i l???ch ?????t ph??ng th??nh c??ng");
                return ResultResp.success(new ObjectSuccess("Complete","?????t ph??ng th??nh c??ng"));
            }
        }else {
            BookingRoomEntity currEntity = bookingRoomRepository.findById(bookingRoomDTO.getBookingroomId()).get();
            if (currEntity.getRoomId().equals(bookingRoomDTO.getRoomId())){
                logger.info("C???p nh???t l???ch ?????t ph??ng kh??ch s???n");
                if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                    logger.info("C???p nh???t l???ch ?????t ph??ng l???, ph??ng s??? "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistUpdate(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingCheckin(),
                            bookingRoomDTO.getBookingCheckout(),
                            bookingRoomDTO.getBookingroomId());
                }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                    logger.info("C???p nh???t l???ch ?????t ph??ng tr?????c, ph??ng s??? "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistUpdate(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingDate(),
                            bookingRoomDTO.getBookingDateOut(),
                            bookingRoomDTO.getBookingroomId());
                }
                if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                    logger.error("L???i c???p nh???t: Th???i gian ?????t ph??ng tr??ng v???i th???i gian ???? ?????t trong h??? th???ng");
                    return ResultResp.serverError(new ObjectError("Exists","C???p nh???t th???t b???i, Th???i gian ?????t ph??ng ???? tr??ng so v???i th???i gian ?????t trong h??? th???ng, vui l??ng ki???m tra l???i"));
                }else {
                    BookingRoomEntity bookingEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                    bookingRoomRepository.save(bookingEntity);
                    logger.info("C???p nh???t l???ch ?????t ph??ng th??nh c??ng");
                    return ResultResp.success(new ObjectSuccess("Complete","C???p nh???t ?????t ph??ng th??nh c??ng"));
                }
            }else {
                logger.info("Chuy???n ph??ng kh??ch s???n");
                if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_CURRENT)){
                    logger.info("Chuy???n ph??ng kh??ch s???n, ph??ng s??? "+currEntity.getRoomId()+" sang ph??ng s??? "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistAdd(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingCheckin(),
                            bookingRoomDTO.getBookingCheckout());
                }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                    logger.info("C???p nh???t th??ng tin ?????t ph??ng tr?????c, chuy???n ph??ng s??? "+currEntity.getRoomId()+" sang ph??ng s??? "+bookingRoomDTO.getRoomId());
                    listEntity = bookingRoomRepository.checkExistAdd(
                            bookingRoomDTO.getRoomId(),
                            bookingRoomDTO.getBookingDate(),
                            bookingRoomDTO.getBookingDateOut());
                }
                if (!CommonUtils.isEqualsNullOrEmpty(listEntity) && listEntity.size() > 0){
                    logger.error("L???i chuy???n ph??ng: Th???i gian ?????t ph??ng tr??ng v???i th???i gian ???? ?????t trong h??? th???ng");
                    return ResultResp.serverError(new ObjectError("Exists","Chuy???n ph??ng th???t b???i, Th???i gian ?????t ph??ng ???? tr??ng so v???i th???i gian ?????t trong h??? th???ng, vui l??ng ki???m tra l???i"));
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

                        logger.info("Chuy???n ph??ng th??nh c??ng");
                        return ResultResp.success(new ObjectSuccess("Complete","Chuy???n ph??ng th??nh c??ng"));
                    }else if (bookingRoomDTO.getBookType().equals(Constants.BOOKING_TYPE_FUTURE)){
                        BookingRoomEntity bookingEntity = bookingRoomMapper.toEntity(bookingRoomDTO);
                        bookingRoomRepository.save(bookingEntity);
                        logger.info("C???p nh???t l???ch ?????t ph??ng th??nh c??ng");
                        return ResultResp.success(new ObjectSuccess("Complete","C???p nh???t th??ng tin ?????t ph??ng th??nh c??ng"));
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
                        bookingRoomDTO.setStatusName("???? ?????t");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DANG_DAT.value())){
                        bookingRoomDTO.setStatusName("??ang ?????t");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_THANH_TOAN.value())){
                        bookingRoomDTO.setStatusName("???? thanh to??n");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_HUY.value())){
                        bookingRoomDTO.setStatusName("???? h???y");
                    }else if (bookingRoomDTO.getStatus().equals(Enums.BOOKING_TYPE.DA_CHUYEN.value())){
                        bookingRoomDTO.setStatusName("???? chuy???n ph??ng");
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

    @Scheduled( initialDelay = 3 * 1000, fixedDelay = 6000 * 1000)
    public void showTime() {
        Date curr = new Date();

        BookingRoomDTO dto = new BookingRoomDTO();
        List<BookingRoomDTO> list;
        list = bookingRoomCustomRepository.onSearch(dto);
        list.forEach((item) ->{
            Date start = null;
            Date end = null;
            if (!CommonUtils.isEqualsNullOrEmpty(item.getBookingCheckin())){
                start = item.getBookingCheckin();
                end = item.getBookingCheckout();
            }else if (!CommonUtils.isEqualsNullOrEmpty(item.getBookingDate())){
                start = item.getBookingDate();
                end = item.getBookingDateOut();
            }
            Long st = start.getTime() + (30 * 60 * 1000);
            start = new Date(st);
            if (curr.after(start) && item.getStatus() == 1){
                // qua han 30p tu dong huy phong
                delete(item.getBookingroomId());
            }
        });

    }

    @Override
    public ResultResp addService(BookingRoomDTO dto) {
        if (CommonUtils.isEqualsNullOrEmpty(dto.getBookingroomId())) {
            return ResultResp.badRequest(new ObjectError("BK001", "L???i kh??ng t??m th???y m?? ?????t ph??ng"));
        } else {
            List<BookingRoomServiceEntity> listBookingService = bookingRoomServiceRepository.findByBookingId(dto.getBookingroomId());
            if (!CommonUtils.isEqualsNullOrEmpty(listBookingService) && listBookingService.size() > 0) {
                bookingRoomServiceRepository.deleteAll(listBookingService);
            }
            if (!CommonUtils.isEqualsNullOrEmpty(dto.getListService()) && dto.getListService().size() > 0) {
                bookingRoomServiceRepository.saveAll(bookingRoomServiceMapper.toEntity(dto.getListService()));
            }
            return ResultResp.success("Th??m m???i d???ch v??? th??nh c??ng");
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
                    return ResultResp.serverError(new ObjectError("Error","Ph??ng ch??a s???n s??ng ????? nh???n, vui l??ng ki???m tra l???i"));
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
                Long st = start.getTime() -(30 * 60 * 1000);
                 start = new Date(st);
                if (!curr.after(start)){
                    return ResultResp.serverError(new ObjectError("Error","Ch??a ?????n th???i gian nh???n ph??ng, vui l??ng ki???m tra l???i"));
                }else if (!curr.before(end)){
                    return ResultResp.serverError(new ObjectError("Error","Ph??ng ???? qu?? th???i gian nh???n, vui l??ng h???y ph??ng"));
                }
                bookingEntity.setStatus(Enums.BOOKING_TYPE.DANG_DAT.value());
                bookingEntity.setBookingCheckin(bookingEntity.getBookingDate());
                bookingEntity.setBookingCheckout(bookingEntity.getBookingDateOut());
                roomEntity.setStatus(Enums.ROOM_TYPE.DANG_DAT_PHONG.value());
                bookingRoomRepository.save(bookingEntity);
                roomRepository.save(roomEntity);
                return ResultResp.success(new ObjectSuccess("Complete","Nh???n ph??ng th??nh c??ng!"));
            }else {
                return ResultResp.serverError(new ObjectError("Error","Kh??ng t???n t???i s??? ph??ng ???? ?????t"));
            }
        }else {
            return ResultResp.serverError(new ObjectError("Error","Kh??ng t???n t???i b???n ghi trong h??? th???ng"));
        }
    }

    @Override
    public ResultResp delete(Long bookingRoomId) {
        if (!CommonUtils.isEqualsNullOrEmpty(bookingRoomId)){
            BookingRoomEntity bookingEntity = bookingRoomRepository.findById(bookingRoomId).get();
            bookingEntity.setStatus(Enums.BOOKING_TYPE.DA_HUY.value());
            bookingRoomRepository.save(bookingEntity);
            return ResultResp.success(new ObjectSuccess("Complete","X??a l???ch ?????t ph??ng th??nh c??ng!"));
        }else {
            return ResultResp.serverError(new ObjectError("Error","Kh??ng t???n t???i b???n ghi trong h??? th???ng"));
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
            dto.setPriceService(priceService);
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
                Long price = room.getPrice();
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
                    message = "Chuy???n t??? ph??ng "+roomEntity.getRoomCode()+" sang ph??ng "+currRoomEntity.getRoomCode();
                }else if (listPhongCu.length >= 2){
                    for (int i = 0; i < listPhongCu.length; i++){
                        Long idPhongCu = Long.parseLong(listPhongCu[i]);
                        BookingRoomEntity entity = bookingRoomRepository.findById(idPhongCu).get();
                        RoomEntity roomEntity = roomRepository.findById(entity.getRoomId()).get();
                        if (i <= listPhongCu.length - 2){
                            Long idPhongTiep = Long.parseLong(listPhongCu[i+1]);
                            BookingRoomEntity entityNext = bookingRoomRepository.findById(idPhongTiep).get();
                            RoomEntity nextRoomEntity = roomRepository.findById(entityNext.getRoomId()).get();
                            message = message +" Ph??ng "+roomEntity.getRoomCode()+" chuy???n sang ph??ng "+nextRoomEntity.getRoomCode()+"\n";
                        }
                        if (i == listPhongCu.length - 1){
                            message = message +" Ph??ng "+roomEntity.getRoomCode()+" chuy???n sang ph??ng "+currRoomEntity.getRoomCode();
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
