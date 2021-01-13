package de.hft_stuttgart.winf.proj2.sp.backend.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.StudentDTO;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;

@Path("lsf")
public class LsfHandler {

    private static Logger logger = LogManager.getLogger(LsfHandler.class);

    @Path("student_import")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response createNewExam(@FormDataParam("file") InputStream uploadedInputStream,
                                  @FormDataParam("file") FormDataContentDisposition fileDetail) {

        return Response.ok().build();
    }


    /**This  method recieves a Fileinput Stream to traverse an excel File to get the "Matrikelnummer" and "Studiengang" out of it.
    The method traverses each row until the first cell of a row has the value "mtknr".
    After that for each consecutive row the "Matrikelnummer"(mtknr) and "Studiengang"(stg) are stored in respective ArrayList.
    This continues until the end of the sheet "endHISsheet" mis found.
    After that, objects of the class StudentDTO are created as return value
    */

    public ArrayList<StudentDTO> getStudent(FileInputStream file){

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

                        int intRowCell = Integer.valueOf(rowCellValue);
                        matNr.add(intRowCell);

                        while (cellIterator.hasNext() && counter < 2) {
                            counter = counter +1;

                            Cell cell = cellIterator.next();
                            String cellValue = dataFormatter.formatCellValue(cell);

                            if(counter ==2){
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
