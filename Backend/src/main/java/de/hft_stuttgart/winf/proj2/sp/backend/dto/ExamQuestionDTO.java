package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ExamQuestionDTO extends QuestionsDto {
    @Column("position")
    private Integer position;

    public ExamQuestionDTO() {
    }
}
