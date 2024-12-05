import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from 'react';
import Header from '@components/Header';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from "next";

const HomePage: React.FC = () => {
    const { t } = useTranslation('');
    return (
        <>
            <Header />
            <div>
                <h1 style={styles.title}>{t("app.title")}</h1>
                <p style={styles.description}>{t("app.description")}</p>
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        marginBottom: '30px',
    },
    linkContainer: {
        marginTop: '20px',
    },
    link: {
        fontSize: '18px',
        color: '#0070f3',
        textDecoration: 'none',
    },
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
