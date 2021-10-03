package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.AppParamEntity;
import com.linhlt138161.qlts.project.entity.RoomEntity;
import com.linhlt138161.qlts.project.entity.RoomTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    @Query(value = "select * from room where room_code=?1 and STATUS= 1 ", nativeQuery = true)
    RoomEntity findByCode(String code);

    @Query(value = "select * from room where room_id=?1 and STATUS= 1 ", nativeQuery = true)
    RoomEntity findByID(Long id);

    @Query(value = "select * from room where STATUS != 2 ", nativeQuery = true)
    List<RoomEntity> findAllRoom();
    @Query(value = "select * from room where  STATUS != 0 ", nativeQuery = true)
    List<RoomEntity> findAlllist();

}
