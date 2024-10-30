import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Hero from "../components/hero/hero";
import Add from "../components/add/add";
import Banner from "../components/banner/banner";
import Slider from "../components/slider/slider";
import Cards from "../components/cards/cards";
import NewCars from "../components/newCars/newCars";
import WithPrice from "../components/filtrWithPrice/withPrice";
import Questions from "../components/questions/questions";
import Reklams from "../components/reklams/reklams";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Add />
      <Banner />
      <Slider />
      <Cards />
      <NewCars />
      <Questions />
      <Reklams />
      <Footer />
    </>
  );
}

export default Home;
