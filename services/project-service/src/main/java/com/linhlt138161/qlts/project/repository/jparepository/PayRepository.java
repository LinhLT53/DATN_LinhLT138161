package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.PayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PayRepository extends JpaRepository<PayEntity,Long> {
    @Query(value = "select * " +
            "from pay_booking_room as p " +
            "where p.date_pay > ?1 " +
            "  and p.date_pay < ?2 ",nativeQuery = true)
    public List<PayEntity> getLisst(String start,String end);
}
