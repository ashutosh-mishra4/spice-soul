import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImageWithTextSection } from "@/components/sections/ImageWithTextSection";
import { ProductGridSection } from "@/components/sections/ProductGridSection";
import { ProductSliderSection } from "@/components/sections/ProductSliderSection";
import { SubscribeSaveSection } from "@/components/sections/SubscribeSaveSection";
import { OurFormulasSection } from "@/components/sections/OurFormulasSection";

export default function Home() {
	return (
		<main className="min-h-screen">
			<Header />
			<HeroSection />
			<ProductGridSection />
			<ImageWithTextSection />
			<ProductSliderSection />
			<SubscribeSaveSection />
			<OurFormulasSection />
			<Footer />
		</main>
	);
}
