package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.dto.DiscountPromotionDTO;
import com.linhlt138161.qlts.project.entity.promotionRoomTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface promotionRoomTypeRepository extends JpaRepository<promotionRoomTypeEntity,Long > {
    @Query(value = "select roomType_id from promotion_roomType where promotion_id=?1 and is_active= 1 ", nativeQuery = true)
    List<Long> findByroomTypeID(Long id);

    @Query(value = "select promotion_roomType_id from promotion_roomType where roomType_id=?1 and is_active= 1 ", nativeQuery = true)
    List<Long> deleteroomID(Long id);


}
