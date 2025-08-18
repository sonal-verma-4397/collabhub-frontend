import React, { useState, useEffect, useRef } from "react";
import { useConversationSocket } from "../../context/ConversationSocket";
import { Send, Users, Wifi, WifiOff, MoreVertical } from "lucide-react";

export default function Conversation() {
  const { socket } = useConversationSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser] = useState({
    id: "user-" + Math.random().toString(36).substr(2, 9),
    name: "You",
  });

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    // Connection status
    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("online", {
        userId: currentUser.id,
        userName: currentUser.name,
      });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    // Message handler
    const handleMessage = (data) => {
      const message = {
        id: Date.now() + Math.random(),
        userId: data.userId,
        userName: data.userName,
        text: data.message,
        timestamp: new Date(),
        isOwn: data.userId === currentUser.id,
      };
      setMessages((prev) => [...prev, message]);
    };

    // Online users handler
    const handleOnlineUsers = (users) => {
      setOnlineUsers(new Set(users.map((u) => u.userId)));
    };

    // Typing handlers
    const handleUserTyping = (data) => {
      if (data.userId !== currentUser.id) {
        setTypingUsers((prev) => new Set([...prev, data.userName]));
      }
    };

    const handleUserStoppedTyping = (data) => {
      if (data.userId !== currentUser.id) {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.userName);
          return newSet;
        });
      }
    };

    // Register event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message", handleMessage);
    socket.on("online-users", handleOnlineUsers);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stopped-typing", handleUserStoppedTyping);

    // Initial connection check
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("message", handleMessage);
      socket.off("online-users", handleOnlineUsers);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stopped-typing", handleUserStoppedTyping);
    };
  }, [socket, currentUser.id, currentUser.name]);

  // Handle typing events
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        userId: currentUser.id,
        userName: currentUser.name,
      });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing-stop", {
        userId: currentUser.id,
        userName: currentUser.name,
      });
    }, 1000);
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !socket) return;

    // Stop typing
    if (isTyping) {
      setIsTyping(false);
      socket.emit("typing-stop", {
        userId: currentUser.id,
        userName: currentUser.name,
      });
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }

    // Send message
    socket.emit("message", {
      userId: currentUser.id,
      userName: currentUser.name,
      message: newMessage.trim(),
    });

    setNewMessage("");
    inputRef.current?.focus();
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get typing indicator text
  const getTypingText = () => {
    const users = Array.from(typingUsers);
    if (users.length === 0) return "";
    if (users.length === 1) return `${users[0]} is typing...`;
    if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`;
    return `${users[0]} and ${users.length - 1} others are typing...`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
              C
            </div>
            <div>
              <h1 className="text-xl font-semibold">Conversation</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                {isConnected ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span>Disconnected</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{onlineUsers.size} online</span>
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-medium mb-2">Start a conversation</h3>
            <p className="text-center text-gray-400">
              Send a message to begin chatting with others.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-800 text-gray-100 rounded-bl-md"
                }`}
              >
                {!message.isOwn && (
                  <div className="text-xs text-gray-400 mb-1">
                    {message.userName}
                  </div>
                )}
                <div className="break-words">{message.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.isOwn ? "text-blue-200" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {typingUsers.size > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">{getTypingText()}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <form onSubmit={sendMessage} className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-full border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              disabled={!isConnected}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() || !isConnected}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {!isConnected && (
          <div className="text-center text-sm text-red-400 mt-2">
            Connection lost. Trying to reconnect...
          </div>
        )}
      </div>
    </div>
  );
}
