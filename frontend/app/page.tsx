import Header from "../components/common/headers/header";;
import HomeCard from '../components/user/homeComponents/homeCard';
import WorkFlows from '../components/user/homeComponents/howItWorks';
import Accordion from '../components/user/homeComponents/accordion';
import Footer from '../components/common/footer/footer'


export default function Home() {
  return (
    <>      
      <Header />
      <div style={{ paddingTop: '5.6rem' }}>
        <HomeCard />
      </div>
      <WorkFlows />
      <Accordion />
      <Footer />
    </>
  );
}
