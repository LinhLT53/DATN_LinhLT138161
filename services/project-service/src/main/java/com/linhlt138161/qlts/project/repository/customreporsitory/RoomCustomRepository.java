package com.linhlt138161.qlts.project.repository.customreporsitory;


import com.linhlt138161.qlts.project.dto.RoomDTO;
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
public class RoomCustomRepository {
    private final Logger log = LogManager.getLogger(RoomCustomRepository.class);
    @Value("${valueDB}")
    private String valueDb;
    @Autowired
    private EntityManager em;

    public List<RoomDTO> searchRoom(RoomDTO dto){
        log.info("search Room");
        StringBuilder sql = new StringBuilder();
        sql.append("select r.room_id,          " +
                "                r.room_code,         " +
                "                       r.room_name,         " +
                "                       r.floor_number,         " +
                "                       r.max_number,         " +
                "                       r.note,         " +
                "                       rt.name , p.par_name,    " +
                "                       hr.full_name,    " +
                "                       r.price    " +
                "                from room r left join app_params p on r.floor_number = p.par_code     " +
                "                left join room_type rt on r.room_type = rt.room_type_id    " +
                "                left join human_resources hr on hr.human_resource_id = r.humanRecourcesId    " +
                "                where 1 = 1 and r.status != 0     "
        );
//        where 1 = 1 and r.status != 0
        if (StringUtils.isNotBlank(dto.getRoomCode())){
            sql.append("  and (( lower(r.room_code) LIKE :roomCode ) or ( lower(r.room_name) LIKE :roomCode ))");
        }
        if (dto.getRoomType() != null){
            sql.append(" and r.room_type = :roomType ");
        }
        sql.append(" order by r.room_id desc ");

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (StringUtils.isNotBlank(dto.getRoomCode())){
            query.setParameter("roomCode", "%" + dto.getRoomCode() + "%");
            queryCount.setParameter("roomCode", "%" + dto.getRoomCode() + "%");
        }
        if (dto.getRoomType() != null){
            query.setParameter("roomType", dto.getRoomType());
            queryCount.setParameter("roomType", dto.getRoomType());
        }


        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }

        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO(objectList);
    }

    public List<RoomDTO> onSearch(RoomDTO dto){
        StringBuilder sql = new StringBuilder();
        sql.append("select r.room_id, r.room_code, r.room_name," +
                "p.par_name, r.max_number, r.note, r.room_type, t.name, r.status, r.price  " +
                "from room r inner join app_params p on r.floor_number = p.par_code " +
                " inner join room_type t on r.room_type = t.room_type_id " +
                " where 1 = 1 and r.status != 0 " +
                " and p.par_type = 'floor'"
        );
//        where 1 = 1 and r.status != 0
        if (null != dto.getRoomType()){
            sql.append(" and t.room_type_id = :roomType ");
        }
        if (dto.getFloorNumber() != null){
            sql.append(" and p.par_code = :parCode ");
        }
        if (dto.getStatus() != null){
            sql.append(" and r.status = :status ");
        }
        if (dto.getRoomCode() != null && dto.getRoomCode() != ""){
            sql.append("  and (( lower(r.room_code) LIKE :roomCode ) or ( lower(r.room_name) LIKE :roomCode )) ");
        }
        sql.append(" order by r.room_id desc ");

        Query query = em.createNativeQuery(sql.toString());
        Query queryCount = em.createNativeQuery(sql.toString());
        if (null != dto.getRoomType()){
            query.setParameter("roomType", dto.getRoomType());
            queryCount.setParameter("roomType", dto.getRoomType());
        }
        if (dto.getFloorNumber() != null){
            query.setParameter("parCode", dto.getFloorNumber());
            queryCount.setParameter("parCode", dto.getFloorNumber());
        }
        if (dto.getStatus() != null){
            query.setParameter("status", dto.getStatus());
            queryCount.setParameter("status", dto.getStatus());
        }
        if (dto.getRoomCode() != null && dto.getRoomCode() != ""){
            query.setParameter("roomCode", dto.getRoomCode());
            queryCount.setParameter("roomCode", dto.getRoomCode());
        }
        if (dto.getPage() != null && dto.getPageSize() != null) {
            query.setFirstResult((dto.getPage().intValue() - 1) * dto.getPageSize().intValue());
            query.setMaxResults(dto.getPageSize().intValue());
            dto.setTotalRecord((long) queryCount.getResultList().size());
        }
        List<Object[]> objectList = query.getResultList();
        return converEntytoDTO2(objectList);
    }

    private List<RoomDTO> converEntytoDTO2(List<Object[]> objects){
        List<RoomDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setRoomId(((BigInteger) obj[0]).longValue());
                roomDTO.setRoomCode((String) obj[1]);
                roomDTO.setRoomName((String) obj[2]);
                roomDTO.setFloorName((String) obj[3]);
                roomDTO.setMaxNumber((Integer) obj[4]);
                roomDTO.setNote((String) obj[5]);
                roomDTO.setRoomType((Integer) obj[6]);
                roomDTO.setRoomTypeName((String) obj[7]);
                roomDTO.setStatus((Integer) obj[8]);
                Integer status = (Integer) obj[8];
                if (status == 1){
                    roomDTO.setStatusName("C??n tr???ng");
                }else if (status == 2){
                    roomDTO.setStatusName("Kh??ng ho???t ?????ng");
                }else if (status == 3){
                    roomDTO.setStatusName("???? ?????t");
                }else if (status == 4){
                    roomDTO.setStatusName("Ch??? d???n ph??ng");
                }
                if (obj[9] != null){
                    roomDTO.setPrice(((BigInteger) obj[9]).longValue());
                }
                list.add(roomDTO);
            }
        }
        return list;
    }

    private List<RoomDTO> converEntytoDTO(List<Object[]> objects){
        List<RoomDTO> list = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(objects)) {
            for (Object[] obj : objects) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setRoomId(((BigInteger) obj[0]).longValue());
                roomDTO.setRoomCode((String) obj[1]);
                roomDTO.setRoomName((String) obj[2]);
                roomDTO.setFloorNumber((Integer) obj[3]);
                roomDTO.setMaxNumber((Integer) obj[4]);
                roomDTO.setNote((String) obj[5]);
                roomDTO.setRoomTypeName((String) obj[6]);
                roomDTO.setFloorName((String)obj[7]);
                roomDTO.setFullName((String)obj[8]);
                if (obj[9] != null){
                    roomDTO.setPrice(((BigInteger) obj[9]).longValue());
                }
                list.add(roomDTO);
            }
        }
        return list;
    }


}
