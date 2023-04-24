const User = require("../models/user");

exports.createForm = (req,res)=>{
    res.render("user/create");
}
exports.save= async (req,res)=>{
    let s = req.body;
    const file = req.file; // upload nhieu anh 1 luc: them "s"
    if(file)
    s.avatar= "/uploads/user/"+file.filename;
    let newUser = new User(s);
    try{
        await newUser.save();
        //send email
    await transport.sendMail({
        from:'Demo Node JS T2203E',
        to: 'phamduyhung.ftu@gmail.com', //user.email, muon nhieu nguoi thi "," o giua
        //cc:''  hoac bcc:'' tuong tu
        subject: "mail test",
        html: '<p> Mail send from demo</p>'
    });
        //end email
        res.redirect("/users")
    }catch (err){
        res.send(err);
    }
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