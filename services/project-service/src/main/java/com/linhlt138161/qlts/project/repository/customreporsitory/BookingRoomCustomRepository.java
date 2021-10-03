package com.linhlt138161.qlts.project.repository.customreporsitory;

import com.linhlt138161.qlts.project.dto.BookingRoomDTO;
import com.linhlt138161.qlts.project.dto.RoomDTO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class BookingRoomCustomRepository {
    private final Logger log = LogManager.getLogger(BookingRoomCustomRepository.class);
    @Autowired
    private EntityManager em;

    public List<BookingRoomDTO> onSearch(BookingRoomDTO dto){
        StringBuilder sql = new StringBuilder();
        sql.append("select b.booking_room_id, b.booking_checkin, b.booking_checkout, " +
                "b.booking_date, b.booking_date_out, c.fullname, r.room_name, " +
                "rt.name, ap.par_name, b.status " +
                "from booking_room b " +
                "join room r on b.room_id = r.room_id " +
                "join room_type rt on r.room_type = rt.room_type_id " +
                "join app_params ap on r.floor_number = ap.par_code " +
                "join customer c on b.custormer_id = c.customer_id " +
                "where 1=1 and b.status != 4 "
        );
        if (null != dto.getRoomId()){
            sql.append(" and r.room_id = :roomId ");
        }
        if (dto.getStatus() != null){
            sql.append(" and b.status = :status ");
        }
        sql.append(" group by booking_room_id  order by b.booking_room_id desc  ");

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (null != dto.getRoomId()){
            query.setParameter("roomId", dto.getRoomId());
            queryCount.setParameter("roomId", dto.getRoomId());
        }
        if (dto.getStatus() != null){
            query.setParameter("status", dto.getStatus());
            queryCount.setParameter("status", dto.getStatus());
        }
        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }
        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }

    private List<BookingRoomDTO> converEntytoDTO(List<Object[]> objects){
        List<BookingRoomDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                BookingRoomDTO bookingRoomDTO = new BookingRoomDTO();
                bookingRoomDTO.setBookingroomId(((BigInteger) obj[0]).longValue());
                bookingRoomDTO.setBookingCheckin((Date) obj[1]);
                bookingRoomDTO.setBookingCheckout((Date) obj[2]);
                bookingRoomDTO.setBookingDate((Date) obj[3]);
                bookingRoomDTO.setBookingDateOut((Date) obj[4]);
                bookingRoomDTO.setCustomerName((String) obj[5]);
                bookingRoomDTO.setRoomName((String) obj[6]);
                bookingRoomDTO.setRoomTypeName((String) obj[7]);
                bookingRoomDTO.setFloorName((String) obj[8]);
                bookingRoomDTO.setStatus((Integer) obj[9]);
                list.add(bookingRoomDTO);
            }
        }
        return list;
    }
}
