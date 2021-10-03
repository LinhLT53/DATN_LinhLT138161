package com.linhlt138161.qlts.project.dto;

import java.util.Date;

public class tourDTO {
    private Long idtour;

    private String code;

    private String name;

    private String vehicle;

    private String tourtype;

    private Date starttime;

    private Date endtime;

    private Integer price;

    private Integer status;

    private String service;

    private String policy;

    private String image;
    private String statusTour;
    private String note;
    private  String venue;

    private Integer page;
    private Integer pageSize;
    private Long totalRecord;

    private String type;

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public tourDTO() {
    }

    public Integer getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getIdtour() {
        return idtour;
    }

    public void setIdtour(Long idtour) {
        this.idtour = idtour;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public String getTourtype() {
        return tourtype;
    }

    public void setTourtype(String tourtype) {
        this.tourtype = tourtype;
    }

    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getStatus(Integer integer) {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStatusTour() {
        return statusTour;
    }

    public void setStatusTour(String statusTour) {
        this.statusTour = statusTour;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Long getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(Long totalRecord) {
        this.totalRecord = totalRecord;
    }
}
