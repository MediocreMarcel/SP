package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;

import java.util.Date;


/**
 * This Class is for defining a Exam and correlating the correct DB-field to it
 */
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ExamDto {

    @Column("exam_id")
    private Integer exam_id;
    @Column("title")
    private String title;
    @Column("creation_date")
    private Date creation_date;
    @Column("exam_date")
    private Date exam_date;
    @Column("status")
    private String status;
    @Column("module_id")
    private Integer moduleId;
    @Column("total_points")
    private Integer totalPoints;

    @Setter
    private ModuleDto module;


    public ExamDto(){


    }
}


