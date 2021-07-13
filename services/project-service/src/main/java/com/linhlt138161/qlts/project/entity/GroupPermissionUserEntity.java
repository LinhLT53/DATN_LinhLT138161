package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "grouppermission_user")
@AllArgsConstructor
@NoArgsConstructor
public class GroupPermissionUserEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "group_permission_id")
    private Long groupPermissionId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "status")
    private int status;

    public GroupPermissionUserEntity(Long groupPermissionId, Long userId) {
        this.groupPermissionId = groupPermissionId;
        this.userId = userId;
    }
}
