"use client";

import { useQuery } from "@tanstack/react-query"; //npm i @tanstack/react-query tanstack com/query/latest/docs/framework/react/installation
import CustomerList from "./components/CustomerList";
import { getCustomerList } from "./api/customer";
import Paginationnumber from "./components/Paginationnumber";
import LoadingSpinner from "./components/LoadingSpinner";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

export default function Home() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')
    //console.log(page)

    const currentPage = Number(page) || 1;

    const { isLoading, data, isError, isFetching,  error } = useQuery({
        queryKey: ["customers", currentPage],
        queryFn: () => getCustomerList(currentPage)
    });
 
    //console.log(data);
    if (isLoading) return "Loading...";
    if (isError) return `Error: ${error.message}`;

    const totalPages = Math.ceil(Number(data.totalpage) / Number(data.perpage));
    //console.log(totalPages);
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
        <div className="flex items-center justify-between gap-1 mb-5 pl-10 pr-10">
            <h1 className="text-4xl font-bold">Nextjs 15 Python Django CRUD (Create, Read, Update and Delete) with Pagination | Tanstack Query Tailwind CSS</h1>
        </div> 
        <div className="overflow-x-auto pt-10">
            <div className="mb-2 w-full text-right">
                <Link
                href="/customer/create"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add New
                </Link>
            </div>
            <CustomerList customerlist={data.customerlist} />
            <div className="flex items-center justify-between my-5">
                <Paginationnumber totalPages={totalPages} />
                {isFetching ? <LoadingSpinner /> : null}
            </div>
        </div>
    </div>
  );
}
