package com.linhlt138161.qlts.project.repository.customreporsitory;

import com.linhlt138161.qlts.project.dto.tourDTO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository

public class tourCustomerRepository {
    private final Logger log = LogManager.getLogger(tourCustomerRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<tourDTO> searchTour(tourDTO dto){
        log.info("search Room");
        StringBuilder sql = new StringBuilder();
        sql.append("select r.id_tour,      " +
                " r.code,     " +
                "        r.name,     " +
                "        r.vehicle,     " +
                "        r.tour_type,     " +
                "        r.price,     " +
                "        r.status , r.note     " +
                " from tour r  where r.status = 1"
        );

        if (StringUtils.isNotBlank(dto.getCode())){
            sql.append("  and ( lower(r.code) LIKE :code ) ");
        }
        if (StringUtils.isNotBlank(dto.getName())){
            sql.append(" and ( lower(r.name) LIKE :name ) ");
        }


        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getCode())){
            query.setParameter("code", "%" + dto.getCode() + "%");
            queryCount.setParameter("code", "%" + dto.getCode() + "%");
        }
        if (StringUtils.isNotBlank(dto.getName())){
            query.setParameter("name", "%" + dto.getName() + "%");
            queryCount.setParameter("name", "%" + dto.getName() + "%");
        }


        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }



    private List<tourDTO> converEntytoDTO(List<Object[]> objects){
        List<tourDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                tourDTO dto = new tourDTO();
                dto.setIdtour(((BigInteger) obj[0]).longValue());
                dto.setCode((String) obj[1]);
                dto.setName((String) obj[2]);
                dto.setVehicle((String) obj[3]);
                dto.setTourtype((String) obj[4]);
                dto.setPrice((Integer) obj[5]);
                dto.setStatus((Integer) obj[6]);
                dto.setNote((String) obj[7]);
                list.add(dto);
            }
        }
        return list;
    }

}
