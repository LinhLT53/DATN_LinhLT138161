package com.thao.qlts.project.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name ="history")
@AllArgsConstructor
@NoArgsConstructor
//@EntityListeners(AuditingEntityListener.class)
public class HistoryEntity extends Auditable<String> {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "history_id")
    private Long historyId;

    @Column(name = "value_id")
    private Long valueId;

    @Column(name = "action")
    private Integer action;

	@Column(name = "type_screen")
    private Integer typeScreen;

    @Column(name = "content")
    private String content;

    @Column(name = "value_old")
    private String valueOld;

    @Column(name = "value_new")
    private String valueNew;

}
