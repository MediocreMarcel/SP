package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode
public class CreateQuestionDTO extends QuestionsDto {

    private List<QuestionCriteriaDTO> evaluationCriterias;

    public CreateQuestionDTO(Integer questionId, String questionName, String shortName, String questionText, Float questionPoints, Integer module_ID, String category, List<QuestionCriteriaDTO> evaluationCriterias) {
        super(questionId, questionName, shortName, questionText, questionPoints, module_ID, category);
        this.evaluationCriterias = evaluationCriterias;
    }

    public CreateQuestionDTO() {
    }
}
