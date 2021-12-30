export const createPoint = (geometry) => ({
  type: 'Point',
  coordinates: [geometry.location.lat, geometry.location.lng],
});
