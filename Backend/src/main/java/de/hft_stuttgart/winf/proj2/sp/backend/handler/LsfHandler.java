package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;

public class LsfHandler {

    public ArrayList<StudentDTO> getStudent(FileInputStream file){

        int counter = 0;

        boolean startRow = false;
        boolean endRow = false;

        ArrayList<Integer> matNr = new ArrayList<Integer>();
        ArrayList<String> stg = new ArrayList<String>();
        ArrayList<StudentDTO> student = new ArrayList<StudentDTO>();

       // String lsfImp = "C:/Users/Fede10204/Desktop/testDoc.xls";

        try {
           // FileInputStream file = new FileInputStream(new File(lsfImp));
            Workbook workbook = new HSSFWorkbook(file);
            DataFormatter dataFormatter = new DataFormatter();
            Iterator<Sheet> sheets = workbook.sheetIterator();

            while(sheets.hasNext()) {
                Sheet sh = sheets.next();
                System.out.println("Sheet name is "+sh.getSheetName());
                System.out.println("---------");

                Iterator<Row> iterator = sh.iterator();
                while(iterator.hasNext()) {
                    counter = 0;

                    Row row = iterator.next();
                    Iterator<Cell> cellIterator = row.iterator();

                    Cell rowCell = cellIterator.next();
                    String rowCellValue = dataFormatter.formatCellValue(rowCell);


                    if(rowCellValue.equals("endHISsheet")){
                        endRow = true;
                    }

                    if(startRow == true && endRow==false){

                        //System.out.println(rowCellValue);
                        int intRowCell = Integer.valueOf(rowCellValue);
                        matNr.add(intRowCell);

                        while (cellIterator.hasNext() && counter < 2) {
                            counter = counter +1;

                            Cell cell = cellIterator.next();
                            String cellValue = dataFormatter.formatCellValue(cell);

                            if(counter ==2){
                                //System.out.print(cellValue+"\t");
                                stg.add(cellValue);

                            }

                        }

                    }

                    if(rowCellValue.equals("mtknr")){
                        startRow = true;
                    }


                    System.out.println();
                }
            }
            workbook.close();




        }
        catch (Exception e){
            e.printStackTrace();
        }

        for (int i = 0; i < matNr.size(); i++ ){
            student.add(new StudentDTO(matNr.get(i), stg.get(i)));
        }

        System.out.println(student);

        return student;
    }

}
