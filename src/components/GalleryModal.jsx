import { useDispatch, useSelector } from "react-redux";
import { modalEnum, setCloseModal } from "../store/modalSlice";
import Modal from "./Modal";
import {
  Pagination,
  Navigation,
  Zoom,
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Thumbs,
  FreeMode,
  Controller,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { RxCross1, RxCross2 } from "react-icons/rx";
import {
  BsPlayCircle,
  BsStopCircle,
  BsZoomIn,
  BsFullscreen,
  BsDownload,
} from "react-icons/bs";
import Tooltip from "./Tooltip";

const GalleryModal = () => {
  const dispatch = useDispatch();
  const { showModal, contents } = useSelector((state) => state.modal);
  const { images, index: initIndex } = contents ?? { images: [], index: 0 }; // use nullish coalescing
  const swiperRef = useRef();
  const swiperRefThumbs = useRef();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [zoomInVal, setZoomInVal] = useState(1);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (!progressCircle?.current?.style) return;
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    if (initIndex !== 0) {
      setCurrentSlideIndex(initIndex);
    }
  }, [images]);

  useEffect(() => {
    if (!swiperRef?.current) return;
    if (isAutoplay) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.resume();
      swiperRef.current.autoplay.stop();
    }
  }, [isAutoplay]);

  useEffect(() => {
    if (showModal !== modalEnum.GalleryModal) {
      swiperRef.current = null;
      setZoomInVal(1);
      setIsAutoplay(false);
    }
  }, [showModal]);

  const handleZoom = (ratio) => {
    setIsAutoplay(false);
    if (!swiperRef?.current) return;
    if (ratio > 0) {
      swiperRef.current.zoom.in(zoomInVal + 1);
      setZoomInVal(zoomInVal + 1);
    } else {
      swiperRef.current.zoom.out(1);
      setZoomInVal(1);
    }
  };

  const downloadImage = (url, filename = "image.jpg") => {
    //latter
  };

  const goToSlide = (index) => {
    setIsAutoplay(false);
    if (swiperRef?.current) {
      setCurrentSlideIndex(index);
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    console.log(showModal);
  }, [showModal]);

  if (images?.length === 0) return;

  return (
    <Modal isOpen={showModal === modalEnum.GalleryModal}>
      {/* <Modal isOpen={true}> */}
      <div className="absolute pr-[2rem] flex items-center gap-[2rem] text-[#eaeaea] z-[20] top-0 right-0  h-[3rem] ">
        {!isAutoplay ? (
          <Tooltip text={"Play"} dir={"bottom"}>
            <span
              className="cursor-pointer"
              onClick={() => setIsAutoplay(true)}
            >
              <BsPlayCircle />
            </span>
          </Tooltip>
        ) : (
          <Tooltip text={"Pause"} dir={"bottom"}>
            <span
              className="cursor-pointer"
              onClick={() => setIsAutoplay(false)}
            >
              <BsStopCircle />
            </span>
          </Tooltip>
        )}
        {zoomInVal > 1 && (
          <Tooltip text={"Reset Zoom"} dir={"bottom"}>
            <span className="cursor-pointer" onClick={() => handleZoom(-1)}>
              <BsFullscreen />
            </span>
          </Tooltip>
        )}
        <Tooltip text={"Zoom In"} dir={"bottom"}>
          <span className="cursor-pointer" onClick={() => handleZoom(1)}>
            <BsZoomIn />
          </span>
        </Tooltip>

        <Tooltip text={"Download"} dir={"bottom"}>
          <span className="cursor-pointer" onClick={() => downloadImage()}>
            <BsDownload />
          </span>
        </Tooltip>
        <div className="h-[1rem] border border-gray-400"></div>
        <Tooltip text={"Exit"} dir={"bottom"}>
          <span
            className="cursor-pointer"
            onClick={() => {
              setCurrentSlideIndex(0);
              dispatch(setCloseModal());
            }}
          >
            <RxCross1 />
          </span>
        </Tooltip>
      </div>
      <Swiper
        initialSlide={initIndex}
        key={images.length}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        slidesPerView={"auto"}
        spaceBetween={20}
        zoom={{
          maxRatio: 5,
          minRatio: 1,
        }}
        navigation={true}
        lazy={true}
        // loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          type: "fraction",
        }}
        onSwiper={(swiperInstance) => {
          // get instance of this swiper and save in a react ref

          if (!swiperInstance) return;
          swiperRef.current = swiperInstance;
          // setSwiper(swiperInstance);
          setZoomInVal(1);
        }}
        onSlideChange={(swiperInstance) => {
          const index_currentSlide = swiperInstance.realIndex;
          setCurrentSlideIndex(index_currentSlide);
          if (swiperRefThumbs?.current) {
            swiperRefThumbs.current.slideTo(index_currentSlide);
          }
        }}
        onZoomChange={(_, scale) => {
          setZoomInVal(scale);
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        modules={[Keyboard, Zoom, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {images.map((imgUrl, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container flex justify-center items-center h-full w-full py-3">
              <img
                className="rounded max-h-full w-auto"
                src={imgUrl}
                alt="Chat img"
                loading="lazy"
              />
            </div>
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
        {isAutoplay && (
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )}
      </Swiper>
      <Swiper
        key={`thumbs-${images.length}`}
        spaceBetween={2}
        slidesPerView={"auto"}
        freeMode={true}
        lazy={true}
        onSwiper={(swiperInstance) => {
          // get instance of this swiper and save in a react ref

          if (!swiperInstance) return;
          swiperRefThumbs.current = swiperInstance;
        }}
        modules={[Navigation]}
        className="mySwiper2 "
      >
        {images.map((imgUrl, i) => (
          <SwiperSlide
            key={i}
            className={
              i === currentSlideIndex
                ? "border-2 border-red-600 opacity-100"
                : "border-2 border-gray-100 opacity-30"
            }
            onClick={() => goToSlide(i)}
          >
            <img
              className="rounded h-full"
              src={imgUrl}
              alt="Chat img"
              loading="lazy"
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Modal>
  );
};

export default GalleryModal;
