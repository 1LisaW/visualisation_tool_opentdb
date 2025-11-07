import type { CategoryWithCount } from "../../../api/types";
import "./Filter.css";
import { Accordion } from "../Accordion/Accordion";
import { FilterTags } from "./FilterTags";
import { Button } from "../../Button/Button";

interface FilterProps {
  categories: CategoryWithCount[];
  filteredCategories: string[];
  setFilteredCategories: (category: string) => void;
}

export const Filter = (props: FilterProps) => {
  {
    const { categories, filteredCategories, setFilteredCategories } = props;
    const onRemove = (title: string) => {
      if (filteredCategories.includes(title)) {
        setFilteredCategories(title);
      }
    };
    return (
      <aside className="layout-filter">
        <div className="filters-title-group">
          <h3>Filters</h3>
          <Button
            label="Clear All"
            onClick={() => {
              setFilteredCategories("");
            }}
          />
        </div>
        <FilterTags tags={filteredCategories} onRemove={onRemove} />
        <Accordion
          title="Categories"
          selectors={categories}
          onSelectCategories={setFilteredCategories}
        />
      </aside>
    );
  }
};
