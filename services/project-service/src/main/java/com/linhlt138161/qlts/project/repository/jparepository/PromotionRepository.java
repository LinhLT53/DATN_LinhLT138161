package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.promotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PromotionRepository  extends JpaRepository<promotionEntity, Long> {
    @Query(value = "select * from promotion where promotion_code=?1 and STATUS= 1 ", nativeQuery = true)
    promotionEntity findByCode(String code);

    @Query(value = "select * from promotion where promotion_id=?1 and STATUS= 1 ", nativeQuery = true)
    promotionEntity findByID(Long id);

    @Query(value = "select * from promotion p join promotion_roomtype t on" +
            " p.promotion_id = t.promotion_id join room_type r on r.room_type_id = t.roomType_id " +
            "where p.promotion_code = ?1 and r.room_type_id = ?2 and p.status = 1 " +
            "and p.start_Date <= ?3 and p.end_Date >= ?3",nativeQuery = true)
    promotionEntity findByCodeAndRoomType(String code, Long roomType, String date);

    @Query(value = "select * from promotion p join promotion_roomtype t on" +
            " p.promotion_id = t.promotion_id join room_type r on r.room_type_id = t.roomType_id " +
            "where r.room_type_id = ?1 and p.status = 1 " +
            "and p.start_Date <= ?2 and p.end_Date >= ?2",nativeQuery = true)
    List<promotionEntity> findByRoomType(Long roomType, String date);
}
