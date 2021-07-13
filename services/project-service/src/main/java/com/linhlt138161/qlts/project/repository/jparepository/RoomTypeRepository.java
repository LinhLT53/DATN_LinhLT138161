package com.linhlt138161.qlts.project.repository.jparepository;

import com.linhlt138161.qlts.project.entity.RoomTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomTypeEntity, Long> {
    @Query(value = "select * from room_type where code=?1 and status= 1 ", nativeQuery = true)
    RoomTypeEntity findByCode(String code);

    @Query(value = "select * from room_type where room_type_id=?1 and status= 1 ", nativeQuery = true)
    RoomTypeEntity findByID(Long id);

    @Query(value = "select * from room_type where  STATUS= 1 ", nativeQuery = true)
    List<RoomTypeEntity> findAll();

    @Query(value = "select room_type.* from room_type inner join room where room.room_id=?1", nativeQuery = true)
    List<RoomTypeEntity> getType(Long id);

}
