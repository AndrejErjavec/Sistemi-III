const express = require("express");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const cors = require("cors");
app.use(
	cors({
		origin: ["http://88.200.63.148:3056"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

app.use(cookieParser("somesecret"));
app.use(
	session({
		secret: "somesecret",
		resave: true,
		saveUninitialized: true,
		cookie: { expire: 60 * 2 },
	})
);

// import my custom modules
const novice = require("./routes/novice");
const users = require("./routes/users");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("<h1>Welcome!</h1>");
	res.end();
});

app.use("/novice", novice);
app.use("/users", users);

const PORT = process.env.PORT || 5056;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
