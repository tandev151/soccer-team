// components/Card.jsx
"use client";

import { Player } from "@/constants/squash";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  className?: string;
  playerData: Player;
  isSelected?: boolean;
};

const Card = ({ className, playerData, isSelected }: Props) => {
  const router = useRouter();

  // Hàm để chuyển đổi trạng thái khi nhấp vào thẻ - navigate to player detail
  const handleCardClick = () => {
    if (!isSelected) {
      return;
    }
    // Navigate to player detail page instead of flipping card
    router.push(`/player/${playerData.id}`);
  };

  return (
    // Container chính cho hiệu ứng 3D, thêm 'group' để kích hoạt hiệu ứng hover cho các phần tử con
    <div
      className={cn(
        "group w-[280px] sm:w-[250px] h-[400px] bg-transparent",
        className,
        isSelected ? "" : "opacity-50"
      )}
      onClick={handleCardClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out `}
      >
        <div
          className={cn(
            "absolute w-full h-full p-2 box-border transition-transform duration-700 ease-in-out  bg-gradient-to-bl from-purple-200 to-red-200 border-none  rounded-tl-3xl rounded-br-3xl",
            isSelected ? "cursor-pointer" : ""
          )}
        >
          {/* Lớp nền gradient */}
          <div className="relative bg-transparent w-full h-full bg-[url(/an-phu-logo.png)] bg-contain bg-no-repeat"></div>
          {/* Logo 'MF' */}
          <div className="absolute top-[20px] right-2 bg-gradient-to-bl from-orange-900 to-red-400 w-[50px] h-[30px] rounded-4xl flex justify-center items-center font-bold text-white">
            {playerData?.position}
          </div>
          {/* Nội dung chính của mặt trước */}
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center w-full ">
            {/* Vùng chứa hình ảnh cầu thủ */}
            <div
              className={cn(
                "mt-12 w-[280px] h-[280px] transition-transform duration-500",
                isSelected ? "scale-180 translate-y-2" : ""
              )}
            >
              <Image
                src={playerData?.imageSrc} // Hãy chắc chắn bạn có ảnh này trong thư mục /public
                alt="Lionel Messi"
                width={300}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thông tin cầu thủ */}
            <div className="absolute bottom-[-50px] flex flex-col items-center bg-transparent w-full rounded-tl-lg rounded-br-lg z-10 p-2">
              <div
                className={cn(
                  "absolute -top-8 rounded-full bg-red-900 font-bold text-2xl text-white w-[60px] h-[60px] flex justify-center items-center border-4 border-orange-200",
                  isSelected
                    ? "transition-all duration-300 [text-shadow:1px_1px_2px_#78350f group-hover:[box-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b] group-hover:[text-shadow:0_0_1px_#fff,0_0_10px_#fff,0_0_15px_#f59e0b,0_0_20px_#f59e0b]"
                    : ""
                )}
              >
                {playerData.number}
              </div>
              <div
                className={cn(
                  "mt-6 text-2xl font-semibold text-shadow-amber-900",
                  isSelected
                    ? "transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#000,0_0_10px_#000,0_0_15px_#f59e0b,0_0_20px_#f59e0b]"
                    : ""
                )}
              >
                {playerData.firstName}
              </div>
              <div
                className={cn(
                  "text-4xl font-semibold text-amber-800 ",
                  isSelected
                    ? "transition-all duration-300 [text-shadow:1px_1px_2px_#78350f] group-hover:text-white group-hover:[text-shadow:0_0_1px_#000,0_0_10px_#000,0_0_15px_#f59e0b,0_0_20px_#f59e0b]"
                    : ""
                )}
              >
                {playerData.lastName}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
