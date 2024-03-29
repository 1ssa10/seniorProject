import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SelectCategories({ setcategories, className }) {
  const [cats, setCats] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  // const [direction, setDirection] = useState(false);

  useEffect(() => {
    async function fetchCats() {
      const response = await fetch("http://localhost:3000/api/filmsPosters");
      const data = await response.json();
      setCats(data);
    }

    fetchCats();
  }, []);

  setcategories(selectedCats);
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an Category
      </label>
      <select
        id="countries"
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        name="category"
        multiple
        // onChange={(e) =>
        //   setSelectedCats(
        //     Array.from(e.target.selectedOptions, (option) => option.value)
        //   )
        // }
        onChange={(e) => {
          const selectedCategoryObjects = Array.from(
            e.target.selectedOptions,
            (option) => {
              return cats.find((cat) => cat.id === option.value); // Assuming 'cats' is your category data array
            }
          );
          setSelectedCats(selectedCategoryObjects);
        }}
      >
        {cats.map((cat, index) => (
          <option value={cat.id} key={cat.id}>
            {cat.catergory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategories;
