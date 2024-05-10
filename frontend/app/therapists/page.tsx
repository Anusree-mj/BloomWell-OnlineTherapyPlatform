import Header from '../../components/common/headers/header'
import QueryComponent from '../../components/therapists/therapistJob/queryComponent';
import TherapistJobComponent from '../../components/therapists/therapistJob/therapistComponent';
import Footer from '../../components/common/footer/footer';

export default function () {
    return (
        <>
            <Header />
            <div style={{ paddingTop: '5.6rem' }}>
                <QueryComponent />
            </div>
            <TherapistJobComponent />
            <Footer />
        </>
    );
}
