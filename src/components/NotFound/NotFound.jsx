import React from 'react'
import Style from './NotFound.module.scss'
import Notfound from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <div className="notfound py-5 text-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
      </Helmet>
      <img src={Notfound} alt="not found" />
    </div>
  );
}
