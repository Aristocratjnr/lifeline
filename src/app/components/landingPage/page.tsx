"use client";
import React from "react";
import NavBar from "./navBar";
import HeroSection from "./heroSection";
import FeatureCards from "./featureCard";
import FirstAidScenarios from "./firstAidScenatios";
import Testimonials from "./testimonial";
import LifelineFAQ from "./lifeLineFaq";
import Footer from "./footer";
import FeedbackButton from "./feedback-button";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function LandingPage() {
    return (
        <div className={inter.className}>
            <NavBar />
            <HeroSection />
            <FeatureCards /><br/>
            <FirstAidScenarios />
            <Testimonials />
            <LifelineFAQ />
            <FeedbackButton />
            <Footer />
        </div>
    );
}