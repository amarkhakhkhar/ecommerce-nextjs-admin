import prismadb from "@/lib/prismadb";

export const getSalesCount =  async( storeID: string)=> {
    const salesCount= await prismadb.order.count({
        where : {
            storeId : storeID,
            isPaid : true
        }
    })

return salesCount
}