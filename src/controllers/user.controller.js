const Student = require("../models/student");
const nodemailer = require("nodemailer");
const config_mail = {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:'phamduyhung.ftu@gmail.com',
        pass: 'gzsldowxrsrliwod'

    }
};
const transport = nodemailer.createTransport(config_mail);
exports.get= async function (req,res){ //nếu thêm async thì là hàm xử lý bất đồng bộ
    try{
    const ls1= await Student.find({});
    const ls2 = await Student.find({name: "Casko123"});
        res.send({
            list1: ls1,
            list2: ls2
        });
    }catch(err){
        res.send(err);
    }
}

exports.createForm = (req,res)=>{
    res.render("student/create");
}
exports.save= async (req,res)=>{
    let s = req.body;
    const file = req.file; // upload nhieu anh 1 luc: them "s"
    if(file)
    s.avatar= "/uploads/student/"+file.filename;
    let newStudent = new Student(s);
    try{
        await newStudent.save();
        //send email
    await transport.sendMail({
        from:'Demo Node JS T2203E',
        to: 'phamduyhung.ftu@gmail.com', //student.email, muon nhieu nguoi thi "," o giua
        //cc:''  hoac bcc:'' tuong tu
        subject: "mail test",
        html: '<p> Mail send from demo</p>'
    });
        //end email
        res.redirect("/students")
    }catch (err){
        res.send(err);
    }
};
exports.editForm =(req,res)=>{
    let id = req.params.id;
    Student.findById(id).then(rs=>{
        res.render("student/edit",{
            data: rs
        });
    }).catch(err=>{
        res.send(err);
    })
}
exports.update =(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    Student.findByIdAndUpdate(id,data)
        .then(rs=>res.redirect("/students"))
        .catch(err=>res.send(err));
}
exports.delete=(req,res)=>{
    let id = req.params.id;
    Student.findByIdAndDelete(id)
        .then(rs=>res.redirect("/students"))
        .catch(err=>res.send(err));
}