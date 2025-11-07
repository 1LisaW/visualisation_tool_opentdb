import { CategoryWithCount } from "../../../api/types";
import "./Filter.css";
import { Accordeon } from "./Accordeon/Accordeon";
import { FilterTags } from "./FilterTags";
// import { useState } from "react";



interface FilterProps {
  categories: CategoryWithCount[];
  filteredCategories: string[];
  setFilteredCategories: (category: string) => void;
}

export const Filter = (props: FilterProps) => {
  {
    const { categories, filteredCategories, setFilteredCategories  } = props;
    const onRemove = (title: string) => {
        if (filteredCategories.includes(title)) {
          setFilteredCategories(title);
        }
    }
    return (
      <aside className="layout-filter">
        <h3>Filters</h3>
        <FilterTags tags={filteredCategories} onRemove={onRemove} />
        <Accordeon title="Categories" selectors={categories} onSelectCategorie={setFilteredCategories} />
      </aside>
    );
  }
};
