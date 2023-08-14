import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
  return (
    <div>
      <div className="  sm:grid grid-cols-3">
        <br />
        <div className="  flex items-center justify-center  w-full font-bold text-red-700 text-7xl col-span-2">
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={250}
            height={20}
            className=" rounded-lg"
          />
        </div>
        <div className="flex justify-end">
          {" "}
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={100}
            height={100}
            className=" rounded-lg"
          />
        </div>
      </div>
      <br />
      <div className=" sm:grid grid-cols-3 ">
        <div className="mr-4 flex justify-center items-center">
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={280}
            height={420}
            className=" rounded-lg"
          />
        </div>

        <div className=" h-96 overflow-y-auto scrollbar scrollbar-track-gray-900 scrollbar-thumb-red-700 scrollbar-thumb-rounded pr-5">
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={250}
            height={20}
            className=" rounded-lg"
          />
          <br />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={250}
            height={20}
            className=" rounded-lg"
          />
          <br />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={250}
            height={20}
            className=" rounded-lg"
          />
          <br />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
            width={150}
            height={20}
            className=" rounded-lg"
          />
        </div>
        <div className="  flex flex-col justify-center items-center">
          <div>
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: "grey.900" }}
              animation="wave"
              width={180}
              height={260}
              className=" rounded-lg"
            />
          </div>
          <br />
          <p>
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: "grey.900" }}
              animation="wave"
              width={100}
              height={10}
              className=" rounded-lg"
            />
          </p>
        </div>
      </div>
      {/* {film?.trailer && (
        <div className=" flex justify-center">
          <iframe
            width="660"
            height="415"
            src={`${film.trailer}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen="allowfullscreen"
          />
        </div>
      )}
      <p className=" flex justify-center text-red-700">Actors :</p>
      <div className="flex flex-col justify-end">
        <div className="w-fit h-fit mx-auto overflow-x-hidden overflow-y-hidden bg-gray-900 rounded-lg">
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className=" max-w-3xl "
          >
            {film?.Actors?.map((actor, index) => (
              <div key={actor.id} className="flex items-center mb-4">
                <SwiperSlide key={actor.id}>
                  <div className=" items-center mt-2">
                    <Image
                      src={actor?.image}
                      alt="Actor Image"
                      width={100}
                      height={120}
                    />
                    <p className="ml-4">
                      {actor.first_name} <br /> {actor.last_name}
                    </p>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div> */}
    </div>
  );
}
