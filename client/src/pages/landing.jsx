import React from "react";
import ArticlesSection from "../components/landing/articlesSection";
import FirstSection from "../components/landing/firstSection";
import Footer from "../components/landing/footer";
import FourthSection from "../components/landing/fourthSection";
import Navbar from "../components/landing/navbar";
import SecondSection from "../components/landing/secondSection";
import ThirdSection from "../components/landing/thirdSection";

const Landing = () => {
  return (
    <>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <ArticlesSection />
      <Footer />
    </>
  );
};

export default Landing;
