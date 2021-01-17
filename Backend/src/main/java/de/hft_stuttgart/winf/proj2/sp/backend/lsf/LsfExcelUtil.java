package de.hft_stuttgart.winf.proj2.sp.backend.lsf;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.CorrectionDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.*;
import java.util.*;

public class LsfExcelUtil {

    /**
     * This  method recieves a Fileinput Stream to traverse an excel File to get the "Matrikelnummer" and "Studiengang" out of it.
     * The method traverses each row until the first cell of a row has the value "mtknr".
     * After that for each consecutive row the "Matrikelnummer"(mtknr) and "Studiengang"(stg) are stored in respective ArrayList.
     * This continues until the end of the sheet "endHISsheet" mis found.
     * After that, objects of the class StudentDTO are created as return value
     */
    public ArrayList<StudentDTO> getStudent(InputStream file) {

        int counter = 0;

        boolean startRow = false;
        boolean endRow = false;

        ArrayList<Integer> matNr = new ArrayList<Integer>();
        ArrayList<String> stg = new ArrayList<String>();
        ArrayList<StudentDTO> student = new ArrayList<StudentDTO>();

        try {
            Workbook workbook = new HSSFWorkbook(file);
            DataFormatter dataFormatter = new DataFormatter();
            Iterator<Sheet> sheets = workbook.sheetIterator();

            while (sheets.hasNext()) {
                Sheet sh = sheets.next();
                Iterator<Row> iterator = sh.iterator();
                while (iterator.hasNext()) {
                    counter = 0;
                    Row row = iterator.next();
                    Iterator<Cell> cellIterator = row.iterator();
                    Cell rowCell = cellIterator.next();
                    String rowCellValue = dataFormatter.formatCellValue(rowCell);
                    if (rowCellValue.equals("endHISsheet")) {
                        endRow = true;
                    }
                    if (startRow == true && endRow == false) {

                        int intRowCell = Integer.valueOf(rowCellValue);
                        matNr.add(intRowCell);
                        while (cellIterator.hasNext() && counter < 2) {
                            counter = counter + 1;

                            Cell cell = cellIterator.next();
                            String cellValue = dataFormatter.formatCellValue(cell);

                            if (counter == 2) {
                                stg.add(cellValue);

                            }
                        }
                    }
                    if (rowCellValue.equals("mtknr")) {
                        startRow = true;
                    }

                }
            }
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (int i = 0; i < matNr.size(); i++) {
            student.add(new StudentDTO(matNr.get(i), stg.get(i)));
        }

        return student;
    }

    public void writeIntoExcel(ExamDto exam, InputStream file) {

        int counter = 0;

        boolean startRow = false;
        boolean endRow = false;

        try {
            Workbook workbook = new HSSFWorkbook(file);
            DataFormatter dataFormatter = new DataFormatter();
            Iterator<Sheet> sheets = workbook.sheetIterator();

            while (sheets.hasNext()) {
                Sheet sh = sheets.next();
                Iterator<Row> iterator = sh.iterator();
                while (iterator.hasNext()) {
                    Row row = iterator.next();
                    Iterator<Cell> cellIterator = row.iterator();
                    Cell rowCell = cellIterator.next();
                    String rowCellValue = dataFormatter.formatCellValue(rowCell);
                    if (rowCellValue.equals("bewertung")) {
                        System.out.println("test");
                    }
                    if(rowCellValue.equals("pdatum")){
                        System.out.println("test2");
                    }

                }
            }
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void getGradeAvg(List<List<CorrectionDTO>> correction) {

    }

    public void getSumOfAvg(List<List<CorrectionDTO>> correction){
    }
}
