
import React from 'react';

const Hero = ({ title, imageUrl }) => {
    return ( 
        <div className='hero container' >
            <div className="banner">
                <h1>{title}</h1>
                <p>Excelr Hospital is a cutting-edge healthcare facility committed to offering comprehensive and compassionate care.
                  Our expert team provides personalized treatment designed to meet each patient’s unique needs. At Excelr,
                  your health and well-being are our top priority, guiding you toward a smooth and successful journey to optimal wellness.
                </p>
            </div>
            <div className="banner">
             {/*<img src={imageUrl} alt="Hero" className='animated-image'/>*/}
                <span>
                   {/*<img src="/Vector.png" alt="Vector" />*/}
                </span>
            </div>
        </div>
    );
}

export default Hero;
