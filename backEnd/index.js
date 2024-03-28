const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { writeFile } = require("node:fs");

const express = require("express");
const app = express();
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8, // 100 MB
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

const MySql = require("mysql2/promise");
const mysql = MySql.createPool({
    host: "localhost",
    database: "WhatsClone",
    user: "root",
    password: "root",
    enableKeepAlive: true,
});

let onlineUsers = {};

app.use(express.static(__dirname + "/uploads"));

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});

io.on("connection", async (socket) => {
    // console.log(socket.handshake.query);

    socket.on("upload", (file, callback) => {
        console.log(file); // <Buffer 25 50 44 ...>
        writeFile(__dirname + "/uploads", file, (err) => {
            callback({ message: err ? "failure" : "success" });
        });
    });

    socket.on("message", (msg) => {
        console.log(msg);

        if (msg.receiver in onlineUsers) {
            onlineUsers[msg.receiver].send(msg);
        }
    });

    socket.on("SignUp", async (msg) => {
        let _ = await mysql.query(`
            SELECT * FROM 
                users
            WHERE
                number="${msg.number}"
        `);

        if (_[0].length > 0) {
            socket.emit("SignUp", {
                status: "fail",
                reason: "number already registered",
            });
            return;
        }

        let success = await mysql.query(`
        INSERT INTO 
        users
            (
                name, 
                password, 
                number
            )
        VALUES
                (
                    "${msg.name}",
                    "${msg.password}",
                    "${msg.number}"
                )
        `);

        if (success[0].insertId) {
            socket.emit("SignUp", { status: "success" });
        }
    });

    socket.on("Login", async (msg) => {
        let _ = await mysql.query(`
            SELECT * FROM 
                users
            WHERE
                number="${msg.number}"
        `);

        if (_[0].length == 0) {
            socket.emit("Login", {
                status: "fail",
                reason: "number isn't registered",
            });
            return;
        }

        if (_[0][0].password == msg.password) {
            socket.emit("Login", { status: "success", userData: _[0][0] });
        } else {
            socket.emit("Login", {
                status: "fail",
                reason: "wrong password",
            });
        }
    });
});
