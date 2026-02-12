import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { Tracking } from "./components/Tracking";
import { LeadScoring } from "./components/LeadScoring";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { BlogSection } from "./components/BlogSection";
import { motion, useScroll, useSpring } from "motion/react";

export default function LandingPage() {
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
