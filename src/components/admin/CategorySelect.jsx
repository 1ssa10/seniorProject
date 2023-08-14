import React from "react";

function CategorySelect() {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="category"
      >
        <option>Choose a country</option>
        <option value="horror">horror</option>
        <option value="drama">drama</option>
        <option value="porn">porn</option>
        <option value="3akrate">3akrate</option>
      </select>
    </div>
  );
}

export default CategorySelect;
