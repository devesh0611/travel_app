import Message from "../models/Message.js";
import TravelPlan from "../models/TravelPlans.js";

export const startChat = async (req, res) => {
    try {
        const { userTpId, friendTpId } = req.params;
        const tp1 = await TravelPlan.findById(userTpId).populate("user");
        const tp2 = await TravelPlan.findById(friendTpId).populate("user");

        if (!tp1 || !tp2) {
            return res.status(404).json({ message: "Travel plans not found" });
        }

        const userId = tp1.user.id;
        const friendId = tp2.user.id;

        const convoId = [userId, friendId].sort().join("_");

        // ⚠️ DO NOT put io.on("connection") here — only return convoId
        res.json({ message: "Chat started", room: convoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createMessage = async (senderId, receiverId, text) => {
    try {
        const message = new Message({
            senderId,
            receiverId,
            message : text,
            timestamp: Date.now(),
        });
        await message.save();
        return message;
    } catch (err) {
        console.error("Error saving message:", err);
        throw err;
    }
};

export const getMessages = async (req, res) => {
    try {
        const { tpId1, tpId2 } = req.params;
        const tp1 = await TravelPlan.findById(tpId1).populate("user");
        const tp2 = await TravelPlan.findById(tpId2).populate("user");

        if (!tp1 || !tp2) {
            return res.status(404).json({ message: "Travel plans not found" });
        }

        const userId1 = tp1.user._id;
        const userId2 = tp2.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
