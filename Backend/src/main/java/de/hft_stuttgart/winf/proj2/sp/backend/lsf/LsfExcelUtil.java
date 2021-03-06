package de.hft_stuttgart.winf.proj2.sp.backend.lsf;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentWithGradeDTO;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

    public ByteArrayOutputStream writeIntoExcel(ExamDto exam, InputStream file, List<StudentWithGradeDTO> studentsWithGrade) {

        ByteArrayOutputStream bout = new ByteArrayOutputStream();

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
                    counter = 0;
                    Row row = iterator.next();
                    Iterator<Cell> cellIterator = row.iterator();
                    Cell rowCell = cellIterator.next();
                    String rowCellValue = dataFormatter.formatCellValue(rowCell);
                    if (rowCellValue.equals("endHISsheet")) {
                        endRow = true;
                    }
                    if (startRow == true && endRow == false) {

                        int matNr = Integer.valueOf(rowCellValue);
                        while (cellIterator.hasNext() && counter < 8) {
                            counter = counter + 1;

                            Cell cell = cellIterator.next();
                            String cellValue = dataFormatter.formatCellValue(cell);

                            if (counter == 6) {
                                cell.setCellValue(studentsWithGrade.stream().filter(x -> x.getMatrNumber().compareTo(matNr) == 0).findFirst().get().getGrade());
                            }
                            if (counter == 8) {
                                cell.setCellValue(exam.getExam_date());
                            }
                        }
                    }
                    if (rowCellValue.equals("mtknr")) {
                        startRow = true;
                    }

                }
            }
            workbook.write(bout);
            workbook.close();
            return bout;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
