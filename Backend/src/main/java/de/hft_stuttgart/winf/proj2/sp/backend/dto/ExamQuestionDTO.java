package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExamQuestionDTO extends QuestionsDto {
    @Column("position")
    private Integer position;

    public ExamQuestionDTO() {
    }

    public ExamQuestionDTO(Integer questionId, String questionName, String shortName, String questionText, Float questionPoints, Integer module_ID, String category, Integer position) {
        super(questionId, questionName, shortName, questionText, questionPoints, module_ID, category);
        this.position = position;
    }
}
