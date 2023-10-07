import React from "react";
import Style from "./Home.module.scss";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div className="home py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </div>
  );
}
