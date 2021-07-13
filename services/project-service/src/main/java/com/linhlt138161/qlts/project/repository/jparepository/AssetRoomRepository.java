package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.AssetRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRoomRepository extends JpaRepository<AssetRoomEntity, Long> {
    @Query(value = "select asset_id from asset_room where room_id=?1 and is_active= 1 ", nativeQuery = true)
    List<Long> findByroomID(Long id);

    @Query(value = "select asset_room_id from asset_room where room_id=?1 and is_active= 1 ", nativeQuery = true)
    List<Long> deleteroomID(Long id);

}
