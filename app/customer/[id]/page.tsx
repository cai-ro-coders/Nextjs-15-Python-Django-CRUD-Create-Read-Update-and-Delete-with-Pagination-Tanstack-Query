"use client";

import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query
import { useParams } from 'next/navigation'
import { fetchCustomer } from "../../api/customer";

const ViewCustomer = () => {
  const {id}=useParams();
  //console.log(id);

  const {
    isLoading,
    isError,
    data: customer,
    error,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomer(id),
  });

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;
  console.log(customer);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8 text-black">
      <div className="max-w-2xl mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">View Customer</h1>
        <h2>ID : {customer.getcustomer.id}</h2>
        <h2>Name : {customer.getcustomer.name}</h2>
        <h2>Email : {customer.getcustomer.email}</h2>
      </div>
      </div>
    </div>
  )
}
  
export default ViewCustomer