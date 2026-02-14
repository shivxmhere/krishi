import { HeroSection } from '@/components/marketing/hero/HeroSection';
import { FeaturesGrid } from '@/components/marketing/features/FeaturesGrid';
import { TestimonialCarousel } from '@/components/marketing/testimonials/TestimonialCarousel';
import { PricingCards } from '@/components/marketing/pricing/PricingCards';
import { CTASection } from '@/components/marketing/cta/CTASection';
import { Footer } from '@/components/marketing/footer/Footer';

export default function LandingPage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <FeaturesGrid />
            <TestimonialCarousel />
            <PricingCards />
            <CTASection />
            <Footer />
        </main>
    );
}
