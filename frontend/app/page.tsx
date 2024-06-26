import Header from "../components/common/headers/header";;
import HomeCard from '../components/user/homeComponents/homeCard';
import WorkFlows from '../components/user/homeComponents/howItWorks';
import Accordion from '../components/user/homeComponents/accordion';
import Footer from '../components/common/footer'


export default function Home() {
  return (
    <>      
      <Header />
        <HomeCard />
      <WorkFlows />
      <Accordion />
      <Footer />
    </>
  );
}
