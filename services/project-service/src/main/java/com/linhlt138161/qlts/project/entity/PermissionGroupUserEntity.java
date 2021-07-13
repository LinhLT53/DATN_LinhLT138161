package com.thao.qlts.project.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="permission_group_user")
@AllArgsConstructor
@NoArgsConstructor
public class PermissionGroupUserEntity extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "group_user_id")
    private Long groupUserId;

    @Column(name = "permission_id")
    private Long permissionId;

    @Column(name = "is_active")
    private Integer isActive;


}
