'use client'

import { LoginHeader } from "../../../../components/common/headers/loginHeader";
import Footer from '../../../../components/common/footer/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { individualQuestionnaire } from "@/components/common/questionaire/individual";
import { coupleQuestionnaire } from "@/components/common/questionaire/couple";
import { teenQuestionnaire} from '@/components/common/questionaire/teen'
import ClientQuiestionnaire from '@/components/common/questionaire/clientQuestionnaire'
import store from "@/store";
import { Provider } from "react-redux";

interface QuestionnaireProps {
    params: {
        questionnaire: string;
    };
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ params }) => {
    const type = params.questionnaire
    let questionnaire = [];
    if (params.questionnaire === 'Individual') {
        questionnaire = individualQuestionnaire;
    } else if (params.questionnaire === 'Couples') {
        questionnaire = coupleQuestionnaire
    } else {
        questionnaire = teenQuestionnaire
    }
    return (
        <>
            <Provider store={store}>
                <ToastContainer />
                <LoginHeader />
                <ClientQuiestionnaire type={type} questionnaire={questionnaire} />
                <Footer />
            </Provider>
        </>

    )
}

export default Questionnaire