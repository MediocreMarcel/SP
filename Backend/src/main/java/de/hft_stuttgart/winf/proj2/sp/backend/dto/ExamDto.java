package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import java.util.Date;


/**
 * This Class is for defining a Exam and correlating the correct DB-field to it
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class ExamDto {
    @Column("exam_id")
    private Integer exam_id;
    @Column("name")
    private String name;
    @Column("creation_date")
    private Date creation_date;
    @Column("exam_date")
    private Date exam_date;
    @Column("status")
    private  String status;

    public ExamDto(){


    }
}


