import React from "react";
let initCards = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "yellow" }
];
const StackedCard: React.FC<{}> = (): React.ReactElement => {
  const [cards, setCards] = React.useState(initCards);
  const [activeID, setActiveID] = React.useState(-1);

  const doClick = () => {
    let newCards = cards.slice();
    let removedItem = newCards.pop();
    setTimeout(() => {
      if (removedItem)
        newCards.unshift({ ...removedItem, id: removedItem.id + 1 });
      setCards(newCards);
    }, 400);
    if (removedItem) setActiveID(removedItem.id);
  };

  let cardsElmts = cards.map((item, i) => (
    <div
      key={item.id}
      style={{ top: -10 * (i + 1), left: 10 * i, backgroundColor: item.color }}
      className={`${item.id == activeID ? "transformThis " : ""}stacked-card`}
    >
      {item.id}
    </div>
  ));
  return (
    <>
      <div style={{ height: "80px", position: "relative", top: "250px" }}>
        {cardsElmts}
      </div>
      <button onClick={doClick}>Remove</button>
    </>
  );
};
export default StackedCard;
