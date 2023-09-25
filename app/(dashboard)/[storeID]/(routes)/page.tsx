import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, IndianRupeeIcon, Package } from "lucide-react";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboaardProps{
    params : { storeID : string}
}

const DashboardPage : React.FC<DashboaardProps>  = async({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeID)
    const salesCount = await getSalesCount(params.storeID);
    const stockCount = await getStockCount(params.storeID);
    const graphRevenue = await getGraphRevenue(params.storeID);
   
    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Dashboard" description="Overview of your store"/>
            <Separator/>
            <div className="grid gap-4 grid-cols-3">
                <Card>
                    <CardHeader className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Revenue
                        </CardTitle>
                    <IndianRupeeIcon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Sales
                        </CardTitle>
                    <CreditCardIcon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                           {salesCount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Products in Stock
                        </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                           {stockCount}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview data = {graphRevenue}/>
                </CardContent>
            </Card>
        </div>  
    </div>
     );
}
 
export default DashboardPage;