package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.DiscountPromotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountPromotionRepository extends JpaRepository<DiscountPromotionEntity, Long> {
}
