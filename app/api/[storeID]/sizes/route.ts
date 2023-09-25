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

        const { name, value } = body;

        if(!name){
            return new NextResponse("Name is required", {status : 400});
        }
        if(!value){
            return new NextResponse("Value is required", {status : 400});
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


        const size = await prismadb.size.create({
            data : {
                name,
                value,
                storeId : params.storeID
            }
        });

        return NextResponse.json(size);
        
    }
    catch(error){
        console.log('[Sizes_POST]', error)
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

       


        const sizes = await prismadb.size.findMany({
           where : {
            storeId : params.storeID
           }
        });

        return NextResponse.json(sizes);
        
    }
    catch(error){
        console.log('[Sizes_GET]', error)
        return new NextResponse("INTERNAL SERVOR ERROR",{status: 500 })
    }
}