import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import CustomCursor from "@/components/custom-cursor";
import Protocol from "@/components/sections/protocol";
import ScanLine from "@/components/animations/scan-line";
import Testimonials from "@/components/sections/testimonials";
import Features from "@/components/sections/features";
import FinalCTA from "@/components/sections/final-cta";
import Security from "@/components/sections/security";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
/*
  NEXT.JS SETUP REQUIS :

  1. npm install framer-motion

  2. Dans layout.tsx, ajoute dans <head> :
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

  3. Metadata SEO (layout.tsx ou page.tsx) :
     export const metadata = {
       title: "Tracy — Deploy Your Own AI Agent. Your Server. Your Rules.",
       description: "Open-source AI agent framework. Self-hosted, end-to-end encrypted, model agnostic. Zero data leaks.",
       keywords: ["self-hosted AI agent","private AI framework","deploy AI agent","knowledge base AI","secure LLM","RAG self-hosted","air-gapped AI","Tracy framework"],
       openGraph: { title: "Tracy — Your AI, Your Server", type: "website", url: "https://tracy.sh" },
       twitter: { card: "summary_large_image" },
       robots: { index: true, follow: true },
       alternates: { canonical: "https://tracy.sh" },
     };

  4. JSON-LD dans layout.tsx :
     <script type="application/ld+json">{JSON.stringify({
       "@context":"https://schema.org","@type":"SoftwareApplication",
       "name":"Tracy","applicationCategory":"DeveloperApplication",
       "operatingSystem":"Linux,macOS,Windows",
       "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
       "description":"Self-hosted AI agent framework. Private RAG, REST API, AES-256.",
       "featureList":["Self-hosted","Private knowledge base","REST API","AES-256","Air-gap"],
       "url":"https://tracy.sh"
     })}</script>
*/

export default function TracyPage() {
  return (
    <div
      className="min-h-screen bg-[#19222a] antialiased selection:bg-[#235789] selection:text-white"
      style={{ fontFamily: "'DM Sans',sans-serif", cursor: "none" }}
    >
      <CustomCursor />
      <ScanLine />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Protocol />
        <Security />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
