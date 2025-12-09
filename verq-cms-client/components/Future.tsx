'use client'

import ContainerLayout from '@/containerLayout/ContainerLayout'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FutureData } from '@/service/fetchFuture'

gsap.registerPlugin(ScrollTrigger)

type FutureProps = {
    data: FutureData;
};

const Future = ({ data: futureData }: FutureProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=1500%',
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <ContainerLayout className=''>
            <div ref={sectionRef} className='px-4 sm:px-6 md:px-8 lg:px-10 relative -z-50 bg-[#101010]'>
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='absolute inset-0 w-full h-full object-cover rounded-[20px] sm:rounded-[28px] md:rounded-[36px] -z-10'
                >
                    <source src={futureData.Video || "/verq.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className='flex flex-col items-start h-screen justify-between w-full py-4 sm:py-5 gap-6 sm:gap-8 md:gap-0'>
                    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6 sm:gap-8 lg:gap-4'>
                        <h1 className='text-[#FF3D00] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[88px] leading-[1.1] sm:leading-[1.1] md:leading-[88px] tracking-tight max-w-full lg:max-w-lg'>
                            {futureData.title}
                        </h1>
                        <div className='flex flex-col gap-3 sm:gap-4 md:gap-2 w-full lg:w-auto'>
                            <p className='inter max-w-full lg:max-w-xl text-[#7D7474] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[21px]'>
                                {futureData.desc}
                            </p>
                            <button className='bg-[#FF3D00] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] uppercase text-black rounded-full px-6 sm:px-7 md:px-8 py-2 w-fit'>Sign up</button>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full'>
                        {futureData.Points.map((item) => (
                            <div key={item.id} className='bg-[#FF3D002B] px-5 sm:px-6 md:px-7 lg:px-8 py-4 sm:py-5 md:py-4 border border-[#FFFFFF63] backdrop-blur-[6.8px] text-center flex flex-col items-center justify-between h-full rounded-full gap-3 sm:gap-10 md:gap-16 lg:gap-16 xl:gap-16 2xl:gap-20'>
                                <h1 className='text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px]'>{item.title}</h1>
                                <p className='text-[13px] sm:text-[14px] md:text-[14px] lg:text-[15px] inter'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </ContainerLayout>

    )
}

export default Future