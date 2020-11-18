package de.hft_stuttgart.winf.proj2.sp.backend.dto;

import de.hft_stuttgart.winf.proj2.sp.backend.util.Column;
import lombok.*;

import javax.validation.constraints.NotNull;

/**
 * This Class is for defining the User and correlating the correct DB-field to it
 */
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class UserDto {
    @NotNull
    @Column("user_id")
    private int user_id;
    @NotNull
    @Column("password")
    private String password;
    @Setter
    @Column("mail")
    private String mail;
    @Setter
    @Column("name")
    private String name;
    @Setter
    @Column("surname")
    private String surname;

    public UserDto(){
    }
}
