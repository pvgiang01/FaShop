var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/users');
const otpController = require('../controllers/otp')
const auth = require('../middle/authen')
const bcrypt = require('bcrypt')
const mailer = require('../utils/nodemailer')
router.post("/sign-up", async function (req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
        let u = await userController.getUserByEmail(email);
        if (!u) {
            if (password.length >= 6) {
                try {
                    userController.addNewUser(email, password);
                } catch (err) {
                    console.log(err);
                }
                res.status(200).json({ success: true, msg: "Your account was created!" });
            } else {
                res.status(401).json({ success: false, msg: "Password is invalid!" });
            }
        } else {
            return res
                .status(401)
                .json({ success: false, msg: "This account is already!" });
        }
    } else {
        return res.status(404).json({ success: false, msg: "Input invalid!" });
    }
});

router.post("/login", async function (req, res) {
    const { email, password } = req.body;
    console.log("email", req.body);
    let u = await userController.getUserByEmail(email);
    if (u) {
        let isValid = await bcrypt.compareSync(password, u.password);
        if (isValid) {
            //login success
            let token = jwt.sign(
                {
                    email: u.email,
                    image: u.image,
                    name: u.name,
                    phone: u.phone,
                    active: u.active,
                    address: u.address,
                },
                process.env.JWT_SECRET_KEY
            );
            res.status(200).json({ success: true, access_token: token });
        } else {
            //login fail
            res.status(401).json({ success: false, msg: "password is not match!" });
        }
    } else {
        //login fail
        return res
            .status(401)
            .json({ success: false, msg: "password is not match!" });
    }
});
router.post("/updateProfile", async function (req, res, next) {
    const { name, email, phone, image, address } = req.body;
    console.log("req", req.body);
    let u = await userController.getUserByEmail(email);
    if (!u) {
        res.status(401).json({ success: false, msg: "User not found" });
    } else {
        if (name.length == 0) {
            res.status(401).json({ success: false, msg: "Name must not be empty" });
        }
        let user = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            address: address,
        };
        await userController.updateProfile(user);
        let token = jwt.sign(
            {
                email: u.email,
                image: image,
                name: name,
                phone: phone,
                address: address,
            },
            process.env.JWT_SECRET_KEY
        );
        console.log("tokenn", token);
        res.status(200).json({
            profile: user,
            success: true,
            access_token: token,
            msg: "update success!",
        });
    }
});

router.post('/get-otp', async function (req, res, next) {
    let { email } = req.body;
    let user = await userController.getUserByEmail(email)
    if (user) {
        let otp = await otpController.generateOTP(email);
        mailer.sendOTP(email, otp);
        res.status(200).json({ success: true, data: otp });
    } else {
        res.status(401).json({ success: false, msg: "Email not found!" });
    }
})
router.post("/check", auth.checkMobileAuthentication, async function (req, res, next) {
    return res.json({ success: true, data: req.decode });
}
);
router.post('/change-password', async function (req, res, next) {
    let { oldP, newP, newP2, email, forgot } = req.body;
    console.log(req.body);
    let user = await userController.getUserByEmail(email)
    console.log(user);
    if (user && newP && oldP && newP2) {
        if (!forgot) {
            // check old password
            let pCompare = bcrypt.compareSync(oldP, user.password)
            if (!pCompare) {
                return res.status(401).json({ success: false, msg: "Current password does not match!" })
            }
        }
        // validate new password
        if (newP.length < 6 || newP2.length < 6) {
            return res.status(401).json({ success: false, msg: "Min 6 characters!" });
        }
        if (newP == oldP) {
            return res.status(401).json({ success: false, msg: "New password and current password must be different!" });
        }
        if (newP != newP2) {
            return res.status(401).json({ success: false, msg: "New password does not match!" });
        }
        // handle update password
        userController.changePassword(email, newP);
        return res.status(200).json({ success: true, msg: "Update password success!" });
    } else {
        return res.status(401).json({ success: false, msg: "Data invalid!" });
    }
})
module.exports = router;