const nodemailer = require("nodemailer");

function date(data) {
    let newDate = data.toISOString().substring(0, 10);
    return newDate;
}

// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: "dairypost@outlook.com",
//     pass: "Berandal89",
//   },
// });

// let option = {
//   from: "dairypost@outlook.com",
//   to: "ignasiusberneo95@gmail.com",
//   subject: "Registration Sucess!",
//   text: `Welcome to the jungle`,
// };
// transporter.sendMail(option, (err, info) => {
//   if (err) {
//     console.log(err);
//     return;
// }
// });

module.exports = { date };
