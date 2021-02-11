import React, { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

const Dialog = styled.div`
  margin: 8px;
  padding: 8px;

  .message__user {
    text-align: left;
    margin-bottom: 4px;
  }

  .message__card {
    padding: 8px;
    border-radius: 32px;
    width: fit-content;
    max-width: 60%;

    &.message__guestCard {
      background-color: #e9e9eb;
    }

    &.message__ownerCard {
      margin-left: auto;
      background-color: #0b81ff;
      color: white;
    }
  }
`;

const Message = forwardRef(({ username, data }, ref) => {
  const isOwner = username === data.user;

  return (
    <Dialog ref={ref} className="message">
      <div className="message__user">
        {!isOwner && `${data.user || "Anonymous"}`}
      </div>
      <Card
        className={`message__card ${
          isOwner ? "message__ownerCard" : "message__guestCard"
        }`}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ wordBreak: "break-all" }}
          >
            {data.text}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
});

export default Message;
