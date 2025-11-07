import { useState } from "react";
import { classNames } from "../../../utils/classNames";
import type { CategoryWithCount } from "../../../api/types";
import { AccordionItem } from "./AccordionItem";
import "./Accordion.css";

interface AccordionProps {
  title: string;
  selectors: CategoryWithCount[];
  onSelectCategories: (category: string) => void;
}

export const Accordion = (props: AccordionProps) => {
  const { title, selectors, onSelectCategories } = props;
  const [isItemsVisible, setIsItemsVisible] = useState(false);

  const onTriggerClick = () => {
    setIsItemsVisible(!isItemsVisible);
  };

  return (
    <div className="accordion__wrapper">
      <div className="accordion_trigger" onClick={onTriggerClick}>
        <div>
          <svg
            viewBox="0 0 24 24"
            className={classNames("jb-accordion-item__svg", {
              "jb-accordion-item__svg--expanded": isItemsVisible,
            })}
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m4.207-14.207a1 1 0 0 1 0 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12 7.793 9.207a1 1 0 0 1 1.414-1.414L12 10.586l2.793-2.793a1 1 0 0 1 1.414 0"></path>
          </svg>
        </div>
        <div className="accordion__title">{title}</div>
      </div>
      {isItemsVisible ? (
        <div className="accordion__items">
          {selectors.map((selector) => (
            <AccordionItem
              key={selector.id}
              category={selector}
              onSelectTag={(title) => onSelectCategories(title)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
