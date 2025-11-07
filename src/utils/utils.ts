import type { Category, CategoryWithCount, Question } from "../api/types";

const getCategoriesWithCount = (categories: Category[], questions: Question[]): CategoryWithCount[] => {
    return categories.map(category => {
        const questionCount = questions.filter((question: Question) => question.category === category.name).length;
        return {
            ...category,
            questionCount,
            checked: false,
        };
    })
    .sort((a, b) => b.questionCount - a.questionCount);
};

export { getCategoriesWithCount };
