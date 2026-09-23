import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyMetricsBar } from './components/KeyMetricsBar';
import { ApartmentList } from './components/ApartmentList';
import { AmenitiesSection } from './components/AmenitiesSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { SimulatorSection } from './components/SimulatorSection';
import { LocationSection } from './components/LocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { FloatingCta } from './components/FloatingCta';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Assurance Metrics Bar */}
        <KeyMetricsBar />

        {/* Apartments & Floor Plans Showcase */}
        <ApartmentList />

        {/* Rooftop & Amenities */}
        <AmenitiesSection />

        {/* Engineering & Differentials */}
        <DifferentialsSection />

        {/* Interactive Financing Simulator */}
        <SimulatorSection />

        {/* Location & Neighborhood Highlights */}
        <LocationSection />

        {/* Social Proof & Testimonials */}
        <TestimonialsSection />

        {/* FAQs */}
        <FaqSection />

        {/* High Conversion Pre-Footer CTA */}
        <CtaSection />
      </main>

      {/* Floating CTA Button (Visible on scroll) */}
      <FloatingCta />

      {/* Legal & Informative Footer */}
      <Footer />
    </div>
  );
}
