import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";


// eslint-disable-next-line react/prop-types
function Conversation({conversation, emoji, lastindex}) {
  const {selectedConversation, setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

  return <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
    ${isSelected? "bg-sky-500" : ""}`} onClick={() => {
      console.log('Conversation:', conversation);
      setSelectedConversation(conversation)}}>
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src={conversation.profilePicture} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{conversation.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>
    </div>
    {!lastindex && <div className="divider my-0 py-0 h-1"/>}



    </>;
}

export default Conversation
