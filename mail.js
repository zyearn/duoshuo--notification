var nodemailer = require("nodemailer");
 
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "smtp.126.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: "xx@126.com", // 账号
        pass: "xx" // 密码
    }
});
 
// 设置邮件内容
 
// 发送邮件
module.exports = function(html){
smtpTransport.sendMail({
        from: "xx@126.com", // 发件地址
        to: "895038820@qq.com", // 收件列表
        subject: "Hello world", // 标题
        html: html
    }, 
    function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
}
