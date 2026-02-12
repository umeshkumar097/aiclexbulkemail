"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Tracking } from "@/components/landing/Tracking";
import { LeadScoring } from "@/components/landing/LeadScoring";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { BlogSection } from "@/components/landing/BlogSection";
import { motion, useScroll, useSpring } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Tracking />
        <LeadScoring />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <BlogSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
