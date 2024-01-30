import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

export const useSlider = (length: number, isMobile: boolean) => {
  const [boxWidth, setBoxWidth] = useState(0);
  // offset을 위한 터치가 시작된 절대적인 위치
  const [startPageX, setStartPageX] = useState(0);
  // scrollX를 고려한 터치가 시작된 위치
  const [curPageX, setCurPageX] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const [isOnScroll, setIsOnScroll] = useState(false);
  const [isLongPressScroll, setIsLongPressScroll] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // resize 이벤트가 발생하면 boxWidth 재설정하기
  useEffect(() => {
    const onResize = () => {
      if (!ref.current) return;

      setBoxWidth(ref.current.clientWidth);
    };

    onResize();

    window.addEventListener("resize", onResize);
  }, []);

  const initLongPressScrollTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const startLongPressScrollTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPressScroll(true);
    }, 500);
  };

  const onSlideStart = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    let pageX = getPageX(e);

    setStartPageX(pageX);
    setCurPageX(pageX - scrollX);

    setIsOnScroll(true);
    startLongPressScrollTimer();
  };

  const onSlide = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    if (!isOnScroll) return;

    let pageX = getPageX(e);

    if (pageX - curPageX >= 0 || pageX - curPageX <= -boxWidth * (length - 1))
      return;

    setScrollX(pageX - curPageX);
  };

  const onSlideEnd = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    if (!isOnScroll) return;

    setIsOnScroll(false);
    initLongPressScrollTimer();

    // 오랫동안 눌렀을 때는 절반 이상 넘어가야 페이지 전환
    if (isLongPressScroll) {
      setScrollX(
        -boxWidth * (Math.ceil((scrollX - boxWidth / 2) / -boxWidth) - 1)
      );
      setIsLongPressScroll(false);
      return;
    }

    // 짧게 눌렀을 때는 조금만 움직여도 페이지 전환
    let pageX = getPageX(e);

    const offset = pageX - startPageX;

    if (offset === 0) return;

    if (offset < -10) {
      if (Math.ceil(scrollX / -boxWidth) >= length) return;
      setScrollX(-boxWidth * Math.ceil(scrollX / -boxWidth));
    }

    if (offset > -10) {
      if (Math.ceil(scrollX / -boxWidth) <= 0) return;
      setScrollX(-boxWidth * (Math.ceil(scrollX / -boxWidth) - 1));
    }
  };

  const getPageX = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    if (isMobile) {
      const touchEvent = e as TouchEvent<HTMLDivElement>;
      return touchEvent.changedTouches[0].pageX;
    }

    const mouseEvent = e as MouseEvent<HTMLDivElement>;
    return mouseEvent.pageX;
  };

  return {
    scrollX,
    isOnScroll,
    boxWidth,
    ref,
    onSlideStart,
    onSlide,
    onSlideEnd,
  };
};
