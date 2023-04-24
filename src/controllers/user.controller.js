const User = require("../models/user");

exports.get= (req,res)=>{
    User.find({}).then(rs=>{
        res.render("user/list",{
            items: rs
        });
    }).catch(err=>{
        res.send(err);
    });
}

exports.createForm = (req,res)=>{
    res.render("user/create");
}
exports.save= (req,res)=>{
    let s = req.body;
    let newUser = new User(s);
    newUser.save().then(rs=>{
        res.redirect("/users");
    }).catch(err=>{
        res.send(err);
    })
};
exports.editForm =(req,res)=>{
    let id = req.params.id;
    User.findById(id).then(rs=>{
        res.render("user/edit",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
}
exports.update =(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    User.findByIdAndUpdate(id,data)
        .then(rs=>res.redirect("/users"))
        .catch(err=>res.send(err));
}
exports.delete=(req,res)=>{
    let id = req.params.id;
    User.findByIdAndDelete(id)
        .then(rs=>res.redirect("/users"))
        .catch(err=>res.send(err));
}