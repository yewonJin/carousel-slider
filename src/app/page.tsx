import { headers } from "next/headers";

import CarouselContainer from "@/components/CarouselContainer";
import CarouselItem from "@/components/CarouselItem";

import blackberry from "../../public/blackberry.png";
import cherry from "../../public/cherry.png";
import raspberry from "../../public/raspberry.png";
import strawberry from "../../public/strawberry.png";

import { isMobile } from "@/lib/isMobile";

export default function Home() {
  const header = headers();
  const userAgent = header.get("user-agent") as string;

  return (
    <main className="overflow-x-hidden mt-16 flex flex-col items-center max-w-[600px] mx-auto">
      <h1 className="mb-6 text-center text-2xl font-bold">이미지 슬라이더</h1>
      <CarouselContainer isMobile={isMobile(userAgent)}>
        <CarouselItem image={blackberry} />
        <CarouselItem image={cherry} />
        <CarouselItem image={raspberry} />
        <CarouselItem image={strawberry} />
      </CarouselContainer>
    </main>
  );
}
