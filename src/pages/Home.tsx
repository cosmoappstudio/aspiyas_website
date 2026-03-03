import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { ValuesSection } from '../components/home/ValuesSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { VenturesSection } from '../components/home/VenturesSection';
import { RecentBlogsSection } from '../components/home/RecentBlogsSection';
import { FaqSection } from '../components/home/FaqSection';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ValuesSection />
      <ServicesSection />
      <VenturesSection />
      <RecentBlogsSection />
      <FaqSection />
    </Layout>
  );
}
