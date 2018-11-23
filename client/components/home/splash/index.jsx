import React from 'react';
import './style.scss';

import splash1 from '../assets/splash-1.jpg';
import splash2 from '../assets/splash-2.jpg';
import splash3 from '../assets/splash-3.jpg';

const SplashImage = props => (
  <div className="splash-image">
    <div className="splash-image__number">
      <div className="number-container rel">
        <span className="number">
          {props.label}
        </span>
      </div>
    </div>
    <div className="splash-image__image">
      <img src={props.image} />
    </div>
    <div className="splash-image__desc">
      {props.desc}
    </div>
  </div>
);

export default () => (
  <div className="splash rel">
    <div className="splash-header">
      <div className="splash-header__main">
        Interview the right way
      </div>
      <div className="splash-header__sub">
        Get tailored interview templates based on decades of research to help you hire the perfect fit.
      </div>
    </div>
    <div className="splash-images">
      <SplashImage label='1' image={splash1} desc={['Choose', <br key='splash-1' />, 'role']} />
      <SplashImage label='2' image={splash2} desc={['Select What', <br key='splash-2' />, 'to Assess']} />
      <SplashImage label='3' image={splash3} desc={['Get Guide', <br key='splash-3' />, '& Rubric']} />
    </div>
  </div>
);
