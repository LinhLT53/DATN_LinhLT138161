package com.linhlt138161.qlts.project.common;

import com.linhlt138161.qlts.project.common.annotation.Import;
import com.linhlt138161.qlts.project.common.annotation.SheetImportSerializable;
import common.CommonUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class ExcelDataUtil {

    private static final Logger log = LoggerFactory.getLogger(ExcelDataUtil.class);


    public static String writeResultExcel(MultipartFile file, Map<Long, String> listResult, String fileName, List<?> listData) {
        String savePath = null;
//        XSSFWorkbook workbook = null;
        Workbook workbook = null;
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(saveFile(file));
//            workbook = new XSSFWorkbook(inputStream);
            workbook = WorkbookFactory.create(inputStream);
            if (!listData.isEmpty()) {
                Class<?> clazz = listData.get(0).getClass();
                SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);

//                XSSFSheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
                Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
                int headerIndex = sheetSerializable.startRow() - 1;

                Row row02 = sheet.getRow(headerIndex);
                Cell pre02Cell = row02.getCell(sheetSerializable.totalCols() - 1);
                Cell cell24 = row02.createCell(sheetSerializable.totalCols());
                CellStyle style = pre02Cell.getCellStyle();
                cell24.setCellStyle(style);
                cell24.setCellValue("Kết quả import");
                sheet.setColumnWidth(sheetSerializable.totalCols(), 50 * 256);


                Iterator<Row> iterator = sheet.rowIterator();
                Integer rowIndex = sheetSerializable.startRow();
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                long idx = 0;
                int ix = 0;
                while (iterator.hasNext() && idx < listResult.size()) {
                    Row row = iterator.next();

                    Object data = listData.get(ix);
                    Object indexStr = "";
                    for (Field field : clazz.getDeclaredFields()) {
                        Import element = field.getAnnotation(Import.class);
                        if (element != null && element.index() == 0) {
                            try {
                                indexStr = clazz.getDeclaredMethod("get" + StringUtils.capitalize(field.getName())).invoke(data);

                            } catch (Exception e) {
                                log.error(e.getMessage(), e);
                                e.printStackTrace();
                            }
                        }
                    }
                    if (!rowIndex.toString().equals(indexStr.toString())) {
                        rowIndex++;
                        continue;
                    }

                    Cell cell2 = row.createCell(sheetSerializable.totalCols());
                    cell2.setCellStyle(ExcelStyleUtil.getStringCellStyle(workbook));
                    cell2.setCellValue(listResult.get(idx++));

//      create index
                    Cell cellIdx = row.getCell(0);
                    if (cellIdx == null) {
                        cellIdx = row.createCell(0);
                        cell2.setCellStyle(ExcelStyleUtil.getDateCellStyle(workbook));
                    }
                    ix++;
                    rowIndex++;
                    cellIdx.setCellValue(ix);


                }
            }

            savePath = "./report_out/";
            File dir = new File(savePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }
//            savePath = savePath + fileName + "_" + CommonUtils.getStrDate(System.currentTimeMillis(), "ddMMyyyy_HHmmss") + ".xlsx";
            savePath = savePath + fileName;
            FileOutputStream outputStream = new FileOutputStream(savePath);
            workbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (IOException | org.apache.poi.openxml4j.exceptions.InvalidFormatException e) {
            log.error(e.getMessage(), e);
            return null;
        } finally {
            if (workbook != null) try {
                workbook.close();
                if (inputStream != null) inputStream.close();
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }

        return savePath;
    }

    public static File saveFile(MultipartFile file) throws IOException {
        String path = "./report_in/" + file.getOriginalFilename();

        File reportIn = new File("./report_in");
        if (!reportIn.exists()) reportIn.mkdir();

        File dest = new File(path);
        FileUtils.copyInputStreamToFile(file.getInputStream(), dest);
        return dest;
    }

    public static List<Object[]> createObjFromExcel(MultipartFile file, Object object) throws IOException {
//        XSSFWorkbook workbook = null;
        Workbook workbook = null;
        FileInputStream inputStream = null;
//        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(saveFile(file)));
//             Workbook workbook = StreamingReader.builder()
//                     .rowCacheSize(100)
//                     .bufferSize(4096)
//                     .open(bis)){
        try {
            inputStream = new FileInputStream(saveFile(file));
            Class<?> clazz = object.getClass();
            SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);
//            workbook = new XSSFWorkbook(inputStream);
            workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
            List<Object[]> result = new ArrayList<>();
            Iterator<Row> iterator = sheet.iterator();
            try {
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                DataFormatter dataFormatter = new DataFormatter();
                int idx = sheetSerializable.startRow();
                while (iterator.hasNext()) {
                    Object[] obj = new Object[sheetSerializable.totalCols()];
                    obj[0] = "";
                    Row row = iterator.next();
                    if (row != null) {
                        for (int j = 1; j <= sheetSerializable.totalCols() - 1; j++) {
                            Cell cell = row.getCell(j);
                            if (cell != null) {
                                if (CellType.STRING == cell.getCellTypeEnum()) {
                                    obj[j] = cell.getStringCellValue().trim();
                                } else {
                                    obj[j] = dataFormatter.formatCellValue(cell).trim();
                                }
                            }
                        }
                        if (!CommonUtils.isNullOrEmpty(obj)) {
                            obj[0] = String.valueOf(idx);
                            result.add(obj);
                        }
                    }
                    idx++;
                }
                return result;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        } catch (IOException | org.apache.poi.openxml4j.exceptions.InvalidFormatException e) {
            log.error(e.getMessage(), e);
            return null;
        } finally {
            if (workbook != null) {
                workbook.close();
            }
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }

    public static List<?> convertObjToList(List<Object[]> objects, Object object) throws ClassNotFoundException {
        Class<?> c = Class.forName(object.getClass().getName());
        Class<?> clazz = object.getClass();

        List<Object> result = new ArrayList<>();

        try {
            for (Object[] o : objects) {

                Object obj = c.newInstance();

                for (Field field : clazz.getDeclaredFields()) {
                    Import element = field.getAnnotation(Import.class);
                    if (element != null && element.index() != -1) {
                        clazz.getDeclaredMethod("set" + StringUtils.capitalize(field.getName()), String.class).invoke(obj, o[element.index()] == null ? "" : o[element.index()]);
                    }
                }
                result.add(obj);
            }
            return result;

        } catch (NoSuchMethodException | InstantiationException | InvocationTargetException | IllegalAccessException e) {
            log.error(e.getMessage(), e);
        }

        return null;

    }

    public static List<?> getListInExcel(MultipartFile file, Object object) {
        List<Object[]> datas = null;
        try {
            datas = createObjFromExcel(file, object);
            List<?> result = convertObjToList(datas, object);
            return result;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    public static <T extends Object> T getHeaderList(MultipartFile file, Object object) throws IOException {
        XSSFWorkbook workbook = null;
        try {
            FileInputStream inputStream = new FileInputStream(saveFile(file));
            Class<?> clazz = object.getClass();
            Class<?> c = Class.forName(object.getClass().getName());
            SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);
            workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());

            Row flagRow = sheet.getRow(sheetSerializable.startRow() - 1);
            Object obj = c.newInstance();
            if ((int) flagRow.getLastCellNum() > sheetSerializable.totalCols()) {
                return null;
            }
            for (Field field : clazz.getDeclaredFields()) {
                Import element = field.getAnnotation(Import.class);
                if (element != null && element.index() != -1 && element.index() != 0) {
                    try {
                        String data = flagRow.getCell(element.index()).getStringCellValue().trim();
                        clazz.getDeclaredMethod("set" + StringUtils.capitalize(field.getName()), String.class).invoke(obj, data);
                    } catch (NoSuchMethodException e) {
                        log.error(e.getMessage(), e);
                    }
                }
            }
            return (T) obj;

        } catch (IOException | ClassNotFoundException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
            log.error(e.getMessage(), e);
        } finally {
            assert workbook != null;
            workbook.close();
        }
        return null;
    }

    public static void writeResultExcel(Workbook workbook, Map<Long, String> listResult, String fileName, List<?> listData) {
        String savePath = null;
        FileInputStream inputStream = null;
        try {
            if (!CommonUtils.isNullOrEmpty(listData)) {
                Class<?> clazz = listData.get(0).getClass();
                SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);

                Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
                int headerIndex = sheetSerializable.startRow() - 2;

                Row row02 = sheet.getRow(headerIndex);
                Cell pre02Cell = row02.getCell(0);
                Cell cell24 = row02.createCell(sheetSerializable.totalCols());
                CellStyle style = pre02Cell.getCellStyle();
                cell24.setCellStyle(style);
                cell24.setCellValue("Kết quả import");
                sheet.setColumnWidth(sheetSerializable.totalCols(), 50 * 256);

                Row row03 = sheet.getRow(headerIndex + 1);
                Cell cell24Under = row03.createCell(sheetSerializable.totalCols());
                cell24Under.getCellStyle().setBorderRight(BorderStyle.THIN);
                //updateBy: thanhnb 17/06/2020
                //TODO: merge row
                //get info from annotation
                SheetImportSerializable sheetImportSerializable = clazz.getAnnotation(SheetImportSerializable.class);
                sheet.addMergedRegion(new CellRangeAddress(
                        sheetImportSerializable.startRow() - 2, //from first row
                        sheetImportSerializable.startRow() - 1, //from first row
                        sheetImportSerializable.totalCols(), //from first column
                        sheetImportSerializable.totalCols() //from first column
                ));
                //updateBy: thanhnb 17/06/2020
                Iterator<Row> iterator = sheet.rowIterator();
                Integer rowIndex = sheetSerializable.startRow();
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                long idx = 0;
                int ix = 0;
                while (iterator.hasNext() && idx < listResult.size()) {
                    Row row = iterator.next();

                    Object data = listData.get(ix);
                    Object indexStr = "";
                    for (Field field : clazz.getDeclaredFields()) {
                        Import element = field.getAnnotation(Import.class);
                        if (element != null && element.index() == 0) {
                            try {
                                indexStr = clazz.getDeclaredMethod("get" + StringUtils.capitalize(field.getName())).invoke(data);

                            } catch (Exception e) {
                                log.error(e.getMessage(), e);
                                e.printStackTrace();
                            }
                        }
                    }
                    if (!rowIndex.toString().equals(indexStr.toString())) {
                        rowIndex++;
                        continue;
                    }

                    Cell cell2 = row.createCell(sheetSerializable.totalCols());
                    cell2.setCellStyle(ExcelStyleUtil.getStringCellStyle(workbook));
//                    cell2.getCellStyle().setFont(ExcelStyleUtil.getDataFontStyleArial(workbook));
                    cell2.getRow().setHeight((short) -1);
                    cell2.setCellValue(listResult.get(idx++));
//                    sheet.autoSizeColumn(sheetSerializable.totalCols());

//                    cell2.getCellStyle().setWrapText(true);

//      create index
                    Cell cellIdx = row.getCell(0);
                    if (cellIdx == null) {
                        cellIdx = row.createCell(0);
                        cell2.setCellStyle(ExcelStyleUtil.getDateCellStyle(workbook));
                    }
                    ix++;
                    rowIndex++;
                    cellIdx.setCellValue(ix);
                }
            }
            savePath = "./report_out/";
            File dir = new File(savePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            savePath = savePath + fileName;
            FileOutputStream outputStream = new FileOutputStream(savePath);
            workbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        } finally {
            try {
                if (inputStream != null) inputStream.close();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
    }

    public static void writeResultExcels(Workbook workbook, Map<Long, String> listResult, String fileName, List<?> listData) {
        String savePath = null;
        FileInputStream inputStream = null;
        try {
            if (!CommonUtils.isNullOrEmpty(listData)) {
                Class<?> clazz = listData.get(0).getClass();
                SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);

                Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
                int headerIndex = sheetSerializable.startRow() - 1;

                Row row02 = sheet.getRow(headerIndex);
                Cell pre02Cell = row02.getCell(0);
                Cell cell24 = row02.createCell(sheetSerializable.totalCols());
                CellStyle style = pre02Cell.getCellStyle();
                cell24.setCellStyle(style);
                cell24.setCellValue("Kết quả import");
                sheet.setColumnWidth(sheetSerializable.totalCols(), 50 * 256);

                Iterator<Row> iterator = sheet.rowIterator();
                Integer rowIndex = sheetSerializable.startRow();
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                long idx = 0;
                int ix = 0;
                while (iterator.hasNext() && idx < listResult.size()) {
                    Row row = iterator.next();

                    Object data = listData.get(ix);
                    Object indexStr = "";
                    for (Field field : clazz.getDeclaredFields()) {
                        Import element = field.getAnnotation(Import.class);
                        if (element != null && element.index() == 0) {
                            try {
                                indexStr = clazz.getDeclaredMethod("get" + StringUtils.capitalize(field.getName())).invoke(data);

                            } catch (Exception e) {
                                log.error(e.getMessage(), e);
                                e.printStackTrace();
                            }
                        }
                    }
                    if (!rowIndex.toString().equals(indexStr.toString())) {
                        rowIndex++;
                        continue;
                    }

                    Cell cell2 = row.createCell(sheetSerializable.totalCols());
                    cell2.setCellStyle(ExcelStyleUtil.getStringCellStyle(workbook));
                    cell2.setCellValue(listResult.get(idx++));

//      create index
                    Cell cellIdx = row.getCell(0);
                    if (cellIdx == null) {
                        cellIdx = row.createCell(0);
                        cell2.setCellStyle(ExcelStyleUtil.getDateCellStyle(workbook));
                    }
                    ix++;
                    rowIndex++;
                    cellIdx.setCellValue(ix);
                }
            }
            savePath = "./report_out/";
            File dir = new File(savePath);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            savePath = savePath + fileName;
            FileOutputStream outputStream = new FileOutputStream(savePath);
            workbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        } finally {
            try {
                if (inputStream != null) inputStream.close();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }
    }

    /**
     * @CreateBy: ThanhNB
     * @param file
     * @param object
     * @return
     */
    public static List<?> getListInExcelFile(File file, Object object) {
        List<Object[]> datas = null;
        try {
            datas = createObjFromExcelFile(file, object);
            List<?> result = convertObjToList(datas, object);
            return result;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * @CreateBy: ThanhNB
     * @param file
     * @param object
     * @return
     */
    public static List<?> getListInExcelFile(File file, Object object, Workbook workbook) {
        List<Object[]> datas = null;
        try {
            datas = createObjFromExcelFile(file, object, workbook);
            List<?> result = convertObjToList(datas, object);
            return result;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     * @CreateBy: ThanhNB
     * @param file
     * @param object
     * @return
     */
    public static List<Object[]> createObjFromExcelFile(File file, Object object) throws IOException {
//        XSSFWorkbook workbook = null;
//        FileInputStream inputStream = null;
//    try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
//         Workbook workbook = StreamingReader.builder()
//             .rowCacheSize(100)
//             .bufferSize(4096)
//             .open(bis)) {
        Workbook workbook = null;
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);
            Class<?> clazz = object.getClass();
            SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);
            workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
            List<Object[]> result = new ArrayList<>();
            Iterator<Row> iterator = sheet.iterator();
            try {
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                DataFormatter dataFormatter = new DataFormatter();
                int idx = sheetSerializable.startRow();
                while (iterator.hasNext()) {
                    Object[] obj = new Object[sheetSerializable.totalCols()];
                    obj[0] = "";
                    Row row = iterator.next();
                    if (row != null) {
                        for (int j = 1; j <= sheetSerializable.totalCols() - 1; j++) {
                            Cell cell = row.getCell(j);
                            if (cell != null) {
                                if (CellType.STRING == cell.getCellTypeEnum()) {
                                    obj[j] = cell.getStringCellValue().trim();
                                } else {
                                    obj[j] = dataFormatter.formatCellValue(cell).trim();
                                }
                            }
                        }
                        if (!CommonUtils.isNullOrEmpty(obj)) {
                            obj[0] = String.valueOf(idx);
                            result.add(obj);
                        }
                    }
                    idx++;
                }
                return result;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        } catch (IOException | InvalidFormatException e) {
            log.error(e.getMessage(), e);
            return null;
        } finally {
            if (workbook != null) {
                workbook.close();
            }
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }


    /**
     * @CreateBy: ThanhNB
     * @param file
     * @param object
     * @return
     */
    public static List<Object[]> createObjFromExcelFile(File file, Object object, Workbook workbook) throws IOException {
//        XSSFWorkbook workbook = null;
//        FileInputStream inputStream = null;
//    try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
//         Workbook workbook = StreamingReader.builder()
//             .rowCacheSize(100)
//             .bufferSize(4096)
//             .open(bis)) {
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream(file);
            Class<?> clazz = object.getClass();
            SheetImportSerializable sheetSerializable = clazz.getDeclaredAnnotation(SheetImportSerializable.class);
            Sheet sheet = workbook.getSheetAt(sheetSerializable.sheetDataIndex());
            List<Object[]> result = new ArrayList<>();
            Iterator<Row> iterator = sheet.iterator();
            try {
                for (int i = 0; i < sheetSerializable.startRow(); i++) {
                    iterator.next();
                }
                DataFormatter dataFormatter = new DataFormatter();
                int idx = sheetSerializable.startRow();
                while (iterator.hasNext()) {
                    Object[] obj = new Object[sheetSerializable.totalCols()];
                    obj[0] = "";
                    Row row = iterator.next();
                    if (row != null) {
                        for (int j = 1; j <= sheetSerializable.totalCols() - 1; j++) {
                            Cell cell = row.getCell(j);
                            if (cell != null) {
                                if (CellType.STRING == cell.getCellTypeEnum()) {
                                    obj[j] = cell.getStringCellValue().trim();
                                } else {
                                    obj[j] = dataFormatter.formatCellValue(cell).trim();
                                }
                            }
                        }
                        if (!CommonUtils.isNullOrEmpty(obj)) {
                            obj[0] = String.valueOf(idx);
                            result.add(obj);
                        }
                    }
                    idx++;
                }
                return result;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                return null;
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            return null;
        } finally {
//            if (workbook != null) {
//                workbook.close();
//            }
            if (inputStream != null) {
                inputStream.close();
            }
        }
    }
}

