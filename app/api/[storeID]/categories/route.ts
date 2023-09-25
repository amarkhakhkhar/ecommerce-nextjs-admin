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

        const { name, billboardId} = body;

        if(!name){
            return new NextResponse("Name is required", {status : 400});
        }
        if(!billboardId){
            return new NextResponse("Billboard ID is required", {status : 400});
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


        const category = await prismadb.category.create({
            data : {
                name,
                billboardId,
                storeId : params.storeID
            }
        });

        return NextResponse.json(category);
        
    }
    catch(error){
        console.log('[Categories_POST]', error)
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

       


        const categories = await prismadb.category.findMany({
           where : {
            storeId : params.storeID
           },
           include:{
            billboard: true
           }
        });

        return NextResponse.json(categories);
        
    }
    catch(error){
        console.log('[Categories_GET]', error)
        return new NextResponse("INTERNAL SERVOR ERROR",{status: 500 })
    }
}