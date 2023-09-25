import prismadb from "@/lib/prismadb";

export const getStockCount =  async( storeID: string)=> {
    const stockCount= await prismadb.product.count({
        where : {
            storeId : storeID,
            isArchived : false
        }
    })

return stockCount
}