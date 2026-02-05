import Heading from "../../../components/Heading"
import FlashDealCard from "./FlashDealCard"
import { useQuery } from "@tanstack/react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const FlashDeals = () => {
  const axiosPublic = useAxiosPublic()

    const { data: flashDeals = []} = useQuery({
        queryKey: ['flashDeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/bus-flash-deal');
            return res.data;
        }
    })


  return (
    <>
      <div>
        <Heading
          title={"Catch the Best Deals Before Departure"}
          subtitle={"Flash Deals"}
        />
      </div>
      <div className="py-10">
        <Swiper
          // slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {
            flashDeals.map((deal: any, idx: number) =>
              <SwiperSlide key={idx}>
                <FlashDealCard deal={deal} />
              </SwiperSlide>
            )
          }

        </Swiper>
      </div>
    </>
  )
}

export default FlashDeals
