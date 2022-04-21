const jwt = require('jsonwebtoken');
exports.checkLogin = (req, res, next) => {
    let {token} = req.session;
    req.session.url = req.protocol + '://' + req.get('host') + req.originalUrl;
    if(!token){
        res.redirect('/login');
    }else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if(err){
                res.redirect('/login');
            }else{
                req.decode = data;
                next();
            }
        })
    }
}
exports.checkMobileAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(403).json({msg: "token invalid!"});
            }
            req.decode = decode;
            next();
        });
    } else {
        return res.status(401).json({msg: "Token not found!"});
    }
}