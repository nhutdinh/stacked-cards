import React from "react";
import { CardStyled } from "./StackCards.styled";

interface StackedCardProps {
  cardsToShow?: number;
  items: any[];
  itemRenderFn?: (item: any) => React.ReactNode;
  cardRemovedClassName?: string;
  delay?: number;
  gapY?: number;
  gapX?: number;
}

const StackedCard: React.FC<StackedCardProps> = (
  props: StackedCardProps
): React.ReactElement => {
  let {
    cardsToShow = 3,
    items,
    delay = 400,
    gapX = 10,
    gapY = 10,
    cardRemovedClassName = "stacked-card-remove-active"
  } = props;
  if (cardsToShow > items.length) cardsToShow = items.length;
  const [cards, setCards] = React.useState(
    items.slice(items.length - cardsToShow)
  );
  const [activeID, setActiveID] = React.useState(-1);
  const doClick = () => {
    let newCards = cards.slice();
    let removedItem = newCards.pop();
    setTimeout(() => {
      if (removedItem) {
        let removedItemIndex = items.indexOf(removedItem);
        let newCard = items[removedItemIndex - cardsToShow];
        if (newCard) newCards.unshift({ ...newCard });
        setCards(newCards);
      }
    }, delay);
    if (removedItem) setActiveID(removedItem.id);
  };

  let cardsElmts = cards.map((item, i) => (
    <CardStyled
      data-testid={`stacked-card-${item.id}`}
      onClick={doClick}
      key={item.id}
      style={{
        top: i * gapY,
        left: 0,
        right: 0,
        width: 100 - i * 10,
        margin: "0 auto",
        backgroundColor: item.color
      }}
      className={`${
        item.id === activeID ? cardRemovedClassName : ""
      } stacked-card`}
    >
      {item.id}
      <div>{!!props.itemRenderFn && props.itemRenderFn(item)}</div>
    </CardStyled>
  ));
  return React.useMemo(
    () => <div style={{ position: "relative" }}>{cardsElmts}</div>,
    [cards, activeID]
  );
};
export default StackedCard;
