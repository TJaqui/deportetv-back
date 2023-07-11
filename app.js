require("dotenv").config()

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', require('./routes/routes'))

app.post("/register", (req, res) => {
	const { email, password } = req.body;

	const user = new User({ email, password });

	user.save((err) => {
		if (err) {
			res.status(500).send("Error al registrar al usuario");
		} else {
			res.status(200).send(JSON("Usuario registrado"));
		}
	});
});

app.post("/authenticate", (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }, (err, user) => {
		if (err) {
			res.status(500).send("Error al autenticar al usuario");
		} else if (!user) {
			res.status(404).send("El usuario no existe");
		} else {
			user.isCorrectPassword(password, (err, result) => {
				if (err) {
					res.status(500).send("Error al autenticar");
				} else if (result) {
					res.status(200).send("Usuario autenticado correctamente");
				} else {
					res.status(500).send("Usuario y/o contraseña incorrecto");
				}
			});
		}
	});
});
mongoose.connect(process.env.URI_DB).then(() => {
    console.log("se ha establecido conexion");
}).catch((err) => {
    console.error(err);
});
app.listen(port, () => {
    console.log(`servidor escucha desde htpp://127.0.0.1:${port}`);
})