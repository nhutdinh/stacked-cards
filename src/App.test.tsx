import React from "react";
import ReactDOM from "react-dom";
import App from "./StackedCards";
import { mount, shallow } from "enzyme";

beforeEach(() => {});

afterEach(() => {});

it("renders without crashing with no items", () => {
  const props = {
    cardsToShow: 3,
    items: [],
    delay: 400,
    gapX: 10,
    gapY: 10,
    removalAnimationClassName: "stacked-card-remove-active",
    itemRenderFn: jest.fn()
  };
  mount(<App {...props}></App>);
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
    removalAnimationClassName: "stacked-card-remove-active",
    itemRenderFn: jest.fn()
  };
  const component = shallow(<App {...props}></App>);
  //there are 3 cards generated
  const cards = component.find(".stacked-card");

  expect(cards).toHaveLength(3);
  cards.forEach((element, i) => {
    expect(element.props().style).toHaveProperty("top", i * props.gapY);
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
      removalAnimationClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const component = shallow(<App {...props}></App>);
    //there are 2 cards generated
    const cards = component.find(".stacked-card");

    expect(cards).toHaveLength(2);
    cards.forEach((element, i) => {
      expect(element.props().style).toHaveProperty("top", i * props.gapY);
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
      removalAnimationClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const component = shallow(<App {...props}></App>);
    //there are 2 cards generated
    const cards = component.find(".stacked-card");

    expect(cards).toHaveLength(2);
    cards.forEach((element, i) => {
      expect(element.props().style).toHaveProperty("top", i * props.gapY);
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
      removalAnimationClassName: "stacked-card-remove-active",
      itemRenderFn: (item: any) => <div>{item.title}</div>
    };
    const component = shallow(<App {...props}></App>);
    //there are 2 cards generated
    const cards = component.find(".stacked-card");

    expect(cards).toHaveLength(3);
    cards.forEach((element, i) => {
      expect(element.props().style).toHaveProperty("top", i * props.gapY);
      expect(element.find(`[data-testid="stacked-card-${i + 2}"]`).text()).toBe(
        `Card ${i + 3}`
      );
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
      removalAnimationClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const component = shallow(<App {...props}></App>);
    expect(props.itemRenderFn).toHaveBeenCalledWith(props.items[3]);
    expect(props.itemRenderFn).toHaveBeenCalledTimes(3);
  });
});

describe("item clicked", () => {
  test("last item should be removed", done => {
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
      removalAnimationClassName: "stacked-card-remove-active",
      itemRenderFn: jest.fn()
    };
    const component = shallow(<App {...props}></App>);
    const cards = component.find(".stacked-card:last-child");
    cards.simulate("click");
    expect(
      component
        .find(`.stacked-card:last-child`)
        .hasClass(props.removalAnimationClassName)
    ).toBe(true);

    setTimeout(function() {
      //last item should be removed after delay period
      expect(component.find(`[data-testid="stacked-card-4"]`)).toHaveLength(0);
      //new item added taken from items after delay period
      expect(component.find(`[data-testid="stacked-card-2"]`)).toHaveLength(1);
      done();
    }, props.delay + 1);
  });
});
