import React from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { BackToPackListLink } from "components/backToPackListLink/BackToPackListLink";

export const Learn = () => {
  const cards = useAppSelector((state) => state.cards);
  return (
    <div>
      <BackToPackListLink />
      <h1>Learn</h1>
      {cards.packName}
      <div style={{ background: "#dcdcdc" }}>
        <p>
          <strong>Question:</strong> {cards.cards && cards.cards[0].question}
        </p>
      </div>
    </div>
  );
};
