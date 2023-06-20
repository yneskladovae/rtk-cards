import React, { useEffect, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { BackToPackListLink } from "components/backToPackListLink/BackToPackListLink";
import { cardsThunks } from "features/cards/cards.slice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";

interface Card {
  name: string;
  checked: boolean;
}

export const Learn = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards);
  const [index, setIndex] = useState<number>(0);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(3);
  const { id } = useParams();
  // const cardsTotalCount = useAppSelector(
  //   (state) => state.cards.cardsTotalCount
  // );

  const isShowOnClickHandler = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (id) {
      cardsThunks.getCards({ cardsPack_id: id });
    }
  }, [dispatch, cards]);

  const handleCheckboxChange = (index: number) => {
    setGrade(index + 1);
  };

  const getNextQuestion = () => {
    if (cards.cards) {
      // const randomIndex = Math.floor(Math.random() * cards.cards.length - 1);
      // console.log(randomIndex);
      setIndex(index + 1);
      setIsShow(false);
    }
    updateGradeCardHandler();
    setGrade(3);
  };

  const updateGradeCardHandler = () => {
    if (cards.cards) {
      const payload = {
        card_id: cards.cards[index]._id,
        grade: grade,
      };
      dispatch(cardsThunks.updateGradeCard(payload));
    }
  };

  const checkboxCards: Card[] = [
    { name: "Did not know", checked: false },
    { name: "Forgot", checked: false },
    { name: "A lot of thought", checked: true },
    { name: "Confused", checked: false },
    { name: "Knew the answer", checked: false },
  ];

  return (
    <div>
      <BackToPackListLink />
      <h1>Learn</h1>
      {cards.packName}
      <div style={{ background: "#dcdcdc" }}>
        <p>
          <strong>Question:</strong>{" "}
          {cards.cards && cards.cards[index] && cards.cards[index].question}
        </p>
        <button
          style={{ display: isShow ? "none" : "block" }}
          onClick={isShowOnClickHandler}
        >
          Show answer
        </button>
        {isShow && cards.cards && cards.cards[index] && (
          <p>
            <strong>Answer:</strong> {cards.cards && cards.cards[index].answer}
            <br />
            <div>Rate yourself:</div>
            <div>
              {checkboxCards.map((card, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={grade === index + 1}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    {card.name}
                  </label>
                </div>
              ))}
            </div>
            <button onClick={getNextQuestion}>Next</button>
          </p>
        )}
      </div>
    </div>
  );
};
