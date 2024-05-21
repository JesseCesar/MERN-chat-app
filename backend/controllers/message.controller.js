import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';



export const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({participants: { $all: [senderId, receiverId] }})

    if(!conversation) {
      conversation = await Conversation.create({participants: [senderId, receiverId]});
    }

    const newMessage = new Message({senderId, receiverId, message})

    if(newMessage) {
      conversation.messages.push(newMessage._id);
      // await conversation.save();
      // await newMessage.save();
      await Promise.all([conversation.save(), newMessage.save()]);
      res.status(201).json(newMessage);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({participants: { $all: [senderId, receiverId] }}).populate('messages');

    if(!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}