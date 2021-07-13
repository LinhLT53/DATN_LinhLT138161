package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {
}
