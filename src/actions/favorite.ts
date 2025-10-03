"use server"

import prisma from "@/lib/prisma"

export async function handleFav(id: string){
    try {
        const fav = await prisma.favorite.findFirst({
            where: {
                productId: id
            },
            select: {
                id: true
            }
        })
        if(fav){
            await prisma.favorite.delete({
                where: {
                    id: fav.id
                }
            })
        }else {
            await prisma.favorite.create({
                data: {
                    product: {
                        connect: {
                            id
                        }
                    }
                }
            })
        }
        return true
    } catch (error) {
        return false
    }
}