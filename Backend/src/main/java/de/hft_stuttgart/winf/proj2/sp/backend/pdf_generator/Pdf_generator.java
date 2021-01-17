package de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator;


import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.io.source.OutputStream;
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

import javax.print.Doc;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.List;


public class Pdf_generator {
    private static final Logger logger = LogManager.getLogger(Pdf_generator.class);

    private static final SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
    private static final Paragraph placeholder = new Paragraph("\n");
    private static final LineSeparator separator = new LineSeparator(new SolidLine(1)).setMarginTop(5);

    /**
     *  Prints a PDF-File under PDF/Exam_ID_Title.pdf with a exam cover sheet and page for every question
     * @param exam Exam Object List from the Question that need to be displayed in the PDF
     * @param questions List from the Question that need to be displayed in the PDF
     * @throws FileNotFoundException
     */
    public static void savePdfDocument(ExamDto exam, List<ExamQuestionDTO> questions) throws FileNotFoundException {
        //Setting Filename, preparing document
        final String filename = "PDF/Exam_" + exam.getExam_id() + "_" + exam.getTitle() + ".pdf ";
        final PdfWriter pdfWriter;
        pdfWriter = new PdfWriter(filename);
        final PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        //create the Document
        final Document document = new Document(pdfDocument);
        logger.info("Exam " + exam.getExam_id() + ": " + filename + " created");
        writeExam(pdfDocument,document,exam,questions);
    }

