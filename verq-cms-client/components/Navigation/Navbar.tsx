// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV_LINKS } from "@/constants/Nav";

const ScrambleLink = ({ text, href }: { text: string; href: string }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startScramble = () => {
    if (!linkRef.current) return;

    // Kill any previous animation
    if (timelineRef.current) timelineRef.current.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    let iteration = 0;

    tl.to(linkRef.current, {
      duration: 0.9, // Total scramble time: ~1 second
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        iteration = Math.floor(progress * 15); // Faster reveal

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("");

        if (linkRef.current) {
          linkRef.current.textContent = scrambled;
        }
      },
      onComplete: () => {
        if (linkRef.current) {
          linkRef.current.textContent = text;
          linkRef.current.style.color = "#ffffff";
        }
      },
    });

    // Smooth color transition
    gsap.to(linkRef.current, {
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const reset = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    gsap.to(linkRef.current, {
      color: "#C8C8C8",
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        if (linkRef.current) {
          linkRef.current.textContent = text;
        }
      },
    });
  };

  return (
    <Link
      href={href}
      ref={linkRef}
      className="text-lg sm:text-xl lg:text-[20px] xl:text-[22px] font-medium tracking-wider inline-block"
      style={{ color: "#C8C8C8" }}
      onMouseEnter={startScramble}
      onMouseLeave={reset}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contactRef = useRef<HTMLAnchorElement>(null);
  const contactTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const contactText = "CONTACT";

  const startContactScramble = () => {
    if (!contactRef.current) return;

    if (contactTimelineRef.current) contactTimelineRef.current.kill();

    const tl = gsap.timeline();
    contactTimelineRef.current = tl;

    let iteration = 0;

    tl.to(contactRef.current, {
      duration: 0.9,
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        iteration = Math.floor(progress * 15);

        const scrambled = contactText
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("");

        if (contactRef.current) {
          contactRef.current.textContent = scrambled;
        }
      },
      onComplete: () => {
        if (contactRef.current) {
          contactRef.current.textContent = contactText;
        }
      },
    });
  };

  const resetContact = () => {
    if (contactTimelineRef.current) {
      contactTimelineRef.current.kill();
      contactTimelineRef.current = null;
    }

    gsap.to(contactRef.current, {
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        if (contactRef.current) {
          contactRef.current.textContent = contactText;
        }
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row md:px-[7px] px-3 pt-[7px] gap-[7px] lg:gap-0">
      {/* Top Bar - Logo and Mobile Menu Toggle */}
      <div className="flex flex-row items-center justify-between w-full lg:w-auto">
        {/* Logo */}
        <div className="rounded-[20px] px-3 sm:px-5 py-2 sm:py-3 border border-[#C8C8C8] flex items-center">
          <Image 
            src="/verq.png" 
            alt="Verq" 
            width={300} 
            height={300} 
            className="w-20 sm:w-24 lg:w-28 pt-1 sm:pt-2" 
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden rounded-[20px] px-4 py-4 border border-[#C8C8C8] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span
              className={`h-0.5 bg-[#C8C8C8] transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-[#C8C8C8] transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-[#C8C8C8] transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Nav Links - Desktop and Mobile */}
      <div
        className={`
          border border-[#C8C8C8] rounded-[20px] 
          lg:w-full lg:flex lg:items-center lg:justify-end lg:px-4 xl:px-8 lg:gap-4 xl:gap-8 2xl:gap-12
          ${isMenuOpen ? "flex" : "hidden lg:flex"}
          flex-col lg:flex-row items-start lg:items-center
          px-6 py-6 lg:py-0 gap-6 lg:gap-4 xl:gap-8 2xl:gap-12
        `}
      >
        {NAV_LINKS.map((item, index) => (
          <div key={index} className="w-full lg:w-auto">
            <ScrambleLink text={item.name} href={item.href} />
          </div>
        ))}

        {/* Contact Button */}
        <Link
          ref={contactRef}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.getElementById('contact');
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          onMouseEnter={startContactScramble}
          onMouseLeave={resetContact}
          className="
            bg-[#FF3D00] text-black rounded-full hover:bg-[#FF3D00]/90 transition-all duration-300
            w-full lg:w-auto text-center
            px-6 sm:px-8 lg:px-6 xl:px-10 
            py-2 sm:py-2.5 lg:py-2
            text-lg sm:text-xl lg:text-[20px] xl:text-[22px]
            font-medium
          "
        >
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Navbar;