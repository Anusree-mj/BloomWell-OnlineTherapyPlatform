import Header from "./components/headers/header";
import HomeCard from './components/homeCard/homeCard'
import WorkFlows from './components/howItWorks/index'

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '7.5rem' }}>
        <HomeCard />
      </div>
      <WorkFlows />
    </>
  );
}
