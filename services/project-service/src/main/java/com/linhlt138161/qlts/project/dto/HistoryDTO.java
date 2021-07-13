package com.thao.qlts.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class HistoryDTO extends AuditingDTO<String>{
    private Long historyId;

    private Long valueId;

    private Integer action;

    private Integer typeScreen;

    private String content;

    private String valueOld;

    private String valueNew;
}
