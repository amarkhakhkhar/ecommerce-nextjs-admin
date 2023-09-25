import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(
    req : Request,
    {params}: {params : {storeID: string}}
){
    try{

        const { userId } = auth();
        const body = await req.json();

        if(!userId){
            return new NextResponse("Unauthenticated", {status : 401});
        }

        const { label, imageUrl } = body;

        if(!label){
            return new NextResponse("Label is required", {status : 400});
        }
        if(!imageUrl){
            return new NextResponse("Image URL is required", {status : 400});
        }

        if(!params.storeID){
            return new NextResponse("Store ID is required", {status : 400});
        }

        const storeByUserId  = await prismadb.store.findFirst({
            where : {
                id : params.storeID,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status : 403})
        }


        const billboard = await prismadb.billboard.create({
            data : {
                label,
                imageUrl,
                storeId : params.storeID
            }
        });

        return NextResponse.json(billboard);
        
    }
    catch(error){
        console.log('[Billboards_POST]', error)
        return new NextResponse("INTERNAL SERVOR ERROR",{status: 500 })
    }
}
export async function GET(
    req : Request,
    {params}: {params : {storeID: string}}
){
    try{

        

        if(!params.storeID){
            return new NextResponse("Store ID is required", {status : 400});
        }

       


        const billboards = await prismadb.billboard.findMany({
           where : {
            storeId : params.storeID
           }
        });

        return NextResponse.json(billboards);
        
    }
    catch(error){
        console.log('[Billboards_GET]', error)
        return new NextResponse("INTERNAL SERVOR ERROR",{status: 500 })
    }
}