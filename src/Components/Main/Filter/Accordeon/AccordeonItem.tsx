import { CategoryWithCount } from '../../../../api/types';
import { classNames } from '../../../../utils/classNames';
import './AccordeonItem.css';

interface AccordeonItemProps {
    category: CategoryWithCount;
    onSelectTag: (tagName: string) => void;
}
export const AccordeonItem = (props: AccordeonItemProps) => {
    const {category, onSelectTag} = props;
  const { id, name, questionCount, checked } = category;
  const onSelectorChange = () => {
    if (questionCount === 0) return;
    onSelectTag(name);
  }
  return (
    <div className="accordeon__item">
        <label className={classNames("accordeon__item_label",{
                    'accordeon__item_label_inactive': questionCount === 0
                })} htmlFor={String(id)}>
            <span className="accordeon__item_checkbox">
                <input type="checkbox" id={String(id)} disabled={!questionCount} onChange={onSelectorChange} checked={checked}/>
                {name}<span className="accordeon__item_count">({questionCount})</span>
            </span>
        </label>
    </div>
  );
};
