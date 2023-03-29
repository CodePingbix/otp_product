require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});
var otp = Math.floor(100000 + Math.random() * 900000);
var first = "xyz";
var last = "xyz";
var email = "xyz";
var phone = "xyz";
let message = `Thank you for registering, Your  OTP is ${otp} please verify.`;
app.post("/generateotp", function (req, res) {
  res.render("verify");
  first = req.body.first;
  last = req.body.last;
  email = req.body.email;
  phone = req.body.phone;
  // var formdata = new FormData();
  // formdata.append("userid", process.env.USER_ID);
  // formdata.append("password", process.env.PASSWORD);
  // formdata.append("msg", message);
  // formdata.append("wabaNumber", "919910112899");
  // formdata.append("output", "json");
  // formdata.append("mobile", req.body.phone);
  // formdata.append("sendMethod", "quick");
  // formdata.append("msgType", "text");
  // formdata.append("templateName", "otp_1");

  // var requestOptions = {
  //   method: "POST",
  //   body: formdata,
  //   redirect: "follow",
  // };

  // fetch("https://app.pingbix.com/WAApi/send", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  console.log(otp);
});

app.post("/verify-otp", (req, res) => {
  // Verify the OTP code
  let otp_recieved =
    req.body.box1 +
    req.body.box2 +
    req.body.box3 +
    req.body.box4 +
    req.body.box5 +
    req.body.box6;
  console.log(otp_recieved);
  if (otp.toString() == otp_recieved.toString()) {
    res.redirect(
      `https://wa.me/7870020769?text= My name is ${first} ${last} .My contact number is ${phone} and my email is ${email}`
    );
  } else {
    res.send("wrong OTP");
  }
});

app.listen(3000, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
