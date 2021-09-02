import { useEffect, useMemo, useRef } from 'react';
import { throttle } from 'lodash';

const autocompleteService = { current: null };

const loadScript = () => {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', 'google-maps');
  script.src = process.env.NEXT_PUBLIC_MAPS_SRC;
  if (!document.querySelector('#google-maps')) {
    document.querySelector('head').appendChild(script);
  }
};

const usePlacesPrediction = () => {
  const loaded = useRef(false);

  const hasWindow = typeof window !== 'undefined';
  const hasGoogle = !!window.google;

  useEffect(() => {
    if (hasWindow) {
      loadScript();
      loaded.current = true;
    }
  }, [hasWindow]);

  useEffect(() => {
    if (hasGoogle && !autocompleteService.current) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [hasGoogle]);

  const fetchPlacesPredictions = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current?.getPlacePredictions(request, callback);
      }, 500),
    []
  );

  return { fetchPlacesPredictions };
};

export default usePlacesPrediction;
