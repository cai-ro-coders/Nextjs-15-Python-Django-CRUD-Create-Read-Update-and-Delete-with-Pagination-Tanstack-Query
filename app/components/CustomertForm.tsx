"use client";

import { useState } from "react"

const CustomertForm = ({ onSubmit, initialValue }) => {
  const [customer, setCustomer] = useState({
    name: initialValue.name || "",
    email: initialValue.email || ""
  });
  console.log(customer);

  const handleChangeInput = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    })
  }

  const renderField = (label) => (
    <div>
      <label className="block text-sm font-medium text-gray-900">{label}</label>
      <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={customer[label.toLowerCase()]} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500blue-500"
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(customer);
    setCustomer({
      name: "",
      email: "",
    })
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">{renderField('Name')}</div>
      <div className="mb-5">{renderField('Email')}</div>
      <button type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit</button>
    </form>
  )
}
  
export default CustomertForm