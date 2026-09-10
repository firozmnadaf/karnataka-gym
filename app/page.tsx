import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Programs from "@/components/Programs";
import WomenTraining from "@/components/WomenTraining";
import Trainer from "@/components/Trainer";
import Results from "@/components/Results";
import Gallery from "@/components/Gallery";
import ResponsibleFitness from "@/components/ResponsibleFitness";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* Mobile-First Cinematic Hero */}
      <Hero />

      {/* Infinite Horizontal Athletic Marquee */}
      <Marquee />

      {/* 01 / Experience */}
      <Experience />

      {/* 02 / Programs */}
      <Programs />

      {/* Women's Training Campaign */}
      <WomenTraining />

      {/* 03 / Coach Riyaz Gokul */}
      <Trainer />

      {/* 04 / Results & Commitment */}
      <Results />

      {/* 05 / Inside The Gym Gallery & Fullscreen Lightbox */}
      <Gallery />

      {/* 06 / Responsible Fitness */}
      <ResponsibleFitness />

      {/* 07 / Final Cinematic CTA */}
      <FinalCTA />
    </>
  );
}
