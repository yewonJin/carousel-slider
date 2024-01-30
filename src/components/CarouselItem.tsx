"use client";

import Image, { StaticImageData } from "next/image";

export default function CarouselItem({ image }: { image: StaticImageData }) {
  return (
    <div
      className="min-w-[100%] relative aspect-video"
      onDragStart={() => false}
    >
      <Image src={image} alt="fruits" />
    </div>
  );
}
