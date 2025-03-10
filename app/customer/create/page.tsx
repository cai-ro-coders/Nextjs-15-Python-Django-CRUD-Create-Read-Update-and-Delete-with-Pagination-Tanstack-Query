"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query"
import CustomertForm from "../../components/CustomertForm"
import { createCustomer } from "../../api/customer"
import { useRouter } from 'next/navigation'

const AddCustomer= () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers']});
      //console.log("success!")
      router.push('/')
    }
  });
 
  const handleAddPost = (customer) => {
    //console.log(customer)
    createUserMutation.mutate({
      ...customer
    })
  }
   
  return (
    <div className="max-w-md mx-auto mt-5 mb-5">
      <h1 className="text-2xl text-center mb-2">Add New Customer</h1>
      <CustomertForm onSubmit={handleAddPost} initialValue={{}} />
    </div>
  )
}
  
export default AddCustomer