package com.thao.qlts.project.repository.customreporsitory;

import com.thao.qlts.project.dto.CustomerDTO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerRepositoryy {
    private final Logger log = LogManager.getLogger(RoomCustomRepository.class);

    @Autowired
    private EntityManager em;

    public List<CustomerDTO> searchCustomer(CustomerDTO dto){
        log.info("search Room");
        StringBuilder sql = new StringBuilder();
        sql.append(" select c.customer_id, c.address, c.cmt, " +
                "c.email, c.fullname, c.phone_number," +
                " c.status  " +
                "from customer c  where  1 = 1 and c.status = 1 "
        );

        if (StringUtils.isNotBlank(dto.getFullname())){
            sql.append(" and lower(c.fullname) like lower( :fullname)  or lower(c.email) like lower( :fullname)  ");
        }
        if (dto.getPhoneNumber() != null){
            sql.append(" and lower(c.phone_number) like :phoneNumber  ");
        }

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getFullname())){
            query.setParameter("fullname", "%" + dto.getFullname() + "%");
            queryCount.setParameter("fullname", "%" + dto.getPhoneNumber() + "%");
        }
        if (dto.getPhoneNumber() != null){
            query.setParameter("phoneNumber","%"+ dto.getPhoneNumber()+"%");
            queryCount.setParameter("phoneNumber","%" + dto.getPhoneNumber() + "%");
        }

        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }
     public  List<CustomerDTO> converEntytoDTO(  List<Object[]> objects){
        List<CustomerDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)){
            for (Object[] entity: objects){
                CustomerDTO dto = new CustomerDTO();
                dto.setCustomerId(((BigInteger) entity[0]).longValue());
                dto.setAddress((String) entity[1]);
                dto.setCmt((String) entity[2]);
                dto.setEmail((String) entity[3]);
                dto.setFullname((String) entity[4]);
                dto.setPhoneNumber((String) entity[5]);
                dto.setStatus((Integer) entity[6]);
                list.add(dto) ;
            }
        }

        return list;
     }
}
