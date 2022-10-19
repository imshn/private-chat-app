import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from "react-router-dom";
import socket from "../../../service/socketjs";
import { useEffect, useState, useContext, useCallback } from "react";
import userContext from "../../context/auth/userConext";
import { getMessages } from "../../../service/chat";
import { getUser } from "../../../service/auth";
const Chat = (props) => {
  const [chatMsg, setChatMsg] = useState();
  const [messageList, setMessageList] = useState([]);
  const [recived, setRecived] = useState();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [messageInputValue, setMessageInputValue] = useState("");
  const [selected, setSelected] = useState();
  const { id } = useParams();

  const sendMsg = () => {
    console.log(messageInputValue);

    socket.emit("private", messageInputValue);
  };

  useEffect(() => {
    socket.on("private", (data) => {
      console.log(data, "pr");
      setMessageList([...messageList, data]);
    });

    getUser(id).then((user) => {
      setSelected(user.data.user);
      return;
    });
    // getMessages(localUser._id, id).then((res) => {
    //   if (res.status == 200) {
    //     setMessageList([...res.data.messages]);
    //   }
    // });
  }, [id]);

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar name={selected?.username} />
        <ConversationHeader.Content
          userName={selected?.username}
          info="Active 10 mins ago"
        />
      </ConversationHeader>
      <MessageList
        typingIndicator={<TypingIndicator content="Zoe is typing" />}
        style={{ padding: 10 }}
        scrollBehavior={"smooth"}
        autoScrollToBottomOnMount={true}
        autoScrollToBottom={true}
      >
        {messageList.map((data, index) => {
          return (
            <Message
              key={index}
              model={{
                message: data.message,
                // sentTime: "15 mins ago",
                sender: data._id,
                direction: data.from != localUser._id ? "incoming" : "outgoing",
                position: "first",
              }}
            />
          );
        })}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue?.message}
        onChange={(val) =>
          setMessageInputValue({
            from: localUser._id,
            to: selected._id,
            message: val,
          })
        }
        onSend={() => sendMsg()}
      />
    </ChatContainer>
  );
};
export default Chat;
