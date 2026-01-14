import Header from "./components/Header";
import Hero from "./components/Hero";
import TrendingShirts from "./components/TrendingShirts";
import Footer from "./components/Footer"; 

function App() {
  return (
    <>
      <Header />
      
      <main>
        <Hero />
        <TrendingShirts />
      </main>

      <Footer /> {}
    </>
  );
}

export default App;