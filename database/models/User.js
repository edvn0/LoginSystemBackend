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

<<<<<<< HEAD
module.exports = User;
=======
export default User;
>>>>>>> 3cf9834cf456c6020bcf43d6943cb4037725bc96
