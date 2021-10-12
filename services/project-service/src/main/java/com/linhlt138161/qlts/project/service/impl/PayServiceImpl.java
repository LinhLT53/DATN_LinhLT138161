package com.linhlt138161.qlts.project.service.impl;

import com.linhlt138161.qlts.project.dto.BookingRoomServiceDTO;
import com.linhlt138161.qlts.project.dto.ChartDto;
import com.linhlt138161.qlts.project.dto.PayDto;
import com.linhlt138161.qlts.project.dto.TimeBookDTO;
import com.linhlt138161.qlts.project.entity.*;
import com.linhlt138161.qlts.project.repository.jparepository.*;
import com.linhlt138161.qlts.project.service.BookingRoomService;
import com.linhlt138161.qlts.project.service.PayService;
import common.Enums;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class PayServiceImpl implements PayService {
    @Autowired
    private BookingRoomService bookingRoomService;

    @Autowired
    private PayRepository payRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private DiscountPromotionRepository discountPromotionRepository;


    @Autowired
    private HumanResourcesRepository humanResourcesRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public PayDto getServiceRoom(Long bookRoomId) {
        PayDto payDto = new PayDto();
        BookingRoomEntity bookingRoomEntity = bookingRoomService.getIdBookRoom(bookRoomId);
        if (bookingRoomEntity.getEmployeeId() != null && bookingRoomEntity.getEmployeeId() != 0) {
            if (humanResourcesRepository.findById(bookingRoomEntity.getEmployeeId()).isPresent()) {
                String name = humanResourcesRepository.findById(bookingRoomEntity.getEmployeeId()).get().getFullName();
                payDto.setNameEmployee(name);
            }
        }
        if (bookingRoomEntity.getCustomerId() != null && bookingRoomEntity.getCustomerId() != 0) {
            if (customerRepository.findById(bookingRoomEntity.getCustomerId()).isPresent()) {
                String name = customerRepository.findById(bookingRoomEntity.getCustomerId()).get().getFullname();
                payDto.setCustomName(name);
            }
        }


        payDto.setCustomId(bookingRoomEntity.getCustomerId());
        String listArray = bookingRoomEntity.getOldBookRoom();
        List<Long> list = new ArrayList<>();
        list.add(bookRoomId);
        if (listArray != null) {
            String[] s = listArray.split(",");
            Arrays.asList(s).forEach(s1 -> list.add(Long.valueOf(s1)));
        }

        payDto.setBookingCheckin(bookingRoomEntity.getBookingCheckin());
        payDto.setBookingCheckout(bookingRoomEntity.getBookingCheckout());
        payDto.setBookingDate(bookingRoomEntity.getBookingDate());
        payDto.setBookingDateOut(bookingRoomEntity.getBookingDateOut());
        payDto.setEmployeeId(bookingRoomEntity.getEmployeeId());

        //list
        List<TimeBookDTO> timeBookDTOS = new ArrayList<>();
        List<BookingRoomEntity> entities = bookingRoomService.getListBook(list);

        entities.forEach(bookingRoomEntity1 -> {
            TimeBookDTO timeBookDTO = new TimeBookDTO();
            timeBookDTO.setStart(bookingRoomEntity1.getBookingCheckin());
            timeBookDTO.setEnd(bookingRoomEntity1.getBookingCheckout());
//            long time = bookingRoomEntity1.getBookingCheckout().getTime() - bookingRoomEntity1.getBookingCheckin().getTime();
            long time = bookingRoomEntity1.getBookingCheckout().getDay() - bookingRoomEntity1.getBookingCheckin().getDay();

            timeBookDTO.setIdRoom(bookingRoomEntity1.getRoomId());
            timeBookDTO.setIdBookRoom(bookingRoomEntity1.getBookingroomId());
            timeBookDTO.setTypeBook(bookingRoomEntity1.getBookingType());
            double aDouble  = Math.ceil((double) time);
            timeBookDTO.setNameTypeBook("Theo ngày");

//            switch (bookingRoomEntity1.getBookingType()) {
//                case 1:
//                    timeBookDTO.setNameTypeBook("Theo giờ");
//                    aDouble = Math.ceil((double) time * 100 / (3600000)) / 100;
//                    break;
//                case 2:
//                    timeBookDTO.setNameTypeBook("Theo ngày");
//                    aDouble = Math.ceil((double) time * 100 / (86400000)) / 100;
//                    break;
//                default:
//                    timeBookDTO.setNameTypeBook("Qua đêm");
//                    aDouble = Math.ceil((double) time * 100 / (43200000)) / 100;
//                    break;
//            }
            if (roomTypeRepository.getType(bookingRoomEntity1.getRoomId()).size() > 0) {
                RoomTypeEntity roomTypeEntity = roomTypeRepository.getType(bookingRoomEntity1.getRoomId()).get(0);
                timeBookDTO.setDayPrice(roomTypeEntity.getDayPrice());
                timeBookDTO.setHourPrice(roomTypeEntity.getHourPrice());
                timeBookDTO.setNightPrice(roomTypeEntity.getNightPrice());
                timeBookDTO.setNameType(roomTypeEntity.getCode());

            }
            if (roomRepository.findById(bookingRoomEntity1.getRoomId()).isPresent()) {
                RoomEntity roomEntity = roomRepository.findById(bookingRoomEntity1.getRoomId()).get();
                RoomTypeEntity roomTypeEntity = roomTypeRepository.findByID(roomEntity.getRoomType().longValue());
                timeBookDTO.setDayPrice(roomEntity.getPrice());
                timeBookDTO.setNameType(roomTypeEntity.getName());
                timeBookDTO.setNameRoom(roomEntity.getRoomName());
            }
            timeBookDTO.setUnit(aDouble);
            timeBookDTOS.add(timeBookDTO);
        });

        List<BookingRoomServiceDTO> dtos = new ArrayList<>();
        List<BookingRoomServiceEntity> entityList = bookingRoomService.getListService(list);
        entityList.forEach(entity -> {
            BookingRoomServiceDTO dto = new BookingRoomServiceDTO();
            dto.setQuantity(entity.getQuantity());
            dto.setPrice(entity.getPrice());
            dto.setServiceId(entity.getServiceId());
            dto.setBookingId(entity.getBookingId());
            if (serviceRepository.findById(entity.getServiceId()).isPresent()) {
                ServiceEntity serviceEntity = serviceRepository.findById(entity.getServiceId()).get();
                dto.setServiceName(serviceEntity.getServicename());
            }
            dtos.add(dto);
        });
        payDto.setListService(dtos);
        payDto.setTimeBookDTOList(timeBookDTOS);
        payDto.setIdBooking(bookRoomId);


        if (payRepository.findById(bookRoomId).isPresent()) {
            PayEntity dto = payRepository.findById(bookRoomId).get();
            payDto.setIdBooking(dto.getIdBookingRoom());
            payDto.setAdvanceManey(dto.getAdvanceManey());
            payDto.setPayChang(dto.getPayChang());
            payDto.setSumBookRoom(dto.getSumBookRoom());
            payDto.setDiscountId(dto.getIdDiscount());
            payDto.setDatePay(dto.getDatePay());
            if (discountPromotionRepository.findById(dto.getIdDiscount()).isPresent()) {
                DiscountPromotionEntity promotionEntity = discountPromotionRepository.findById(dto.getIdDiscount()).get();
                payDto.setCodeDiscount(promotionEntity.getCode());
            }
        }

        return payDto;
    }

    @Override
    public boolean billBookroom(PayDto payDto) {

        BookingRoomEntity bookingRoomEntity = bookingRoomService.getIdBookRoom(payDto.getIdBooking());
        bookingRoomEntity.setStatus(3);
        RoomEntity roomEntity = new RoomEntity();
        if (roomRepository.findById(bookingRoomEntity.getRoomId()).isPresent()) {
            roomEntity = roomRepository.findById(bookingRoomEntity.getRoomId()).get();
            roomEntity.setStatus(Enums.ROOM_TYPE.HOAT_DONG.value());

        }
        PayEntity payEntity = new PayEntity();
        Long bookRoomId = payDto.getIdBooking();
        payEntity.setIdBookingRoom(bookRoomId);
        payEntity.setAdvanceManey(payDto.getAdvanceManey());
        payEntity.setPayChang(payDto.getPayChang());
        payEntity.setSumBookRoom(payDto.getSumBookRoom());
        payEntity.setIdDiscount(payDto.getIdDiscount());
        payEntity.setDatePay(new Date());
        payEntity.setPayService(payDto.getPayService());
        payEntity.setPayBook(payDto.getPayBook());
        try {
            roomRepository.save(roomEntity);
            bookingRoomService.addEntity(bookingRoomEntity);
            payRepository.save(payEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<ChartDto> getList(List<Integer> quy, Integer nam) {
        List<ChartDto> list = new ArrayList<>();
       List<Integer> month=new ArrayList<>();
       if (quy.size() != 0){
           quy.forEach(integer -> {
               month.add((integer-1)*3+1);
               month.add((integer-1)*3+2);
               month.add((integer-1)*3+3);
           });
       }else{
           month.add(1);
           month.add(2);
           month.add(3);
           month.add(4);
           month.add(5);
           month.add(6);
           month.add(7);
           month.add(8);
           month.add(9);
           month.add(10);
           month.add(11);
           month.add(12);
       }


        for (Integer i:month) {

            ChartDto dto = new ChartDto();
            dto.setMonth("Tháng " + i);
            String start = nam.toString() + "/" + i + "/01";
//            1 ,3,5,7,8,10,12
            String end = "";
            switch (i){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                     end = nam.toString() + "/" + i + "/31";
                    break;
                // các tháng 4, 6, 9 và 11 có 30 ngày
                case 4:
                case 6:
                case 9:
                case 11:
                     end = nam.toString() + "/" + i + "/30";
                    break;

                // Riêng tháng 2 nếu là năm nhuận thì có 29 ngày, còn không thì có 28 ngày.
                case 2:
                    if ((nam % 4 == 0 && nam % 100 != 0) || (nam % 400 == 0)) {
                        end = nam.toString() + "/" + i + "/29";
                    } else {
                        end = nam.toString() + "/" + i + "/28";
                    }
                    break;
            }

            List<PayEntity> entities = payRepository.getLisst(start, end );
            entities.forEach(payEntity -> {
                Long sumbook = payEntity.getPayBook() == null ? 0L : payEntity.getPayBook();
                dto.setSumbook(dto.getSumbook() == null ? 0L : dto.getSumbook() + sumbook);
                Long sumService = payEntity.getPayService() == null ? 0L : payEntity.getPayService();
                dto.setSumService(dto.getSumService() == null ? 0L : dto.getSumService() + sumService);
                Long sum = payEntity.getSumBookRoom() == null ? 0L : payEntity.getSumBookRoom();
                dto.setSum(dto.getSum() == null ? 0L : dto.getSum() + sum);

            });
            list.add(dto);
//            for (PayEntity payEntity: entities){
//                Long sumbook = payEntity.getPayBook() == null ? 0L : payEntity.getPayBook();
//                dto.setSumbook(dto.getSumbook() == null ? 0L : dto.getSumbook() + sumbook);
//                Long sumService = payEntity.getPayService() == null ? 0L : payEntity.getPayService();
//                dto.setSumService(dto.getSumService() == null ? 0L : dto.getSumService() + sumService);
//                Long sum = payEntity.getSumBookRoom() == null ? 0L : payEntity.getSumBookRoom();
//                dto.setSum(dto.getSum() == null ? 0L : dto.getSum() + sum);
//            }
//            list.add(dto);
        }

        return list;
    }
}
