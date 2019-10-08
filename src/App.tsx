import React from "react";
import { Styled } from "./styled";

interface StackedCardProps {
  stackCount?: number;
  items: any[];
  itemRenderFn: (item: any) => React.ReactNode;
  removalAnimationClassName?: string;
  delay?: number;
  gapY?: number;
  gapX?: number;
}

const StackedCard: React.FC<StackedCardProps> = (
  props: StackedCardProps
): React.ReactElement => {
  const {
    stackCount = 3,
    items,
    delay = 400,
    gapX = 10,
    gapY = 10,
    removalAnimationClassName = "stacked-card-remove-active"
  } = props;

  const [cards, setCards] = React.useState(
    items.slice(items.length - stackCount)
  );
  const [activeID, setActiveID] = React.useState(-1);
  const doClick = () => {
    let newCards = cards.slice();
    let removedItem = newCards.pop();
    setTimeout(() => {
      if (removedItem) {
        let removedItemIndex = items.indexOf(removedItem);
        let newCard = items[removedItemIndex - stackCount];
        if (newCard) newCards.unshift({ ...newCard });
        setCards(newCards);
      }
    }, delay);
    if (removedItem) setActiveID(removedItem.id);
  };

  let cardsElmts = cards.map((item, i) => (
    <Styled
      onClick={doClick}
      key={item.id}
      style={{
        top: -i * gapY,
        left: i * gapX,
        backgroundColor: item.color
      }}
      className={`${
        item.id === activeID ? removalAnimationClassName : ""
      } stacked-card`}
    >
      {item.id}
      <div>{props.itemRenderFn(item)}</div>
    </Styled>
  ));
  return React.useMemo(
    () => <div style={{ position: "relative" }}>{cardsElmts}</div>,
    [cards, activeID]
  );
};
export default StackedCard;
