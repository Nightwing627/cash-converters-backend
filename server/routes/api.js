var express = require("express")
var router = express.Router()
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

const { SENDGRID_API } = require("../config/key")
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
)

router.get("/test", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send({ title: "test" })
})

router.post("/sendEmail", function (req, res, next) {
  const { title, name, email, phoneNumber } = req.body

  transporter
    .sendMail({
      to: process.env.FROM_ADDRESS,
      from: process.env.FROM_ADDRESS,
      subject: title,
      html: `
      <p><h3>${email}</h3></p>
      <p><h3>${name}</h3></p>
      <p><h3>${phoneNumber}</h3></p>
    `,
    })
    .then((mailResponse) => {
      if (mailResponse.message == "success") {
        res.send({ err_code: 0 })
      } else {
        res.send({ err_code: 1 })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({ err_code: 1 })
    })
})

module.exports = router
