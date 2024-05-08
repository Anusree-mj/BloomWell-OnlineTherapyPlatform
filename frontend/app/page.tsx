import Header from "./components/common/headers/header";;
import HomeCard from './components/homeComponents/homeCard';
import WorkFlows from './components/homeComponents/howItWorks';
import Accordion from './components/homeComponents/accordion';
import Footer from './components/common/footer/footer'

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '7.5rem' }}>
        <HomeCard />
      </div>
      <WorkFlows />
      <Accordion />
      <Footer />
    </>
  );
}
