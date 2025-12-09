'use client';

import ContainerLayout from '@/containerLayout/ContainerLayout';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const Design = ({ data }: { data: any }) => {
  if (!data) return null;

  const title = data.Title || '';
  const points = data.Points || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const [screenSize, setScreenSize] = useState<'mobile' | 'desktop' | '2xl'>('desktop');

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 768) setScreenSize('mobile');
      else if (window.innerWidth >= 1536) setScreenSize('2xl');
      else setScreenSize('desktop');
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Mobile positions (< 768px)
  const mobilePositions = [
    { top: '8%', left: '5%' },
    { top: '18%', right: '5%' },
    { top: '50%', left: '2%' },
    { top: '62%', right: '8%' },
    { top: '75%', left: '10%' },
  ];

  // Desktop positions (768px – 1535px)
  const desktopPositions = [
    { top: '5%', left: '15%' },
    { top: '15%', right: '15%' },
    { top: '55%', left: '1%' },
    { top: '65%', right: '38%' },
    { top: '52%', right: '5%' },
  ];

  // NEW: 2xl positions (1536px+)
  const twoXlPositions = [
    { top: '12%', left: '18%' },
    { top: '29%', right: '20%' },
    { top: '50%', left: '7%' },
    { top: '68%', right: '39%' },
    { top: '58%', right: '18%' },
  ];

  // Choose the correct array based on current screen size
  const positions =
    screenSize === 'mobile'
      ? mobilePositions
      : screenSize === '2xl'
      ? twoXlPositions
      : desktopPositions;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const progress = 1 - rect.top / windowHeight;
        setScrollOffset(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxStyle = (index: number) => {
    const speeds = [30, -40, 50, -35, 45];
    const speed = speeds[index % speeds.length];
    const movement = scrollOffset * speed;

    return {
      transform: `translateY(${movement}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  return (
    <ContainerLayout>
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center gap-4 md:gap-8 bg-[#101010] min-h-screen md:h-[130vh] py-12 md:py-20 px-4"
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[159px] xl:text-[159px] 2xl:text-[200px] text-center relative z-10">
          {title}
        </h1>

        <div className="absolute top-80 2xl:top-120">
          <Image
            src="/design.png"
            alt="icons"
            width={40}
            height={40}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
        </div>

        <div className="absolute inset-0 w-full h-full">
          {points.map((point: any, index: number) => (
            <div
              key={point.id}
              className="absolute p-4 sm:p-5 md:p-6 border rounded-full w-[140px] h-[200px] sm:w-[160px] sm:h-[240px] md:w-[198px] md:h-[300px] text-[#FF3D00] flex items-center justify-center"
              style={{
                ...positions[index % positions.length],
                ...getParallaxStyle(index),
              }}
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-start">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Design;