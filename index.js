// const connectToMongo=require("./mongodb")
// const express=require("express")
// const cors=require('cors')
// connectToMongo();

// const app=express()
// app.use(express.json())
// app.use(cors())


// const http = require('http');
// const path = require('path')

// const { Server } = require('socket.io')

// // const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// var user = {};

// io.on('connection', (socket) => {
//     socket.on("massage", (massage) => {
//         socket.broadcast.emit("massage", massage)
//         console.log(massage)
//     })
//     socket.on('newuser', (username) => {
//         user[socket.id] = username;
//         console.log("new user")
//         socket.broadcast.emit("newuser", username)
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit("user-disconnected", (user[socket.id]))
//        delete user[socket.id]
//     })
// })



// // app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));




// //available routes
// app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/note'));
// app.use('/api/image',require('./routes/image'));


// app.get('/login.html', (req, res) => {
//     res.sendFile(__dirname+'/login.html')
//  })
//  app.get('/index.html', (req, res) => {
//     res.sendFile(__dirname+'/index.html')
//  })

// //  path.resolve('./public')
//  app.get('/home.html', (req, res) => {
//     // console.log("user found")
//     res.sendFile(__dirname+'/home.html')
//  })


// app.listen(3000,()=>{
//     console.log("your server listening on port 3000")
// })

const connectToMongo = require("./mongodb");
const express = require("express");
const cors = require("cors");
const http = require("http"); // Import http module
const path = require("path");

// const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create an HTTP server
// const io = new Server(server);

connectToMongo();

app.use(express.json());
app.use(cors());



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));
app.use("/api/image", require("./routes/image"));



// Serve HTML files
// app.get("/login.html", (req, res) => {
//     res.sendFile(__dirname + "/login.html");
// });
// app.get("/index.html", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });
// app.get("/edit.html", (req, res) => {
//     res.sendFile(__dirname + "/edit.html");
// });
// const http = require('http');
// const express = require('express');
// const path = require('path')

const { Server } = require('socket.io')

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);  

// var user = {};

// io.on('connection', (socket) => {
//     socket.on("massage", (massage) => {
//         socket.broadcast.emit("massage", massage)
//         console.log(massage)
//     })
//     socket.on('newuser', (username) => {
//         user[socket.id] = username;
//         console.log("new user"+username)
//         socket.broadcast.emit("newuser", username)
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit("user-disconnected", (user[socket.id]))
//        delete user[socket.id]
//     })
// })


// app.use(express.static(path.resolve("public")));

// app.get('/', (req, res) => {
//    res.sendFile(__dirname+'./public/index')
// })

// app.get('/new', (req, res) => {
//     res.sendFile(__dirname+'/public/index.html')
//  })

// server.listen(8000, () => console.log("server started"))

const io = require('socket.io')(server);

// To store online users
const onlineUsers = {};

io.on('connection', (socket) => {

    console.log("new user")
    // Handle when a user connects
    socket.on('join', (username) => {
        // Store the socket ID in the onlineUsers object
        onlineUsers[username] = socket.id;

        // Emit an event to update the online status on the client-side
        io.emit('updateOnlineUsers', Object.keys(onlineUsers));
    });

    // Handle when a user disconnects
    socket.on('disconnect', () => {
        // Find and remove the socket ID from the onlineUsers object
        const userId = Object.keys(onlineUsers).find(
            (key) => onlineUsers[key] === socket.id
        );

        if (userId) {
            delete onlineUsers[userId];
            // Emit an event to update the online status on the client-side
            io.emit('updateOnlineUsers', Object.keys(onlineUsers));
        }
    });

    socket.on('privateMessage', ({ username, toUserName, message }) => {
        console.log("pm ke ander se : " + username + " " + toUserName + " " + message);
        const toUserSocket = onlineUsers[toUserName];
        if (toUserSocket) {
            // Send the private message to the recipient
            io.to(toUserSocket).emit('privateMessage', {
                fromusername: username,
                message: message,
            });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// server.listen(8000, () => console.log("server started"))




// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

