// components/Carousel.jsx
'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import './Carousel.css';
import { cn } from '@/lib/utils';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './CarouselPrevNextButton';

// 1. Định nghĩa Props dạng Generic
//    - `T`: Là một kiểu dữ liệu bất kỳ (placeholder) cho item trong mảng.
//    - `items`: Là một mảng các phần tử có kiểu `T`.
//    - `children`: Là một hàm (render prop) nhận vào một `item` kiểu `T`
//                  và trạng thái `isSelected`, trả về một ReactNode để render.
type CarouselProps<T> = {
  items: T[];
  children: (item: T, isSelected: boolean) => ReactNode;
  options?: EmblaOptionsType;
};

// Component này sẽ nhận các slides (chính là các Card) làm children
export const Carousel = <T,>({
  items,
  children,
  options
}: CarouselProps<T>) => {
  // 1. Khởi tạo Embla Carousel với hook useEmblaCarousel
  //    - options: ở đây ta để loop: true để carousel có thể cuộn vô tận
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...options
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Cập nhật lại khi re-initialize
    onSelect();

    return () => {
      // Dọn dẹp listener khi component unmount
      if (emblaApi) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  return (
    // 2. Cấu trúc HTML mà Embla yêu cầu
    //    - embla: là container ngoài cùng
    //    - embla__viewport: là "khung nhìn", phần slide sẽ được hiển thị qua đây
    <div className='embla'>
      <div className='embla__viewport ' ref={emblaRef}>
        {/* embla__container: chứa tất cả các slide */}
        <div className='embla__container mt-20'>
          {/* - Dùng `items.map` thay vì `React.Children.map`. */}
          {/* - Gọi hàm `children` (render prop) để render nội dung slide. */}
          {items.map((item, index) => (
            <div className='embla__slide' key={index}>
              {children(item, selectedIndex === index)}
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};
