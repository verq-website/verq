"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AboutData } from "@/service/fetchAbout";
import ContainerLayout from "@/containerLayout/ContainerLayout";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    data: AboutData | null;
}

const About = ({ data }: AboutProps) => {
    if (!data) return null;
    const sectionRef = useRef(null);
    const circleRef = useRef(null);
    const contentRef = useRef(null);


    useEffect(() => {
        const section = sectionRef.current;
        const circle = circleRef.current;

        if (!section || !circle) return;

        // Get viewport dimensions for proper scaling
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const diagonal = Math.sqrt(vw * vw + vh * vh);
        const isMobile = vw < 1024;
        const scaleValue = isMobile ? (diagonal / 80) * 2 : (diagonal / 200) * 2;

        // Set initial states
        gsap.set(circle, {
            scale: 1,
            transformOrigin: "center center",
        });




        // Create the scroll-triggered animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                pin: false,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Animate the circle to cover the entire screen
        tl.to(circle, {
            scale: scaleValue,
            duration: 1,
            ease: "power2.out",
        });

        const floatingTl = gsap.timeline({ repeat: -1 });

        floatingTl
            .to(circle, {
                y: "+=30",
                x: "+=20",
                duration: 3,
                ease: "power1.inOut",
            })
            .to(circle, {
                y: "-=60",
                x: "-=10",
                duration: 3,
                ease: "power1.inOut",
            })
            .to(circle, {
                y: "+=30",
                x: "-=10",
                duration: 3,
                ease: "power1.inOut",
            });

        // Mobile image animation - simple and elegant entrance
        const imageEntranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            floatingTl.kill();
            imageEntranceTl.kill();
        };
    }, []);

    return (
        <ContainerLayout>
            <div
                id="about"
                ref={sectionRef}
                className="About-section relative z-10 flex flex-col item-center justify-center lg:h-[190vh] min-h-screen py-10 lg:py-0 gap-1 px-5 lg:px-0 rounded-xl overflow-hidden"
            >
                <div
                    ref={circleRef}
                    className="absolute w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] bg-[radial-gradient(ellipse_900px_700px_at_25%_25%,#e07a5f_0%,#101010_20%,#000000_45%,#4a2a0d_75%,#000000_100%)] rounded-full top-20 -right-10 lg:top-40 lg:-right-10 z-10"
                >
                    {/* <Image
                    src="/bgZoom.png"
                    alt="Animated element"
                    fill
                    className="object-cover rounded-full"
                /> */}
                </div>


                <div className="absolute hidden lg:flex flex-row justify-between w-full 2xl:max-w-7xl xl:max-w-6xl left-1/2 -translate-x-1/2 2xl:top-90 xl:top-60 gap-10">

                    {/* ABOUT Column */}
                    <h1 className="flex flex-col gap-3 text-[16px] text-[#FF3D00] inter leading-none">
                        {["A", "B", "O", "U", "T"].map((l) => (
                            <span key={l}>{l}</span>
                        ))}
                    </h1>

                    {/* US Column */}
                    <h1 className="flex flex-col gap-3 text-[16px] text-[#FF3D00] inter leading-none">
                        {["U", "S"].map((l) => (
                            <span key={l}>{l}</span>
                        ))}
                    </h1>

                </div>
                <div className="z-10 text-black lg:text-[24px] text-[12px] lg:leading-[28px] leading-[15px] font-medium text-center px-4">
                    <h1 className="text-[#FFDED3] text-[40px] leading-[42px] lg:text-[89px] lg:leading-[88px] max-w-xl mx-auto">
                        {data.title}
                    </h1>
                    <p className="text-[#C8C8C8] text-[14px] lg:text-[20px] max-w-2xl mt-2 mx-auto">
                        {data.desc}
                    </p>
                </div>

                <div
                    ref={contentRef}
                    className="relative z-10 flex lg:flex-row flex-col items-center 2xl:gap-50 xl:gap-1 gap-10 mt-10 lg:mt-20 max-w-7xl mx-auto w-full"
                >
                    {/* Left side - First image */}
                    {data.GroupedImageIcon[0] && (
                        <div className="flex-1 flex flex-col gap-5 w-full lg:w-auto">
                            <div className="relative overflow-hidden w-full lg:w-90 h-[250px] lg:h-[550px] rounded-t-full mx-auto">
                                <Image
                                    src={data.GroupedImageIcon[0].Image.url}
                                    alt={data.GroupedImageIcon[0].Image.alternativeText}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-row gap-3 items-center justify-center">
                                <div className="p-4 bg-[#FFD0C1] rounded-full">
                                    <Image src='/Icons/pen.png' alt='pen' width={25} height={25} />
                                </div>
                                <p className="text-[#C8C8C8] text-[12px] lg:text-[15px] inter max-w-xs leading-[15px] lg:leading-[16px] mx-auto lg:mx-0">
                                    {data.GroupedImageIcon[0].desc}
                                </p>
                            </div>

                        </div>
                    )}

                    {/* Right side - Two images stacked */}
                    <div className="flex-1 flex flex-col md:gap-40 gap-5 w-full lg:w-auto ">
                        {data.GroupedImageIcon[1] && (
                            <div className="flex flex-col items-center gap-5">
                                <div className="relative overflow-hidden w-[150px] h-[150px] xl:w-55 xl:h-55  2xl:w-70 2xl:h-70 rounded-full mx-auto lg:mx-0">
                                    <Image
                                        src={data.GroupedImageIcon[1].Image.url}
                                        alt={data.GroupedImageIcon[1].Image.alternativeText}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center justify-center">
                                    <div className="p-4 bg-[#FFD0C1] rounded-full">
                                        <Image src='/Icons/settings.png' alt='pen' width={25} height={25} />
                                    </div>
                                    <p className="text-[#C8C8C8] text-[12px] lg:text-[15px] inter max-w-sm leading-[15px] lg:leading-[16px] mx-auto lg:mx-0">
                                        {data.GroupedImageIcon[1].desc}
                                    </p>
                                </div>
                            </div>
                        )}

                        {data.GroupedImageIcon[2] && (
                            <div className="flex flex-col items-center gap-5 mt-5 lg:mt-10">
                                <div className="relative overflow-hidden w-full max-w-[300px] lg:max-w-none xl:max-w-md 2xl:max-w-none h-[130px] lg:h-[180px] xl:h-[180px] 2xl:h-[180px] rounded-full mx-auto lg:mx-0">
                                    <Image
                                        src={data.GroupedImageIcon[2].Image.url}
                                        alt={data.GroupedImageIcon[2].Image.alternativeText}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-row gap-3 items-center justify-center">
                                    <div className="p-4 bg-[#FFD0C1] rounded-full">
                                        <Image src='/Icons/stopwatch.png' alt='pen' width={20} height={20} />
                                    </div>
                                    <p className="text-[#C8C8C8] text-[12px] lg:text-[15px] inter max-w-sm leading-[15px] lg:leading-[16px] mx-auto lg:mx-0">
                                        {data.GroupedImageIcon[2].desc}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContainerLayout>

    );
};

export default About;