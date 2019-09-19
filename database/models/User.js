class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  get email() {
    return this.email;
  }

  get password() {
    return this.password;
  }

  set email(email) {
    this.email = email;
  }

  set password(password) {
    this.password = password;
  }
}

module.exports = User;
