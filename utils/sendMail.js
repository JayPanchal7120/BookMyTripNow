const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

module.exports = (toMail, subject, htmlFile, name, url) => {
	const handlebarsOptions = {
		viewEngine: {
			extName: ".html",
			defaultLayout: "", //set this one empty and provide your template below,
		},
		viewPath: path.join(__dirname, "/Mailtemplate"),
		extName: ".html",
	};

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		// host: "smtp.ethereal.email",
		// port: 587,
		// secure: false,
		auth: {
			user: process.env.EMAIL_ID,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	// console.log(process.env.EMAIL_ID,process.env.EMAIL_PASSWORD)

	//   let info = await transporter.sendMail({
	//     from: '"Jay 👻" <process.env.EMAIL_ID>', // sender address
	//     to: toMail, // list of receivers
	//     subject: subject, // Subject line
	//     text: "Hello world", // plain text body
	//     html: `<b>Hi ${name} this is from bookmytripnow</b>
	//             This is url ${url}
	//     `, // html body
	//   });

	//   console.log("Message sent: %s", info.messageId);

	//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

	transporter.use("compile", hbs(handlebarsOptions));
	var mail = {
		to: toMail,
		from: process.env.EMAIL_ID,
		subject: subject,
		template: htmlFile,
		context: {
			url: url,
			name: name,
		},
	};

	// const main = () => {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mail, (err, info) => {
			console.log("File: sendMail.js");
			console.log(`Error: ${err}`);
			let msg = "";
			if (err) {
				msg = "Some Error occurs in Sending Verification Mail!";
				reject(err, msg);
			} else {
				msg =
					"Verification Email has been sent Please verify account to login";
				resolve(msg);
			}
			console.log(`Information: ${JSON.stringify(info)}`);
		});
	});
	// };
	// console.log(msg);
};
