import type { CategoryWithCount } from "../../../api/types";
import { classNames } from "../../../utils/classNames";
import "./AccordionItem.css";

interface AccordionItemProps {
  category: CategoryWithCount;
  onSelectTag: (tagName: string) => void;
}
export const AccordionItem = (props: AccordionItemProps) => {
  const { category, onSelectTag } = props;
  const { id, name, questionCount, checked } = category;
  const onSelectorChange = () => {
    if (questionCount === 0) return;
    onSelectTag(name);
  };
  return (
    <div className="accordion__item">
      <label
        className={classNames("accordion__item_label", {
          accordion__item_label_inactive: questionCount === 0,
        })}
        htmlFor={String(id)}
      >
        <span className="accordion__item_checkbox">
          <input
            type="checkbox"
            id={String(id)}
            disabled={!questionCount}
            onChange={onSelectorChange}
            checked={checked}
          />
          {name}
          <span className="accordion__item_count">({questionCount})</span>
        </span>
      </label>
    </div>
  );
};
