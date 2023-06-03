import React from 'react';
import Header from './header';
import Intro from './intro';
import Service from './service';
import Signup from './signUp';
import Location from './location';
import Contact from './contact';
import Footer from './footer';
import { HomePage } from '../../homepage/components/index';

import './intro.css';

const Introduction = () => {

    return (
        <React.Fragment>
            <HomePage />
            <Footer />
        </React.Fragment>
    );
}

export default Introduction;