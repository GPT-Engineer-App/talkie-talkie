import React, { useState } from "react";
import { Box, VStack, HStack, Text, Avatar, Input, Button, Divider, Heading } from "@chakra-ui/react";
import { FaPaperPlane, FaCog } from "react-icons/fa";

const ChatMessage = ({ message, sender, timestamp }) => (
  <Box bg={sender === "me" ? "green.100" : "gray.100"} borderRadius="lg" p={2} maxW="75%" ml={sender === "me" ? "auto" : 0} mb={2}>
    {sender !== "me" && (
      <Text fontSize="xs" fontWeight="bold" mb={1}>
        {sender}
      </Text>
    )}
    <Text>{message}</Text>
    <Text fontSize="xs" color="gray.500" textAlign="right">
      {timestamp}
    </Text>
  </Box>
);

const ChatScreen = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages([...messages, { text: inputMessage, sender: "me", timestamp }]);
      setInputMessage("");
    }
  };

  return (
    <VStack h="100vh" spacing={0}>
      <HStack bg="gray.100" p={4} w="100%">
        <Avatar name={selectedChat} />
        <Text fontWeight="bold">{selectedChat}</Text>
      </HStack>
      <VStack flex={1} w="100%" overflowY="auto" p={4} spacing={4}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} sender={message.sender} timestamp={message.timestamp} />
        ))}
      </VStack>
      <HStack w="100%" p={4} borderTopWidth={1} borderColor="gray.200">
        <Input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type a message..." />
        <Button onClick={sendMessage} colorScheme="green">
          <FaPaperPlane />
        </Button>
      </HStack>
    </VStack>
  );
};

const ChatListItem = ({ name, lastMessage, lastMessageTimestamp, onClick }) => (
  <Box onClick={onClick} cursor="pointer" borderBottomWidth={1} borderColor="gray.200" p={4} _hover={{ bg: "gray.100" }}>
    <HStack>
      <Avatar name={name} />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontWeight="bold" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          {lastMessage}
        </Text>
      </VStack>
      <Text fontSize="xs" color="gray.500">
        {lastMessageTimestamp}
      </Text>
    </HStack>
  </Box>
);

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <HStack h="100vh" spacing={0}>
      <VStack h="100%" w="30%" bg="white">
        <HStack p={4} borderBottomWidth={1} borderColor="gray.200">
          <Heading size="md" flex={1}>
            Chats
          </Heading>
          <Button variant="ghost">
            <FaCog />
          </Button>
        </HStack>
        <Input placeholder="Search chats" m={4} />
        <VStack overflowY="auto" w="100%">
          <ChatListItem name="John Doe" lastMessage="Hey, how are you?" lastMessageTimestamp="10:30 AM" onClick={() => setSelectedChat("John Doe")} />
          <ChatListItem name="Jane Smith" lastMessage="See you later!" lastMessageTimestamp="Yesterday" onClick={() => setSelectedChat("Jane Smith")} />
        </VStack>
      </VStack>
      <Box flex={1} bg="gray.50">
        {selectedChat ? (
          <ChatScreen selectedChat={selectedChat} />
        ) : (
          <VStack h="100%" justify="center">
            <Heading size="lg" color="gray.500">
              WhatsApp Web
            </Heading>
            <Text color="gray.500">Send and receive messages without keeping your phone online.</Text>
            <Text color="gray.500">Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</Text>
          </VStack>
        )}
      </Box>
    </HStack>
  );
};

export default Index;
