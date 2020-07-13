import React, { useState } from 'react';
import { GoogleApiWrapper } from "google-maps-react";

import TopBar from './TopBar';

export default {
  title: 'TopBar',
  component: TopBar,
};

const wrapWithGoogleApi = (Component) => (
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    // @ts-ignore
  })(Component)
)

const Container = wrapWithGoogleApi(({ Child }) => {
  const [location, setLocation] = useState([]);

  return <Child location={location} setLocation={setLocation} />
})

export const Default = () => <Container Child={TopBar} />