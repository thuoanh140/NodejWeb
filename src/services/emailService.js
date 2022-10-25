require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (datasend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"On Cinema" <oncinemasp@gmail.com>',
        to: datasend.receiverEmail,
        subject: "Đặt vé xem phim thành công!",
        html: `
        <h3>Xin chào ${datasend.name}</h3>
        <p>Bạn đã đặt vé xem phim thành công trên On Cinema</p>
<p>Thông tin vé:</p>
<div><b>Phim: ${datasend.movieName}</b></div>
<div><b>Suất chiếu: ${datasend.showTime}</b></div>
<div><b>Ngày: ${datasend.date}</b></div>
<div><b>Rạp: ${datasend.theater}</b></div>
<div><b>Ghế: ${datasend.seat}</b></div>
<div><b>Thức ăn: ${datasend.food}</b></div>
<div><b>Tên PTTT: ${datasend.paymentName}</b></div>
<div>On Cinema chân thành cám ơn bạn! Chúc bạn xem phim vui vẻ!!!</div>

        `
    });
}

async function main() {

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}