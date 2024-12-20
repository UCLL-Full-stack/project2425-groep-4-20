import Header from '@components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import LoginForm from '@components/login/loginForm';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Header />
            <main className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
                <LoginForm />
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default LoginPage;
