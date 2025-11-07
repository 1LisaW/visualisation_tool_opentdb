"use strict";
import { useEffect, useState } from "react";
import "./Main.css";
import {
  API_CATEGORIES,
  API_QUESTIONS,
  API_TOKEN_REQUEST,
} from "../../assets/constants";
import { getCategoriesWithCount } from "../../utils/utils";
import { CategoryWithCount, Question } from "../../api/types";
import { Filter } from "./Filter/Filter";

export const Main = () => {
  const [api_token, setApi_token] = useState("");
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [data, setData] = useState<Question[]>([]);

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const onSelectFilteredCategorie = (tagName: string) => {
    const isTagSelected = filteredCategories.includes(tagName);
    if (isTagSelected) {
      setFilteredCategories(
        filteredCategories.filter((tag) => tag !== tagName)
      );

    } else {
      setFilteredCategories([...filteredCategories, tagName]);
    }
    const currCategory = categories.find((cat) => cat.name === tagName);
      if (currCategory) {
        currCategory.checked = !currCategory.checked;
        const updatedCategories = [
          ...categories.filter((cat) => cat.name !== tagName),
          currCategory,
        ].sort((a,b)=> a.name.localeCompare(b.name)).sort((a, b) => b.questionCount - a.questionCount);
        setCategories(updatedCategories);
      }
  };
  useEffect(() => {
    const fetchData = async () => {
      const token_response = await fetch(API_TOKEN_REQUEST);
      const token_json = await token_response.json();
      setApi_token(token_json.token);
      const response = await fetch(API_QUESTIONS + token_json.token);
      const jsonData = await response.json();
      setData(jsonData?.results || []);
      fetch(API_CATEGORIES)
        .then((response) => response.json())
        .then((categories) => {
          const categoriesWithCount = getCategoriesWithCount(
            categories.trivia_categories || [],
            jsonData?.results
          );
          setCategories(categoriesWithCount || []);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchData().catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <main className="layout-main">
      <Filter
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={(categorie) =>
          onSelectFilteredCategorie(categorie)
        }
      />
      <div>{JSON.stringify(data)}</div>
    </main>
  );
};
