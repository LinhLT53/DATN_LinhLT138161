package com.linhlt138161.qlts.project.repository.customreporsitory;

import com.linhlt138161.qlts.project.dto.ServiceDTO;
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
public class ServiceCustomRepository {
    private final Logger log = LogManager.getLogger(RoomTypeCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<ServiceDTO> searchService(ServiceDTO dto) {
        log.info("---------------------sql get kho nhan su------------------");

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s.service_id,        " +
                "s.service_code,        " +
                "s.service_name,        " +
                "s.unit,    s.price,    " +
                "s.note,        " +
                "s.status        " +
                "FROM service s        " +
                " where 1 = 1 and s.status != -1   "
        );

        if (StringUtils.isNotBlank(dto.getServicecode())){
            sql.append("  and (( lower(s.service_code) LIKE :code ) or ( lower(s.service_name) LIKE :code ))");
        }
        if (dto.getPrice() != null){
            sql.append(" and s.price = :price ");
        }

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getServicecode())){
            query.setParameter("code", "%" + dto.getServicecode() + "%");
            queryCount.setParameter("code", "%" + dto.getServicecode() + "%");
        }
        if (dto.getPrice() != null){
            query.setParameter("price", dto.getPrice());
            queryCount.setParameter("price", dto.getPrice());
        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }

    private List<ServiceDTO> converEntytoDTO(List<Object[]> objects) {
        List<ServiceDTO> list = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                ServiceDTO dto = new ServiceDTO();
                dto.setServiceId(((BigInteger) obj[0]).longValue());
                dto.setServicecode((String) obj[1]);
                dto.setServicename((String) obj[2]);
                dto.setUnit((String) obj[3]);
                dto.setPrice((Double) obj[4]);
                dto.setNote((String) obj[5]);
                dto.setStatus((Integer) obj[6]);
                list.add(dto);
            }
        }
        return list;
    }
}


