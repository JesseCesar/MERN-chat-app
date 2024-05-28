import Conversation from "./Conversation"
import useGetConversations  from "../../hooks/useGetConversations"
import { getRandomEmoji } from "../../utils/emojis";

function Conversations() {
  const {loading, conversations} = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
        key={conversation._id}
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastindex={index === conversations.length - 1}/>
      ))}

      {loading? <span className="loading loading-spinner mx-auto"></span>: null}

    </div>
  )
}

export default Conversations
