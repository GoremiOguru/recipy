"use client";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import {Products} from "@/actions/product";
import { handleFav } from "@/actions/favorite";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  data: Products[0];
  className?: string;
}

export function Product({ data, className }: Props) {
  const router = useRouter();
  return (
    <Link href={`/recipies/${data.id}`}>
    <Card
      style={{ backgroundImage: `url(${data.image[0].url})` }}
      className={cn(
        " h-60 bg-cover min-w-20 text-white bg-center rounded-xl bg-no-repeat flex p-0",
        className
      )}
    >
      <div className="bg-black/40 relative flex-1 rounded-xl flex flex-col justify-end p-4">
        <div className=" flex justify-between">
          <h4 className="text-xl font-medium">{data.name}</h4>
          <Button
            variant={"ghost"}
            asChild
            onClick={async (e) => {
              e.preventDefault()
              const res = await handleFav(data.id);
              if (res) {
                router.refresh()
                if(!data.favourites?.length){
                  
                toast.success("Product added successfully");
                }
                else {
                toast.success("Product removed successfully");}
              } else {
                toast.error("Something went wrong");
              }
            }}
          >
            <div className=" absolute z-20 top-2 right-2 p-2 rounded-full">
              <Heart className={cn(" w-6 h-6", data.favourites?.length > 0 && "fill-primary text-primary")} />
            </div>
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm line-clamp-1">{data.description}</p>
        </div>
      </div>
    </Card>
    </Link>
  );
}
