import prismadb from "@/lib/prismadb";
import { format} from "date-fns"
import { ColorColumn } from "./components/columns";
import { ColorsClient } from "./components/client";

const ColorsPage = async ({
    params }: {
        params: { storeID: string }
    }
) => {

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeID
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((color ) => ({
        id: color.id,
        name: color.name,
        value : color.value,
        createdAt: format(color.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors} />
            </div>
        </div>
    );
}

export default ColorsPage;