    /**
     *  Prints a PDF-File ByteArrayOutputStream under PDF/Exam_ID_Title.pdf with a exam cover sheet and page for every question
     * @param exam Exam Object List from the Question that need to be displayed in the PDF
     * @param questions List from the Question that need to be displayed in the PDF
     * @return ByteArrayOutputStream from the PDF that is generated
     * @throws FileNotFoundException
     */
    public static ByteArrayOutputStream previewPdfDocument(ExamDto exam, List<ExamQuestionDTO> questions) throws FileNotFoundException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        final PdfWriter previewWriter = new PdfWriter(out);
        final PdfDocument pdfDocument = new PdfDocument(previewWriter);
        Document document = new Document(pdfDocument);
        writeExam(pdfDocument,document, exam, questions);
        return out;
    }


    /**
     * Prints a PDF-File under PDF/Exam_ID_Title.pdf with a exam cover sheet and page for every question
     *
     * @param exam      ExamDto = Exam Object
     * @param questions List of ExamQuestionDTO  List of Question Objects
     * @throws FileNotFoundException if the filename cant be created in the directory
     */
    public static void writeExam(PdfDocument pdfDocument, Document document , ExamDto exam, List<ExamQuestionDTO> questions) throws FileNotFoundException {

        //exam cover sheet
        try {
            document.add(title());
        } catch (MalformedURLException e) {
            e.printStackTrace();
            logger.error("Exam " + exam.getExam_id() + ": Failed to load HFTLogo");
        }
        document.add(separator);
        document.add(placeholder);
        document.add(header(exam));
        document.add(separator);
        document.add(placeholder);
        document.add(studentInput(exam));
        document.add(placeholder);
        document.add(separator);
        document.add(placeholder);
        document.add(profInput(exam,questions.size()));
        logger.info("Exam " + exam.getExam_id() + ": Cover sheet printed");


        //Questions
        for (QuestionsDto question : questions) {
            document.add(new AreaBreak());
            document.add(questionHeader(question));
            try {
                List<IElement> elements = HtmlConverter.convertToElements(question.getQuestionText());
                for (IElement element : elements) {
                    document.add((IBlockElement) element);}
            } catch (IOException e) {
                e.printStackTrace();
                logger.error("Exam " + exam.getExam_id() + ":Failed to convert question text at question " + question.getQuestionId());
            }
            document.add(questionBottom(question));
            logger.info("Exam " + exam.getExam_id() + ": Question " + question.getQuestionId() + ": printed");
        }
        logger.info("Exam " + exam.getExam_id() + ": All Questions printed");

        // Print Bottom: "Viel Erfolg"
        document.add(bottom(document, pdfDocument));
        logger.info("Exam " + exam.getExam_id() + ": Bottom printed");

        logger.info("Exam " + exam.getExam_id() + ": printed successfully");
        document.close();
    }

    /**
     * Returns a Table with the name and logo of the HFT Stuttgart
     *
     * @return title Table
     * @throws MalformedURLException if the logo cant be found in th directory
     */
    private static Table title() throws MalformedURLException {
        final String imageFile = "Backend/src/main/java/de/hft_stuttgart/winf/proj2/sp/backend/pdf_generator/HFTLogo.jpg";
        final Image hftLogo;

        hftLogo = new Image(ImageDataFactory.create(imageFile));

        hftLogo.setHorizontalAlignment(HorizontalAlignment.RIGHT);

        Paragraph titleName = new Paragraph();
        Text titleNameText = new Text("HOCHSCHULE FÜR TECHNIK STUTTGART");
        titleNameText.setFontSize(14);
        titleNameText.setBold();
        titleName.add(titleNameText);
        titleName.setHorizontalAlignment(HorizontalAlignment.LEFT);

        Table title = new Table(2);
        Cell titleNameCell = new Cell(1, 1).add(titleName);
        Cell titleImageCell = new Cell(1, 3).add(hftLogo);

        titleNameCell.setBorder(Border.NO_BORDER);
        titleNameCell.setVerticalAlignment(VerticalAlignment.MIDDLE);
        titleImageCell.setWidth(220);
        titleImageCell.setBorder(Border.NO_BORDER);
        title.addCell(titleNameCell);
        title.addCell(titleImageCell);
        return title;


    }

    /**
     * Returns the Header Paragraph of the Exam cover sheet
     *
     * @param exam ExamDto
     * @return Paragraph header
     */
    private static Paragraph header(ExamDto exam) {

        Paragraph p_header1 = new Paragraph();
        Text headerText1 = new Text(exam.getModule().getCourse().getCourseName() + ": \n" + exam.getTitle());
        headerText1.setFontSize(32);
        p_header1.add(headerText1);
        p_header1.setTextAlignment(TextAlignment.CENTER);
        return p_header1;
    }

    /**
     * Returns the Table for the Student inputs of the exam cover sheet
     *
     * @param exam ExamDto
     * @return Table studentInput
     */
    private static Table studentInput(ExamDto exam) {

        Paragraph pDate = new Paragraph("Datum:  " + format.format(exam.getExam_date()));
        Paragraph pName = new Paragraph("Name:");
        Paragraph pSemester = new Paragraph("Semester:");
        Paragraph pMtr = new Paragraph("Mtr. Nr.:");
        Paragraph pTester = new Paragraph("Prüfer:");

        Paragraph[] paragraphs = {pDate, pName, pSemester, pMtr, pTester};
        for (Paragraph paragraph : paragraphs) {
            paragraph.setFontSize(14);
        }

        Table studentInput = new Table(2);
        Cell date = new Cell(1, 2).add(pDate);
        Cell name = new Cell(1, 1).add(pName);
        Cell semester = new Cell(1, 2).add(pSemester);
        Cell mtr = new Cell(2, 1).add(pMtr);
        Cell tester = new Cell(1, 2).add(pTester);

        name.setWidth(265);

        Cell[] cells = {date, name, semester, mtr, tester};
        for (Cell cell : cells) {
            studentInput.addCell(cell);
            cell.setBorder(Border.NO_BORDER);
        }

        return studentInput;
    }

    /**
     * Returns the Table for the Professor inputs of the exam cover sheet
     *
     * @return Table profInput
     */
    private static Table profInput(ExamDto exam,Integer vNumberOfQuestions) {


        Paragraph pMaxPoints = new Paragraph("maximale Punkte: "+exam.getTotalPoints());
        Paragraph pReachedPoints = new Paragraph("erreichte Punkte:");
        Paragraph pNumberOfQuestions = new Paragraph("Anzahl Fragen: "+vNumberOfQuestions);
        Paragraph pMark = new Paragraph("Note:");

        Paragraph[] paragraphs = {pMaxPoints, pReachedPoints, pNumberOfQuestions, pMark};
        for (Paragraph paragraph : paragraphs) {
            paragraph.setFontSize(14);
        }
        Table profInput = new Table(2);
        Cell maxPoints = new Cell(1, 1).add(pMaxPoints);
        Cell numberOfQuestions = new Cell(1, 2).add(pNumberOfQuestions);
        Cell reachedPoints = new Cell(2, 1).add(pReachedPoints);
        Cell mark = new Cell(2, 2).add(pMark);

        maxPoints.setWidth(265);
        Cell[] cells = {maxPoints, numberOfQuestions, reachedPoints, mark};
        for (Cell cell : cells) {
            profInput.addCell(cell);
            cell.setBorder(Border.NO_BORDER);
        }

        return profInput;
    }

    /**
     * Prepares the "Viel Erfolg" Paragraph
     *
     * @param document Document:  Needs to get the Document passed by the writeExam()-Method
     * @param pdfDocument PdfDocument: Needs to get the pdfDocument passed by the writeExam()-Method to calculate the PageSize
     * @return bottom Paragraph
     */
    private static Paragraph bottom(Document document, PdfDocument pdfDocument) {
        Paragraph bottom = new Paragraph();
        Text bot1 = new Text("Viel Erfolg!!!");
        bot1.setFontSize(30);
        bottom.add(bot1);
        bottom.setTextAlignment(TextAlignment.CENTER);
        PageSize ps = pdfDocument.getDefaultPageSize();
        bottom.setFixedPosition(document.getLeftMargin(), document.getBottomMargin(), ps.getWidth() - document.getLeftMargin() - document.getRightMargin());
        return bottom;

    }

    /**
     * Prepares the Paragraph for the Header of a Question passed into the Method head
     *
     * @param question QuestionsDto: Needs to get a Question-Object passed by the writeExam()-Method
     * @return Paragraph questionHeader
     */
    private static Paragraph questionHeader(QuestionsDto question) {
        Text questionHeader1 = new Text(question.getShortName() + " - " + question.getQuestionName());
        Text questionHeader2 = new Text("\n" + question.getCategory());
        questionHeader1.setFontSize(20);
        questionHeader2.setFontSize(12);
        Paragraph questionHeader = new Paragraph();
        questionHeader.add(questionHeader1);
        questionHeader.add(questionHeader2);

        return questionHeader;

    }

    /**
     * Prepares the Paragraph for the Bottom of a Question passed into the Method head
     *
     * @param question QuestionsDto: Needs to get a Question-Object passed by the writeExam()-Method
     * @return questionBottom Paragraph
     */
    private static Paragraph questionBottom(QuestionsDto question) {
        Text questionBottom1 = new Text("(       /" + question.getQuestionPoints() + ")");
        questionBottom1.setFontSize(12);
        Paragraph questionBottom = new Paragraph();
        questionBottom.setTextAlignment(TextAlignment.RIGHT);
        questionBottom.add(questionBottom1);
        return questionBottom;
    }

}



