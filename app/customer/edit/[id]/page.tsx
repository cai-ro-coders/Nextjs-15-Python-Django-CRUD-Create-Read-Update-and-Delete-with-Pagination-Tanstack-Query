"use client";
 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from 'next/navigation'
import { fetchCustomer, updateCustomer } from "../../../api/customer";
import CustomertForm from "../../../components/CustomertForm"
 
const EditCustomer = () => {
  const {id}=useParams();
  //console.log(id);
 
  const queryClient = useQueryClient();
  const router = useRouter();
 
  const {
    isLoading,
    isError,
    data: customer,
    error,
  } = useQuery({
    queryKey: ["customers", id],
    queryFn: () => fetchCustomer(id),
  });
 
  console.log(customer);

  const updateCustomerMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers']});
      console.log("success");
      router.push('/')
    }
  })
 
  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;
 
  const handleSubmit = (updatedCustomer) => {
    updateCustomerMutation.mutate({id, ...updatedCustomer})
  }
 
  return (
    <div className="max-w-md mx-auto mt-5">
        <div className="flex items-center justify-between gap-1 mb-5">
            <h1 className="text-4xl font-bold">{customer.getcustomer.name}</h1>
        </div> 
        <CustomertForm onSubmit={handleSubmit} initialValue={customer.getcustomer} />
    </div>
  )
}
  
export default EditCustomer