import React from 'react';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';

const Home = () => {
    return (
        <>
            <Hero
                title={"EXCELR Hospital, Where Compassion Meets Excellence in Healthcare "}
                //imageUrl={""}
            />
            <Biography /*imageUrl={"/"}*/ />
            <Departments />
            <MessageForm />

        </>
    );
}

export default Home;
