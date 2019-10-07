(function () {
  class User {
    constructor(email, password, inDate) {
      this.insertedDate = inDate;
      this.email = email;
      this.password = password;
    }

    get email() {
      return this.email;
    }

    get password() {
      return this.password;
    }

    get insertedDate() {
      return this.insertedDate;
    }

    set email(email) {
      this._email = email;
    }

    set password(pass) {
      this._password = pass;
    }

    set insertedDate(date) {
      this._insertedDate = date;
    }


  }

  module.exports = User
})();