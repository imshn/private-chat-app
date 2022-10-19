import { useEffect, useState } from "react";
import { MainContainer } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UsersList from "./Chats/UsersList";
import Chat from "./Chats/Chat";
import { Text } from "@chakra-ui/react";

const Home = (props) => {
  const [messageInputValue, setMessageInputValue] = useState("");
  const userLocal = JSON.parse(localStorage.getItem("user"));
  return (
    <MainContainer responsive style={{ height: "100vh" }}>
      <UsersList />
      {props.chat == true ? (
        <Chat />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Text fontSize={"6xl"}>Welcome, {userLocal.username}!</Text>
          <Text fontSize={"2xl"}>Start Chatting with your friends!</Text>
        </div>
      )}
    </MainContainer>
  );
};

export default Home;
