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
  const { showModal } = useSelector((state) => state.modal);
  const swiperRef = useRef();
  const swiperRefThumbs = useRef();
  const images = [
    "https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Dog
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6", // Cat
    "https://media.istockphoto.com/id/589563524/photo/white-rabbit-on-green-grass.jpg?s=612x612&w=0&k=20&c=jMWMyavOEm3p8hNQF8WJ-ZIZ8ODES3Z5iDQ6Snwku8E=",
    "https://t3.ftcdn.net/jpg/02/47/33/08/360_F_247330858_RvSJWAhMbfrqsM5VUmjLD4gzzSKUaJls.jpg", // Rabbit
    "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyZHxlbnwwfHwwfHx8MA%3D%3D", // Bird
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2", // Elephant
    "https://cms.bbcearth.com/sites/default/files/factfiles/2024-04/Giraffe_BBC%20Earth%20Factfiles%205.jpg?imwidth=1920",
    "https://t4.ftcdn.net/jpg/04/15/79/09/360_F_415790935_7va5lMHOmyhvAcdskXbSx7lDJUp0cfja.jpg",
    "https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?cs=srgb&dl=pexels-richard-verbeek-177679-572861.jpg&fm=jpg",
    "https://aldf.org/wp-content/uploads/2018/05/lamb-iStock-665494268-16x9-e1559777676675.jpg",
    "https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg",
    "https://cdn.shopify.com/s/files/1/3026/6974/files/bulldog-puppy.jpg?v=1533748956",
    "https://static.vecteezy.com/system/resources/thumbnails/042/730/459/small/lion-danger-animal-wildlife-nature-forest-photo.jpg",
    "https://rukminim3.flixcart.com/image/850/1000/j1861zk0/poster/4/n/4/large-szpp294-deer-baby-cute-animal-poster-original-imaefzbj53p5jatd.jpeg?q=20&crop=false",
    "https://i.pinimg.com/236x/be/de/17/bede177a6815ce8b9bc5162cbd8de4ad.jpg",
    "https://media.istockphoto.com/id/1399292810/photo/group-of-wildlife-animals-in-the-jungle-together.jpg?s=612x612&w=0&k=20&c=NXVzp7awiZhUf-OjcSmaDTcWz3h_XyGcozlTFD883eg=",
    "https://detroitzooblog.org/wp-content/uploads/2019/04/45691596745_c0fda47e8a_k.jpg",
  ];
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
              dispatch(setCloseModal());
            }}
          >
            <RxCross1 />
          </span>
        </Tooltip>
      </div>
      <Swiper
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
