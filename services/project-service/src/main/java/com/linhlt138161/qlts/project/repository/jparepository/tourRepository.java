package com.linhlt138161.qlts.project.repository.jparepository;


import com.linhlt138161.qlts.project.entity.TourEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface tourRepository  extends JpaRepository<TourEntity , Long> {
    @Query(value = "select * from tour where id_tour=?1 and status= 1 ", nativeQuery = true)
    TourEntity findByID(Long id);
}
