import LayoutWithLogo from "@/components/layouts/LayoutWithLogo";
import { GoogleMapComponent } from "@/components/map/GoogleMapComponent";
import AddressModal from "@/components/modal/AddressModal";
import Image from "next/image";
import { useState } from "react";

export default function MapPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isMove, setIsMove] = useState(false);
  return (
    <>
      <LayoutWithLogo menuTitle='지도' isUasgeDetail={true}>
        <div className=''>
          <div className='mt-[28px]' />
          <div className='flex justify-start'>
            <Image src={"/img/mappath.svg"} alt='' width={12} height={120} />
            <div className='pl-[10px]'>
              <div className='flex items-center'>
                <div className='bg-[#f5f6fa] rounded-[10px] w-[355px] h-14 relative' />
                <svg
                  className='relative overflow-visible ml-[-30px]'
                  style={{ transform: "translate(0px, 0px)" }}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={(e) => {
                    setShowAddressModal(true);
                  }}
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.23431 5.21153C8.54673 4.92949 9.05327 4.92949 9.36569 5.21153L15.7657 10.9893C16.0781 11.2714 16.0781 11.7286 15.7657 12.0107L9.36569 17.7885C9.05327 18.0705 8.54673 18.0705 8.23431 17.7885C7.9219 17.5064 7.9219 17.0491 8.23431 16.7671L14.0686 11.5L8.23431 6.23291C7.9219 5.95087 7.9219 5.49358 8.23431 5.21153Z'
                    fill='#BBBBBB'
                  />
                </svg>
              </div>
              <div className='mt-[10px]' />
              <div className='flex items-center'>
                <div className='bg-[#f5f6fa] rounded-[10px] border-solid border-[#262628] border w-[355px] h-14 relative'>
                  <div className='flex flex-row items-center'>
                    <div className='pl-[12px] pt-[17px] text-[#262628] text-[18px] font-sans font-bold '>
                      Drop off
                    </div>
                  </div>
                </div>
                <svg
                  className='relative overflow-visible ml-[-30px]'
                  style={{ transform: "translate(0px, 0px)" }}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={(e) => {
                    setIsMove(true);
                    setShowAddressModal(true);
                  }}
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.23431 5.21153C8.54673 4.92949 9.05327 4.92949 9.36569 5.21153L15.7657 10.9893C16.0781 11.2714 16.0781 11.7286 15.7657 12.0107L9.36569 17.7885C9.05327 18.0705 8.54673 18.0705 8.23431 17.7885C7.9219 17.5064 7.9219 17.0491 8.23431 16.7671L14.0686 11.5L8.23431 6.23291C7.9219 5.95087 7.9219 5.49358 8.23431 5.21153Z'
                    fill='#262628'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='mt-[28px]' />
          {/* 지도 */}
          <div className='ml-[-30px]'>
            <div
              className='h-[43px] w-[111px] bg-white rounded-lg absolute top-[285px] left-[20px] z-50'
              onClick={(e) => {}}
            >
              <div className='text-[#000000] text-center relative font-sans text-[16px] top-3'>
                Frieze Seoul
              </div>
            </div>
            <GoogleMapComponent size={{ width: "425px", height: "640px" }} />
          </div>
        </div>
        <AddressModal
          show={showAddressModal}
          setShow={setShowAddressModal}
          isMove={isMove}
        />
      </LayoutWithLogo>
    </>
  );
}
