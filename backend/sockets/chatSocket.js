const { Server } = require("socket.io");
const { createMessage } = require('../controllers/chatController')

// Store mapping of userId -> socketId
const userSocketMap = {};

function chatSocket(server) {

  server.on("connection", (socket) => {
    console.log(" A user connected:", socket.id);

    // Step 1: Register user with socketId
    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Step 2: Handle sending private messages
    socket.on("private-message", async ({ senderId, receiverId, message }) => {
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        server.to(receiverSocketId).emit("private-message", {
          senderId,
          message,
        });
        const newMessage = await createMessage(senderId, receiverId, message);
        console.log(`${senderId} → ${receiverId}: ${message}`);
      } else {
        console.log(`User ${receiverId} is not online`);
      }
    });

    // Step 3: Handle disconnection
    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);

      // Remove from userSocketMap
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          console.log(` Removed mapping for user ${userId}`);
        }
      }
    });
  });
}

module.exports = chatSocket;
