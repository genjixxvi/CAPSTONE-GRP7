import Hero from "../components/Hero/Hero.jsx";
import Offer from '../components/Hero/cards.jsx';
import Banner from "../components/banner/banner.jsx";
import Footer from "../components/footer/footer.jsx";

function index() {


  return (
    <div className="overflow-x-hidden">
      <div className="bgStyle">
        <Hero />
      </div>
      <Offer />
      <Banner />
      <Footer />
    </div>
  );
}

export default index;
