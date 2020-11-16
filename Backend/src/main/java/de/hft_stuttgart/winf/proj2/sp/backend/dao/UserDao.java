package de.hft_stuttgart.winf.proj2.sp.backend.dao;

import lombok.*;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public class UserDao {
    private String username;
    private transient String password;
    @Setter
    private String mail;
    @Setter
    private String name;
    @Setter
    private String surname;

    public UserDao(){
    }
}