import { useEffect, useState } from "react";
import Card from "./components/Card";

const images = [
  { pic: "/img/helmet-1.png" },
  { pic: "/img/potion-1.png" },
  { pic: "/img/ring-1.png" },
  { pic: "/img/sword-1.png" },
  { pic: "/img/shield-1.png" },
  { pic: "/img/scroll-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState();
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const Cards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((el) => ({ ...el, flipped: false, id: Math.random() }));
    setCards(Cards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.pic === choiceTwo.pic) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.pic === choiceOne.pic) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => {
          reset();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const setChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  return (
    <div className="bg-regal-blue">
      <span className="">New Game</span>

      <div className="grid grid-cols-4 gap-5 pb-12 justify-items-center w-7/12 mx-auto">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card}
            choice={setChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
