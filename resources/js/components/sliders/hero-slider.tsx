import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HeroSlider({ products }: { products: Product[] }) {
    return (
        <>
            <Swiper
                pagination={{
                    clickable: true,
                    bulletClass: 'banner-pagination-bullet',
                    bulletActiveClass: 'banner-pagination-bullet-active',
                }}
                modules={[Pagination]}
            >
                {products?.map((item: Product) => (
                    <SwiperSlide key={item.id}>
                        <div className="grid grid-cols-2 items-center px-7 xl:px-16">
                            <div className="space-y-8 py-10 text-center">
                                {item?.description && <p className="text-sm font-medium text-gray-500">{item.description}</p>}
                                <div className="flex flex-1">
                                    <h1 className="mx-auto text-3xl font-bold">{item.title}</h1>
                                </div>
                                {item.handle && <Button>Browse</Button>}
                            </div>

                            <div className="">
                                <img src={item.image} className="mx-auto w-[388px] lg:w-full" width={'507'} height={'385'} alt="banner image" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
