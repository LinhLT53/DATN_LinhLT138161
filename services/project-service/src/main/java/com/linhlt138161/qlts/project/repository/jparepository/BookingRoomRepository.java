package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.BookingRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoomEntity, Long> {
    @Query("select b from BookingRoomEntity b join RoomEntity r on b.roomId = r.roomId " +
            " where b.roomId = ?1 and b.status in (1,2) and r.status <> 2 " +
            " and ((?2 between b.bookingCheckin and b.bookingCheckout) or " +
            " (?2 between b.bookingDate and b.bookingDateOut) or " +
            " (?3 between b.bookingCheckin and b.bookingCheckout) or " +
            " (?3 between b.bookingDate and b.bookingDateOut) or " +
            " (?2 <= b.bookingCheckin and ?3 >= b.bookingCheckout) or " +
            " (?2 <= b.bookingDate and ?3 >= b.bookingDateOut))")
    List<BookingRoomEntity> checkExistAdd(Long roomId, Date dateIn, Date dateOut);

    @Query("select b from BookingRoomEntity b join RoomEntity r on b.roomId = r.roomId " +
            " where b.roomId = ?1 and b.bookingroomId <> ?4 and b.status in (1,2) and r.status <> 2 " +
            " and ((?2 between b.bookingCheckin and b.bookingCheckout) or " +
            " (?2 between b.bookingDate and b.bookingDateOut) or " +
            " (?3 between b.bookingCheckin and b.bookingCheckout) or " +
            " (?3 between b.bookingDate and b.bookingDateOut) or " +
            " (?2 <= b.bookingCheckin and ?3 >= b.bookingCheckout) or " +
            " (?2 <= b.bookingDate and ?3 >= b.bookingDateOut))")
    List<BookingRoomEntity> checkExistUpdate(Long roomId, Date dateIn, Date dateOut, Long bookingRoomId);

    @Query("select b from BookingRoomEntity b where b.roomId = ?1 and b.status = 2")
    BookingRoomEntity getByRoomBooking(Long roomId,Date date);
}
