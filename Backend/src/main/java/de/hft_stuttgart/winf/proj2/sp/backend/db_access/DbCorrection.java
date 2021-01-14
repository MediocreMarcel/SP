package de.hft_stuttgart.winf.proj2.sp.backend.db_access;

import de.hft_stuttgart.winf.proj2.sp.backend.dto.CorrectionDTO;
import de.hft_stuttgart.winf.proj2.sp.backend.dto.ExamDto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.ResultSetMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class DbCorrection extends DbConnector {

    private static Logger logger = LogManager.getLogger(DbCorrection.class);

    /**
     * Calls parent constructor to get db access
     *
     * @throws IllegalArgumentException will be thrown if ip, user or password were not set by the setConnectionParameter method
     * @throws SQLException             will be thrown if connection to db could not be established
     */
    public DbCorrection() throws IllegalArgumentException, SQLException {
        super();
    }

    /**
     * Save the correction of one Question to the database. The CorrectionDTO will be passed as list. Every DTO Object represents
     * one evaluation criteria
     * @param corrections list of corrected evaluation criteria
     * @return boolean showing if the insertion/update was successfully
     * @throws SQLException thown if something sql related goes wrong
     */
    public boolean saveCorrections(List<CorrectionDTO> corrections) throws SQLException {
        conn.setAutoCommit(false);
        for (CorrectionDTO correction: corrections) {
            PreparedStatement getCorrection = conn.prepareStatement("REPLACE INTO is_corrected (matr_nr, exam_id, question_id, criteria_id, comments, reached_points, status) VALUES (?,?,?,?,?,?,?)");
            getCorrection.setInt(1, correction.getMatrNr());
            getCorrection.setInt(2, correction.getExamId());
            getCorrection.setInt(3, correction.getQuestionId());
            getCorrection.setInt(4, correction.getEvaluationCriteria().getCriteriaId());
            getCorrection.setString(5, correction.getComment());
            getCorrection.setFloat(6, correction.getReachedPoints());
            getCorrection.setString(7, correction.getStatus());
            if (getCorrection.executeUpdate() <= 0){
                conn.rollback();
                conn.setAutoCommit(true);
                return false;
            }
        }
        conn.commit();
        conn.setAutoCommit(true);
        return true;
    }

    /**
     * Load the all corrections of a exam
     * @param request exam which should be queried
     * @return list of list of corrections
     * @throws SQLException thrown if something sql related goes wrong
     */
    public List<List<CorrectionDTO>> getCorrection(ExamDto request) throws SQLException {
        List<List<CorrectionDTO>> returnList = new ArrayList<>();
        ResultSetMapper rsMapper = new ResultSetMapper();
        PreparedStatement getCorrection = conn.prepareStatement("SELECT * FROM is_corrected WHERE exam_id = ?");
        getCorrection.setInt(1, request.getExam_id());
        try {
            List<CorrectionDTO> allCorrections = rsMapper.mapResultSetToObject(getCorrection.executeQuery(), CorrectionDTO.class);
            List<Map<Integer,List<CorrectionDTO>>> groupedInMap =  allCorrections.stream().collect(Collectors.groupingBy(CorrectionDTO::getMatrNr, Collectors.groupingBy(CorrectionDTO::getQuestionId))).entrySet().stream().map(Map.Entry::getValue).collect(Collectors.toList());
            for (Map<Integer, List<CorrectionDTO>> entry: groupedInMap) {
                returnList.addAll(entry.entrySet().stream().map(Map.Entry::getValue).collect(Collectors.toList()));
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | InstantiationException e) {
            e.printStackTrace();
            logger.error(e);
        }
        return returnList;
    }
}
