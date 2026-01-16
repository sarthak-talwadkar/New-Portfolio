// import Services from "./components/services/Services";
// import Portfolio from "./components/portfolio/Portfolio";

import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";

const Front = lazy(() => import("./components/Front/Front"));
const Hero = lazy(() => import("./components/hero/Hero"));
//const About = lazy(() => import("./components/About/About"));
//const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
//const Experience = lazy(() => import("./components/Experience/Experience"));

const App = () => {
  return (
    <div className="container">
      <Front />
      <Hero />
    </div>
  );
};

export default App;
