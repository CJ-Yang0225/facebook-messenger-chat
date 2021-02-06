import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

const Message = ({ account, data }) => {
  const StyledCard = styled(Card)`
    margin: 16px;
    padding: 8px;
    width: fit-content;

    &.message__guestCard {
      background-color: #e9e9eb;
    }

    &.message__ownerCard {
      margin-left: auto;
      text-align: left;
      background-color: #0b81ff;
      color: white;
    }
  `;

  const isOwner = account === data.user;

  return (
    <StyledCard
      className={`message__card ${
        isOwner ? "message__ownerCard" : "message__guestCard"
      }`}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.user}: {data.content}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Message;
