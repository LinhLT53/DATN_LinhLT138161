package com.linhlt138161.qlts.project.repository.customreporsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class HistoryCustomRepository {

    @Autowired
    EntityManager em;

}
