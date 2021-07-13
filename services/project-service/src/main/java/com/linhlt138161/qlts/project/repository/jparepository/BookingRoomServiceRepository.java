package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.BookingRoomServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRoomServiceRepository extends JpaRepository<BookingRoomServiceEntity, Long> {
    @Query("select b from BookingRoomServiceEntity b where b.bookingId = ?1")
    List<BookingRoomServiceEntity> findByBookingId(Long bookingId);

    @Query("select b from BookingRoomServiceEntity b where b.bookingId in ?1")
    List<BookingRoomServiceEntity> findList(List<Long> bookingId);
}