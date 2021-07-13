package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.CustomerEntity;
import com.thao.qlts.project.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    @Query(value = "select * from customer", nativeQuery = true)
    List<CustomerEntity> findAllCustomer();

    @Query(value = "select * from customer where customer_id=?1 and status= 1 ", nativeQuery = true)
    CustomerEntity findByID(Long id);

}