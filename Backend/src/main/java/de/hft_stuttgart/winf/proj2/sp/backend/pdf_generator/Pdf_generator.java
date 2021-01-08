package de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator;


import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.VerticalAlignment;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamQuestionDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.QuestionsDto;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.List;


public class Pdf_generator {
    private static final Logger logger = LogManager.getLogger(Pdf_generator.class);

    private static SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
    // Prints Exam with list of Questions
    public static void writeExam(ExamDto exam, List<ExamQuestionDTO> questions) throws IOException, SQLException {
        //Dokument vorbereiten
        final String filename = "PDF/Exam_" + exam.getExam_id() + "_" + exam.getTitle() + ".pdf ";
        final PdfWriter pdfWriter = new PdfWriter(filename);
        final PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        PageSize ps = pdfDocument.getDefaultPageSize();

        //PLatzhalter design
        Paragraph placeholder = new Paragraph("\n");

        LineSeparator separator = new LineSeparator(new SolidLine(1)).setMarginTop(5);


        //Bild HFT Logo vorbereiten
        final String imageFile = "Backend/src/main/java/de/hft_stuttgart/winf/proj2/sp/backend/pdf_generator/HFTLogo.jpg";
        final Image hftLogo = new Image(ImageDataFactory.create(imageFile));
        hftLogo.setHorizontalAlignment(HorizontalAlignment.RIGHT);

        Paragraph titleName = new Paragraph();
        Text titleNameText = new Text("HOCHSCHULE FÜR TECHNIK STUTTGART");
        titleNameText.setFontSize(14);
        titleNameText.setBold();
        titleName.add(titleNameText);
        titleName.setHorizontalAlignment(HorizontalAlignment.LEFT);

        Table title = new Table(2);
        Cell titleNameCell= new Cell(1,1).add(titleName);
        Cell titleImageCell= new Cell(1,3).add(hftLogo);
        titleNameCell.setBorder(Border.NO_BORDER);
        titleNameCell.setVerticalAlignment(VerticalAlignment.MIDDLE);
        titleImageCell.setWidth(220);
        titleImageCell.setBorder(Border.NO_BORDER);
        title.addCell(titleNameCell);
        title.addCell(titleImageCell);


        //Header vorbereiten
        Paragraph p_header1 = new Paragraph();
        Text headerText1 = new Text(exam.getModule().getCourse().getCourseName() + ": \n"+exam.getTitle());
        headerText1.setFontSize(32);
        p_header1.add(headerText1);
        p_header1.setTextAlignment(TextAlignment.CENTER);

        Paragraph pDate = new Paragraph("Datum:  " + format.format(exam.getExam_date()));
        Paragraph pName = new Paragraph("Name:");
        Paragraph pMtr = new Paragraph("Mtr. Nr.:");
        Paragraph pSemester = new Paragraph("Semester:");
        Paragraph pPruefer = new Paragraph("Prüfer:");
        Paragraph pPlaceholder = new Paragraph(" ");

        pDate.setFontSize(14);
        pName.setFontSize(14);
        pMtr.setFontSize(14);
        pSemester.setFontSize(14);
        pPruefer.setFontSize(14);

        Table studentInput = new Table(2);
        Cell date = new Cell(1,2).add(pDate);
        Cell name = new Cell(1,1).add(pName);
        Cell semester = new Cell(1,2).add(pSemester);
        Cell mtr = new Cell(2,1).add(pMtr);
        Cell pruefer = new Cell(1,2).add(pPruefer);
        name.setWidth(265);
        studentInput.addCell(date);
        studentInput.addCell(name);
        studentInput.addCell(semester);
        studentInput.addCell(mtr);
        studentInput.addCell(pruefer);
        date.setBorder(Border.NO_BORDER);
        name.setBorder(Border.NO_BORDER);
        semester.setBorder(Border.NO_BORDER);
        mtr.setBorder(Border.NO_BORDER);
        pruefer.setBorder(Border.NO_BORDER);

        Paragraph pMaxPoints = new Paragraph("maximale Punkte:");
        Paragraph pReachedPoints = new Paragraph("erreichte Punkte:");
        Paragraph pNumberOfQuestions = new Paragraph("Anzahl Fragen:");
        Paragraph pMark = new Paragraph("max. Punkte:");

        Table profInput = new Table(2);
        Cell maxPoints = new Cell(1,1).add(pMaxPoints);
        Cell numberOfQuestions = new Cell(1,2).add(pNumberOfQuestions);
        Cell reachedPoints = new Cell(2,1).add(pReachedPoints);
        Cell mark = new Cell(2,2).add(pMark);

        maxPoints.setWidth(265);
        profInput.addCell(maxPoints);
        profInput.addCell(numberOfQuestions);
        profInput.addCell(reachedPoints);
        profInput.addCell(mark);

        maxPoints.setBorder(Border.NO_BORDER);
        numberOfQuestions.setBorder(Border.NO_BORDER);
        reachedPoints.setBorder(Border.NO_BORDER);
        mark.setBorder(Border.NO_BORDER);


        //Bottom vorbereiten
        Paragraph bottom = new Paragraph();
        Text bot1 = new Text("Viel Erfolg!!!");
        bot1.setFontSize(30);
        bottom.add(bot1);
        bottom.setTextAlignment(TextAlignment.CENTER);


        //Dokument erstellen
        try (final Document document = new Document(pdfDocument)) {
            logger.info("Exam " + exam.getExam_id() + ": " + filename + " created");


            //hftLogo + Header   print
            document.add(title);
            document.add(separator);
            document.add(placeholder);
            document.add(p_header1);
            document.add(separator);
            document.add(placeholder);
            document.add(studentInput);
            document.add(placeholder);
            document.add(separator);
            document.add(placeholder);
            document.add(profInput);
            System.out.println(ps.getWidth());
            logger.info("Exam " + exam.getExam_id() + ": Header printed");
            document.add(placeholder);

            System.out.println(questions);
            //Questions print
            for (QuestionsDto question : questions) {
                document.add(new AreaBreak());
                //Header
                Text questionHeader1 = new Text(question.getShortName() + " - " + question.getQuestionName());
                Text questionHeader2 = new Text("\n" + question.getCategory());
                questionHeader1.setFontSize(20);
                questionHeader2.setFontSize(12);
                Paragraph questionHeader = new Paragraph();
                questionHeader.add(questionHeader1);
                questionHeader.add(questionHeader2);
                document.add(questionHeader);

                //FRAGENTEXT mit HTML als String
                List<IElement> elements = HtmlConverter.convertToElements(question.getQuestionText());
                for (IElement element : elements) {
                    document.add((IBlockElement) element);
                }

                //Bottom
                Text questionBottom1 = new Text("(       /" + question.getQuestionPoints() + ")");
                questionBottom1.setFontSize(12);
                Paragraph questionBottom = new Paragraph();
                questionBottom.setTextAlignment(TextAlignment.RIGHT);
                questionBottom.add(questionBottom1);
                document.add(questionBottom);
                logger.info("Exam " + exam.getExam_id() + ": Question " + question.getQuestionId() + ": printed");
            }
            logger.info("Exam " + exam.getExam_id() + ": All Questions printed");

            // Bottom  print  (EXAM)
            bottom.setFixedPosition(document.getLeftMargin(), document.getBottomMargin(), ps.getWidth() - document.getLeftMargin() - document.getRightMargin());
            document.add(bottom);
            logger.info("Exam " + exam.getExam_id() + ": Bottom printed");

        } catch (Exception e) {
            logger.error(e);
        }
        logger.info("Exam " + exam.getExam_id() + ": printed sucessfully");
    }

}



