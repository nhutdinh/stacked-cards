import React from "react";
import ReactDOM from "react-dom";
import App from "./StackedCards";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

beforeEach(() => {});

afterEach(() => {});

it("renders without crashing with no items", () => {
  const props = {
    cardsToShow: 3,
    items: [],
    delay: 400,
    gapX: 10,
    gapY: 10,
    cardRemovedClassName: "stacked-card-remove-active",
    itemRenderFn: jest.fn()
  };
  render(<App {...props}></App>);
});

it("renders without crashing with items", () => {
  const props = {
    cardsToShow: 3,
    items: [
      { id: 0, title: "Card 1" },
      { id: 1, title: "Card 2" },
      { id: 2, title: "Card 3" }
    ],
    delay: 400,
    gapX: 10,
    gapY: 10,
    cardRemovedClassName: "stacked-card-remove-active",
    itemRenderFn: jest.fn()
  };
  const { getAllByTestId } = render(<App {...props}></App>);
  //there are 3 cards generated
  const cards = getAllByTestId("stacked-card", { exact: false });

  expect(cards).toHaveLength(3);
  cards.forEach((element, i) => {
    expect(element.getAttribute("style")).toBe(
      `top: ${i * props.gapY}px; left: ${i * props.gapY}px;`
    );
  });
});
describe("test number of cards render", () => {
  test("if cardsToShow > number of items", () => {
    const props = {
      cardsToShow: 3,
      items: [{ id: 0, title: "Card 1" }, { id: 1, title: "Card 2" }],
      delay: 400,
      gapX: 10,
      gapY: 10,
      cardRemovedClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const { getAllByTestId } = render(<App {...props}></App>);
    //there are 2 cards generated
    const cards = getAllByTestId("stacked-card", { exact: false });

    expect(cards).toHaveLength(2);
    cards.forEach((element, i) => {
      expect(element.getAttribute("style")).toBe(
        `top: ${i * props.gapY}px; left: ${i * props.gapY}px;`
      );
    });
  });

  test("if cardsToShow < number of items", () => {
    const props = {
      cardsToShow: 2,
      items: [
        { id: 0, title: "Card 1" },
        { id: 1, title: "Card 2" },
        { id: 2, title: "Card 3" }
      ],
      delay: 400,
      gapX: 10,
      gapY: 10,
      cardRemovedClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const { getAllByTestId } = render(<App {...props}></App>);
    //there are 2 cards generated
    const cards = getAllByTestId("stacked-card", { exact: false });

    expect(cards).toHaveLength(2);
    cards.forEach((element, i) => {
      expect(element.getAttribute("style")).toBe(
        `top: ${i * props.gapY}px; left: ${i * props.gapY}px;`
      );
    });
  });

  test("if cardsToShow not set", () => {
    const props = {
      items: [
        { id: 0, title: "Card 1" },
        { id: 1, title: "Card 2" },
        { id: 2, title: "Card 3" },
        { id: 3, title: "Card 4" },
        { id: 4, title: "Card 5" }
      ],
      delay: 400,
      gapX: 10,
      gapY: 10,
      cardRemovedClassName: "stacked-card-remove-active",
      itemRenderFn: (item: any) => <div>{item.title}</div>
    };
    const { getAllByTestId, getByTestId, getByText } = render(
      <App {...props}></App>
    );
    //there are 2 cards generated
    const cards = getAllByTestId("stacked-card", { exact: false });

    expect(cards).toHaveLength(3);
    cards.forEach((element, i) => {
      expect(element.getAttribute("style")).toBe(
        `top: ${i * props.gapY}px; left: ${i * props.gapY}px;`
      );
      expect(getByText(`Card ${i + 3}`)).toBeTruthy();
    });
  });
});

describe("item template render", () => {
  test("itemRenderFn should be call", () => {
    const props = {
      items: [
        { id: 0, title: "Card 1" },
        { id: 1, title: "Card 2" },
        { id: 2, title: "Card 3" },
        { id: 3, title: "Card 4" },
        { id: 4, title: "Card 5" }
      ],
      delay: 400,
      gapX: 10,
      gapY: 10,
      cardRemovedClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    render(<App {...props}></App>);
    expect(props.itemRenderFn).toHaveBeenCalledWith(props.items[3]);
    expect(props.itemRenderFn).toHaveBeenCalledTimes(3);
  });
});

describe("item clicked", () => {
  test("last item should be removed", () => {
    const props = {
      items: [
        { id: 0, title: "Card 1" },
        { id: 1, title: "Card 2" },
        { id: 2, title: "Card 3" },
        { id: 3, title: "Card 4" },
        { id: 4, title: "Card 5" }
      ],
      delay: 400,
      cardsToShow: 2,
      gapX: 10,
      gapY: 10,
      cardRemovedClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const { getByTestId, queryByTestId } = render(<App {...props}></App>);
    const lastCard = getByTestId(`stacked-card-4`);

    act(() => {
      jest.useFakeTimers();
      fireEvent.click(lastCard);

      jest.runAllTimers();
      expect(queryByTestId(`stacked-card-4`)).not.toBeTruthy();
      jest.useRealTimers();
      // //new item added taken from items after delay period
      expect(getByTestId("stacked-card-2")).toBeTruthy();
    });

    expect(lastCard.classList.contains(props.cardRemovedClassName)).toBe(true);
  });
});
