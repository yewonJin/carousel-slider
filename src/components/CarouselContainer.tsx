"use client";

import React, { Children } from "react";

import CarouselIndicator from "./CarouselIndicator";

import { useSlider } from "@/hooks/useSlider";

type Props = {
  children: React.ReactNode;
  isMobile: boolean;
};

export default function CarouselContainer(props: Props) {
  const { children, isMobile } = props;

  const length = Children.count(children);

  const {
    scrollX,
    isOnScroll,
    boxWidth,
    ref,
    onSlideStart,
    onSlide,
    onSlideEnd,
  } = useSlider(length, isMobile);

  return (
    <div className="w-full relative">
      <div
        className="flex relative"
        ref={ref}
        onMouseDown={onSlideStart}
        onMouseMove={onSlide}
        onMouseUp={onSlideEnd}
        onMouseLeave={onSlideEnd}
        onTouchStart={onSlideStart}
        onTouchMove={onSlide}
        onTouchEnd={onSlideEnd}
        style={{
          transform: `translateX(${scrollX}px)`,
          transitionDuration: isOnScroll ? "0ms" : "400ms",
        }}
      >
        {children}
      </div>
      <CarouselIndicator
        length={length}
        curPage={Math.floor((scrollX + -boxWidth / 2) / -boxWidth)}
      />
    </div>
  );
}
