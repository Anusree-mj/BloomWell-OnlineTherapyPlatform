import Header from '../../components/common/headers/header'
import QueryComponent from '../../components/user/therapistJob/queryComponent';
import TherapistJobComponent from '../../components/user/therapistJob/therapistComponent';
import Footer from '../../components/common/footer';

export default function () {
    return (
        <>
            <Header />
                <QueryComponent />
            <TherapistJobComponent />
            <Footer />
        </>
    );
}
