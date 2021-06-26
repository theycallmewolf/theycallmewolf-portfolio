import { useEffect, useState } from 'react';
import SwiperCore, { A11y, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTheme } from '../../../hooks/useTheme';
import { SliderProps } from '../../../types';
import { CustomLink } from '../Link';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export function Slider({
  slides,
  testimonials,
  contentType,
  hasLink,
  hasIcon,
  additionalClass = '',
  ...rest
}: SliderProps): JSX.Element {
  const [slideNumber, setSlideNumber] = useState('01');
  const [slideList, setSlideList] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);

  const { hasDarkMode } = useTheme();

  useEffect(() => {
    setSlideList(slides);
    setTestimonialList(testimonials);
  }, [slides, testimonials]);

  function handleSlideNumber(sliderIndex: number) {
    setSlideNumber(String(sliderIndex + 1).padStart(2, '0'));
  }

  return (
    <div
      className={`slider-container ${hasDarkMode ? 'dark' : undefined} ${additionalClass}`}
      {...rest}>
      <Swiper
        spaceBetween={48}
        navigation
        grabCursor={true}
        loop={false}
        speed={600}
        effect={contentType === 'testimonial' ? 'fade' : 'slide'}
        className={contentType === 'testimonial' && 'testimonial'}
        breakpoints={{
          320: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: contentType === 'image' ? 2 : 1,
            spaceBetween: 0
          }
        }}
        onSlideChange={(swiper) => handleSlideNumber(swiper.activeIndex)}>
        {contentType === 'image' &&
          slideList.map((slide, i) => (
            <SwiperSlide key={i}>
              <figure>
                <picture>
                  <source
                    srcSet={`${slide.slider.image_large}, ${slide.slider.image_large_2x} 2x`}
                    media="(min-width: 1440px)"
                  />
                  <source
                    srcSet={`${slide.slider.image_small}, ${slide.slider.image_small_2x} 2x`}
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet={`${slide.slider.image_large}, ${slide.slider.image_large_2x} 2x`}
                    media="(min-width: 600px)"
                  />
                  <source srcSet={`${slide.slider.image_small_2x} 2x`} />
                  <img src={slide.slider.image_small} alt={slide.title} />
                </picture>
                {slide.slider.caption && (
                  <figcaption>{`(${slide.project_date}) ${slide.slider.caption}`}</figcaption>
                )}
              </figure>
              {hasLink && <CustomLink href={`work/project/${slide.slug}`} hasIcon={hasIcon} />}
            </SwiperSlide>
          ))}

        {contentType === 'testimonial' &&
          testimonialList.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <p>{testimonial.quote}</p>
              <p>
                <small>
                  <strong>{testimonial.name}</strong>, {testimonial.jobTitle},{' '}
                  {testimonial.publish_date}
                </small>
              </p>
            </SwiperSlide>
          ))}

        {contentType === 'image' && <SwiperSlide></SwiperSlide>}
      </Swiper>
      <div className="current-slide">{slideNumber}</div>
    </div>
  );
}
