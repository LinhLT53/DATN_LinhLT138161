package com.thao.qlts.project.repository.jparepository;

import com.thao.qlts.project.entity.GroupPermissionUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPermissionUserRepository extends JpaRepository<GroupPermissionUserEntity, Long> {
}
