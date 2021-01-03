package de.hft_stuttgart.winf.proj2.sp.backend.pdf_generator;


import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import de.hft_stuttgart.winf.proj2.sp.backend.db_access.DbQuestions;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.QuestionsDto;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class pdf_generator {
    private static final Logger logger = LogManager.getLogger(pdf_generator.class);

    // HTML DUMMY
    final static String questionText = "<!doctype html>\n" +
            "<html>\n" +
            "  <head>\n" +
            "    <meta charset=\"utf-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <title>Beschreibung der Seite (erscheint in der Titelzeile des Browsers)</title>\n" +
            "  </head>\n" +
            "  <body>\n" +
            "    <p>Dieser Text wird im Browserfenster angezeigt.</p>\n" +
            "  </body>\n" +
            "</html>\n";
    final static String questionText2 = "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<body>\n" +
            "\n" +
            "<h1>The autocomplete attribute</h1>\n" +
            "\n" +
            "<p>The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.</p>\n" +
            "\n" +
            "<p>Fill in and submit the form, then reload the page to see how autocomplete works.</p>\n" +
            "\n" +
            "<p>Notice that autocomplete is \"on\" for the form, but \"off\" for the e-mail field!</p>\n" +
            "\n" +
            "<form action=\"/action_page.php\" autocomplete=\"on\">\n" +
            "  <label for=\"fname\">First name:</label>\n" +
            "  <input type=\"text\" id=\"fname\" name=\"fname\"><br><br>\n" +
            "  <label for=\"lname\">Last name:</label>\n" +
            "  <input type=\"text\" id=\"lname\" name=\"lname\"><br><br>\n" +
            "  <label for=\"email\">Email:</label>\n" +
            "  <input type=\"email\" id=\"email\" name=\"email\" autocomplete=\"off\"><br><br>\n" +
            "  <input type=\"submit\" value=\"Submit\">\n" +
            "</form>\n" +
            "\n" +
            "</body>\n" +
            "</html>";

    // Prints Exam with list of Questions
    public static void writeExam(ExamDto exam, List<QuestionsDto> questions) throws IOException {
        //Dokument vorbereiten
        final String filename = "PDF/Exam_" + exam.getExam_id() + "_" + exam.getTitle() + ".pdf ";
        final PdfWriter pdfWriter = new PdfWriter(filename);
        final PdfDocument pdfDocument = new PdfDocument(pdfWriter);

        //Bild HFT Logo vorbereiten
        final String imageFile = "Backend/src/main/java/de/hft_stuttgart/winf/proj2/sp/backend/pdf_generator/HFTLogo.jpg";
        final Image hftLogo = new Image(ImageDataFactory.create(imageFile));
        hftLogo.setHorizontalAlignment(HorizontalAlignment.CENTER);


        //Header vorbereiten
        Paragraph p_header1 = new Paragraph();
        Text headerText1 = new Text("Module.Course: " + exam.getTitle());
        //Paragraph header = new Paragraph(DbModule.getModule(exam.getExam_id())+": "+exam.getTitle());
        headerText1.setFontSize(32);
        p_header1.add(headerText1);
        p_header1.setTextAlignment(TextAlignment.CENTER);

        Paragraph p_header2 = new Paragraph();
        Text headerText2 = new Text("\nDatum: " + exam.getExam_date() + "\nName:              \nMtr. Nr:                     Semester: ");
        headerText2.setFontSize(24);
        p_header2.add(headerText2);

        //Bottom vorbereiten
        Paragraph bottom = new Paragraph();
        Text bot1 = new Text("Viel Erfolg!!!");
        bot1.setFontSize(30);
        bottom.add(bot1);
        bottom.setTextAlignment(TextAlignment.CENTER);

        //PLatzhalter design
        Paragraph platz = new Paragraph("\n");


        //Dokument erstellen
        try (final Document document = new Document(pdfDocument)) {
            logger.info("Exam " + exam.getExam_id() + ": " + filename + " created");


            //hftLogo + Header   print
            document.add(hftLogo);
            document.add(platz);
            document.add(p_header1);
            document.add(p_header2);
            logger.info("Exam " + exam.getExam_id() + ": Header printed");
            document.add(platz);


            // Questions  dummy
     /*       List<QuestionsDto> questions = new ArrayList<>();
            questions.add(new QuestionsDto(11, "QuestionName", "ShortName", "questionText", 8.5f, 1, "Category"));
            questions.add(new QuestionsDto(12, "QuestionName2", "ShortName2", "questionText2", 8.5f, 2, "Category2"));
            questions.get(0).setQuestionText(questionText);
            questions.get(1).setQuestionText(questionText2);*/

            //Statt Questionsdummy finaL VERWENDEN !!!!

            System.out.println(questions);
            //Questions print
            for (QuestionsDto question : questions) {
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
/*                List<IElement> elements = HtmlConverter.convertToElements(question.getQuestionText());
                for (IElement element : elements) {
                    document.add((IBlockElement) element);
                }*/

                //Bottom
                Text questionBottom1 = new Text("(       /" + question.getQuestionPoints() + ")");
                questionBottom1.setFontSize(12);
                Paragraph questionBottom = new Paragraph();
                questionBottom.setTextAlignment(TextAlignment.RIGHT);
                questionBottom.add(questionBottom1);
                document.add(questionBottom);
                logger.info("Exam " + exam.getExam_id() + ": Question " + question.getQuestion_id() + ": printed");
                document.add(platz);
            }
            logger.info("Exam " + exam.getExam_id() + ": All Questions printed");

            // Bottom  print  (EXAM)
            document.add(bottom);
            logger.info("Exam " + exam.getExam_id() + ": Bottom printed");

        } catch (Exception e) {
            logger.error(e);
        }
        logger.info("Exam " + exam.getExam_id() + ": printed sucessfully");
    }


}



