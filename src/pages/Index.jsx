import React, { useState } from "react";
import { Box, VStack, HStack, Text, Avatar, Input, Button, Divider, Heading } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatMessage = ({ message, sender }) => (
  <Box bg={sender === "me" ? "blue.500" : "gray.100"} color={sender === "me" ? "white" : "black"} borderRadius="lg" p={2} alignSelf={sender === "me" ? "flex-end" : "flex-start"}>
    {message}
  </Box>
);

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "me" }]);
      setInputMessage("");
    }
  };

  return (
    <VStack h="100vh" p={4} spacing={4}>
      <VStack flex={1} w="100%" overflowY="auto" spacing={2}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} sender={message.sender} />
        ))}
      </VStack>
      <HStack w="100%">
        <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." />
        <Button onClick={sendMessage} colorScheme="blue">
          <FaPaperPlane />
        </Button>
      </HStack>
    </VStack>
  );
};

const ChatListItem = ({ name, lastMessage, onClick }) => (
  <Box onClick={onClick} cursor="pointer" borderBottomWidth={1} borderColor="gray.200" p={4} _hover={{ bg: "gray.100" }}>
    <HStack>
      <Avatar name={name} />
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          {lastMessage}
        </Text>
      </VStack>
    </HStack>
  </Box>
);

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <HStack h="100vh" spacing={0}>
      <VStack h="100%" borderRightWidth={1}>
        <Heading size="md" p={4}>
          Chats
        </Heading>
        <Divider />
        <VStack overflowY="auto" w="100%">
          <ChatListItem name="John Doe" lastMessage="Hey, how are you?" onClick={() => setSelectedChat("John Doe")} />
          <ChatListItem name="Jane Smith" lastMessage="See you later!" onClick={() => setSelectedChat("Jane Smith")} />
        </VStack>
      </VStack>
      <Box flex={1}>
        {selectedChat ? (
          <ChatScreen />
        ) : (
          <VStack h="100%" justify="center">
            <Text>Select a chat to start messaging</Text>
          </VStack>
        )}
      </Box>
    </HStack>
  );
};

export default Index;
