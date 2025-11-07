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
import { Charts } from "../Charts/Charts";
import { Button } from "../Button/Button";

export const Main = () => {
  const [api_token, setApi_token] = useState("");
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [data, setData] = useState<Question[]>([]);

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const onSelectFilteredCategory = (tagName: string) => {
    if (tagName === '') {
      setFilteredCategories([]);
      const updatedCategories =
        categories.map((cat) => ({ ...cat, checked: false }))
        // .sort((a, b) => a.name.localeCompare(b.name))
        // .sort((a, b) => b.questionCount - a.questionCount);
      setCategories(updatedCategories);
      return;
    }
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
      ]
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => b.questionCount - a.questionCount);
      setCategories(updatedCategories);
    }
  };

  const uploadData = async (token: string) => {
    const response = await fetch(API_QUESTIONS + token
    );
    const jsonData = await response.json();
    setData(jsonData?.results || []);
    fetch(API_CATEGORIES)
      .then((response) => response.json())
      .then((categories) => {
        console.log(categories, " jsonData: ", jsonData);
        const categoriesWithCount = getCategoriesWithCount(
          categories.trivia_categories || [],
          jsonData?.results || []
        );
        setCategories(categoriesWithCount || []);
        setFilteredCategories([]);
      })
      .catch((error) => {console.error("Error fetching data:", error)
      setCategories([]);
      setFilteredCategories([]);

    }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const token_response = await fetch(API_TOKEN_REQUEST);
      const token_json = await token_response.json();
      setApi_token(token_json.token);
      await uploadData(token_json.token);
    };

    fetchData().catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <main >
      <div className="layout-main">

    <section className="layout-main-description">
      <h1>Open Trivia Visualizer</h1>
      <p>
        This tool allows you to visualize trivia questions from the Open Trivia Database API.
      </p>
      <p>
        You can filter questions by category and see the distribution of questions by category and difficulty.
      </p>
    </section>
    <section className="layout-main-charts-wrapper">
        <div className="layout-main-controls">
        <Button label="Load new questions" onClick={()=>uploadData(api_token)} />
        <Filter
          categories={categories}
          filteredCategories={filteredCategories}
          setFilteredCategories={(categorie) =>
            onSelectFilteredCategory(categorie)
          }
        />
      </div>

      <Charts data={data} filteredCategories={filteredCategories} />
</section>
</div>
    </main>
  );
};
