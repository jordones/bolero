import { useState, useEffect } from 'react';
import { Linking } from 'react-native';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = func => useEffect(() => func(), []);

export const useInitialUrl = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};
