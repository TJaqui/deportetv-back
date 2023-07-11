const mongoose = require("mongoose"); 

const bcrypt = require("bcrypt");

const salRounds = 10;

const UserSchema = new mongoose.Schema({
	firstname: String,
    lastname: String,
    email: String,
    password: String,
});

UserSchema.pre("save", function (next) {
	if (this.isNew || this.isModified("password")) {
		const document = this;

		bcrypt.hash(document.password, salRounds, (err, hashedPassword) => {
			if (err) {
				next(err);
			} else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
	bcrypt.compare(password, this.password, function (err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
};


module.exports = mongoose.model("user",UserSchema);