package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString(callSuper = true)
@EqualsAndHashCode
public class QuestionWithAveragePointsDTO {

    @Column(value="question", isObject = true)
    private ExamQuestionDTO question;
    @Column("AVG")
    private double avg;

    public QuestionWithAveragePointsDTO() {
    }
}
