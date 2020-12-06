export class User {
  user_id: string;
  password: string;
  name: string;
  surname: string;
  mail: string;

  setUser(user_id, password, name, surname, mail) {
    this.user_id = user_id;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.mail = mail;
  }
}
