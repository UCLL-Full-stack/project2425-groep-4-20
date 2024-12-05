import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from 'react';
import Header from '@components/Header';
import { useTranslation } from 'next-i18next';

const HomePage: React.FC = () => {
    const {t} = useTranslation('');

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center px-6 py-12 max-w-3xl bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">
                        {t("app.title")}
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        {t("app.description")}
                    </p>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
    };

export default HomePage;
