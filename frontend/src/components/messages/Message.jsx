import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

// eslint-disable-next-line react/prop-types
function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  // eslint-disable-next-line react/prop-types
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  // eslint-disable-next-line react/prop-types
  const formattedTime = extractTime(message.createdAt);
  // eslint-disable-next-line react/prop-types
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar"/>
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}  ${shakeClass} pb-2`}>{message.message}</div>
      <div className='chat-footer opacity-40 text-xs flex gap-1 items-center' style={{ color: 'white' }}>{formattedTime}</div>
    </div>
  )
}

export default Message
