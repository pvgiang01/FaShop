var nodemailer =  require('nodemailer');
const path = require('path');
const filePath = path.join(process.cwd(), '/public/images/logo.png');

var transporter =  nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'pvgiang9501.dev@gmail.com',
        pass: 'wmilitaiqiriqabr'
    }
});

exports.sendMail = (to, subject, html) => {
    var mailOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'FaShop',
        to: to,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
}

exports.sendOTP = (to, otp) => {
    var mailOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'FaShop',
        to: to,
        subject: 'Verify OTP code',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #f08d00;text-decoration:none;font-weight:600">
                <img src="cid:unique@hf.ee"/>
            </a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing gh FaShop. Use the following OTP to reset your password. OTP is valid for 3 minutes</p>
          <h2 style="background: #f08d00;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />FaShop</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>FaShop Inc</p>
            <p>123 Cong Vien Phan Mem Quang Trung </p>
            <p>Ho Chi Minh</p>
          </div>
        </div>
      </div>`,
        attachments: [{
            filename: 'logo.png',
            path: filePath,
            cid: 'unique@hf.ee' //same cid value as in the html img src
        }]
    }

    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
}