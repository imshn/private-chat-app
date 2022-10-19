import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllUsers } from "../../../service/auth";
import userContext from "../../context/auth/userConext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Conversation,
  Avatar,
  Sidebar,
  Search,
} from "@chatscope/chat-ui-kit-react";
import socket from "../../../service/socketjs";

const UsersList = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const onSelectUser = () => {};
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllUsers().then((res) => {
      setLoading(false);
      setAllUsers(res.data.users);
      return;
    });
  }, []);
  return (
    <Sidebar position="left" scrollable={true}>
      <Search placeholder="Search..." />
      <ConversationList loading={loading}>
        {allUsers.map((alluser, index) => {
          let userLocal = JSON.parse(localStorage.getItem("user"));
          if (alluser._id == userLocal._id) return null;
          return (
            <Conversation
              name={alluser.username}
              key={index}
              info={""}
              onClick={() => {
                navigate("/" + alluser._id);
              }}
            >
              <Avatar status={socket.connected ? "available" : "away"} />
            </Conversation>
          );
        })}
      </ConversationList>
    </Sidebar>
  );
};
export default UsersList;
