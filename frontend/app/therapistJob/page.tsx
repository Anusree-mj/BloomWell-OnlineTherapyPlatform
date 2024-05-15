import Header from '../../components/common/headers/header'
import QueryComponent from '../../components/user/therapistJob/queryComponent';
import TherapistJobComponent from '../../components/user/therapistJob/therapistComponent';
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
