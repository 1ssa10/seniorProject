import React from "react";

function TextArea() {
  return (
    <div className=" w-auto">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Your message
      </label>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Description"
        name="description"
      ></textarea>
    </div>
  );
}

export default TextArea;
