const Users = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const salt = '$2a$10$Q/AH0MPPKyMVNzshASojgO'

module.exports = {
    register(req, res) {
        if (!req.body) {
            return res.send({
                error: true,
                message: ["Error"],
                type: "danger"
            })
        }
        if (req.body.password !== req.body.comfirmPassword) {
            return res.send({
                error: true,
                message: ["Passwords do not match"],
                type: "danger"
            })
        }
        Users.findOne({
            username: req.body.username
        }, function (err, response) {
            if (err) {
                return res.send({
                    error: true,
                    message: err,
                    type: "danger"
                })
            }
            if (!response) {
                req.body.password = bcrypt.hashSync(req.body.password, salt);
                Users.create(req.body, function (err, response) {
                    if (err) {
                        let errorsArray = [];
                        for (var property in err.errors) {
                            errorsArray.push(err.errors[property].message);
                        }
                        return res.send({
                            error: true,
                            message: errorsArray,
                            type: "danger"
                        })
                    } else {
                        response.password = null;
                        return res.status(200).send(response);
                    }
                });

            } else {
                return res.send({
                    message: 'User Already Exsists.',
                    type: "danger"
                });
            }
        });
    },
    signIn(req, res) {
        if (!req.body) {
            return res.send({
                error: true,
                message: ["Error"],
                type: "danger"
            })
        }
        Users.findOne({
            username: req.body.username
        }, function (err, response) {
            if (err) {
                return res.send({
                    error: true,
                    message: err,
                    type: "danger"
                })
            }
            if (response) {
                if(bcrypt.compareSync(req.body.password, response.password)){
                    response.password = null;
                    return res.status(200).send(response);
                }else{
                    return res.send({
                        error: true,
                        message: ['Username or Password incorrect'],
                        type: "danger"
                    });
                }
            } else {
                return res.send({
                    error: true,
                    message: ['Username or Password incorrect'],
                    type: "danger"
                });
            }
        });
    }
}