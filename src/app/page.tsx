import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Playground from "@/components/Playground";
import HowIWork from "@/components/HowIWork";
import About from "@/components/About";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { homeGraph } from "@/content/jsonld";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Stats />
        <Work />
        <Playground />
        <HowIWork />
        <About />
      </main>
      <Contact />
      <JsonLd data={homeGraph()} />
    </>
  );
}
