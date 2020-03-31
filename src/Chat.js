import React from "react";

const exampleData = [
  {
    id: 1,
    username: "moe",
    message: "testet",
    timestamp: "2019-10-01-T09:56:59.351490Z",
    channel: 394
  },
  {
    id: 2,
    username: "moe",
    message: "testet",
    timestamp: "2019-10-01-T09:57:59.351490Z",
    channel: 394
  },
  {
    id: 3,
    username: "moe",
    message: "testet",
    timestamp: "2019-10-01-T09:58:59.351490Z",
    channel: 394
  },
  {
    id: 4,
    username: "moe",
    message: "testet",
    timestamp: "2019-10-01-T09:59:59.351490Z",
    channel: 394
  }
];

export const Chat = () => {
  const messages = exampleData.map(message => (
    <p>
      {message.username}: {message.message}
    </p>
  ));

  return <div className="container">{messages}</div>;
};

export default Chat;
