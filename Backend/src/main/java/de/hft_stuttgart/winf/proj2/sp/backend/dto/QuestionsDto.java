package de.hft_stuttgart.winf.proj2.sp.backend.dto;
import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;


@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class QuestionsDto {
    @Column("question_id")
    private String question_id;
    @Column("name")
    private String questionName;
    @Column("text")
    private String questionText;
    @Column("default_points")
    private Float questionPoints;
    @Column("module_id")
    private Integer module_ID;

    public QuestionsDto(){

    }



}
