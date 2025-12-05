import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import BookStay from "@/components/BookStay";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white overflow-x-hidden">
        <Hero />
        <RoomsSection />
        <BookStay />
        <Footer />
      </main>
    </>
  );
}
