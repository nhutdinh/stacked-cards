import React from "react";
import { CardStyled } from "./StackCards.styled";

export type StackedCardProps = {
  cardsToShow?: number;
  items: any[];
  delay?: number;
  cardRemovedClassName?: string;
  gapX?: number;
  gapY?: number;
  itemRenderFn?: (item: any) => React.ReactNode;
};

export type StackedCardStyledProps = {
  nCards: number;
  gapX: number;
  gapY: number;
};

const StackedCard: React.FC<StackedCardProps> = (
  props: StackedCardProps
): React.ReactElement => {
  let {
    cardsToShow = 3,
    items,
    delay = 400,
    gapX = 1,
    gapY = 4,
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
      gapX={gapX}
      gapY={gapY}
      nCards={cards.length}
      data-testid={`stacked-card-${item.id}`}
      onClick={doClick}
      key={item.id}
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
