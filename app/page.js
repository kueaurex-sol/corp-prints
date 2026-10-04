// export default function Home() {
//   return (
//     <main style={{ fontFamily: "Arial, sans-serif", padding: 40 }}>
//       <h1>Corps Prints API</h1>
//       <p>This is a backend-only Next.js app. Available endpoints:</p>
//       <ul>
//         <li><code>POST /api/submissions</code></li>
//         <li><code>GET /api/submissions</code></li>
//         <li><code>GET /api/submissions/:id</code></li>
//         <li><code>PATCH /api/submissions/:id/status</code></li>
//         <li><code>GET /api/submissions/check/:email</code></li>
//       </ul>
//     </main>
//   );
// }
import ScrollBar from "@/components/home/Scrollbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Brands from "@/components/home/Brands";
import Testimonials from "@/components/home/Testimonials";
import Cta from "@/components/home/Cta";
import Gallery from "@/components/home/Gallery";

export const metadata = { title: "Corp Prints | Visual branding and fabrication" };

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <ScrollBar />
      <Hero />
      <About />
      <Services />
      <Brands />
      <Testimonials />
      <Cta />
      <Gallery />
    </main>
  );
}