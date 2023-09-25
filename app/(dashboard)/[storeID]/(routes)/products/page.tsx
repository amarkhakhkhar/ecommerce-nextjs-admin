import prismadb from "@/lib/prismadb";
import { format} from "date-fns"
import { formatter } from "@/lib/utils";
import { ProductColumn } from "./components/columns";
import { ProductClient } from "./components/client";

const Products = async ({
    params }: {
        params: { storeID: string }
    }
) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeID
        },
        include: {
            category:true,
            size:true,
            color:true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedProducts: ProductColumn[] = products.map((product) => ({
        id: product.id,
        name : product.name,
        price : formatter.format(product.price.toNumber()),
        size : product.size.name,
        category : product.category.name,
        color : product.color.value,
        isFeatured : product.isFeatured,
        isArchived : product.isArchived,

        createdAt: format(product.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    );
}

export default Products;