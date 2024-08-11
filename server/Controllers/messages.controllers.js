import Message from "../Models/message.js";

const sendmessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const newMessage = new Message({
      firstName,
      lastName,
      email,
      phone,
      message,
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getmessage = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
  }
};

const getmessageById = async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ message: "Message not found" });
  res.json(message);
};

export { sendmessage, getmessage, getmessageById };
