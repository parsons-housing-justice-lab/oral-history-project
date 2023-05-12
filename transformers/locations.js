export const toGeoJson = locations => {
  return {
    type: "FeatureCollection",
    features: locations.map(toGeoJsonFeature)
  };
};

export const toGeoJsonFeature = location => {
  return {
    type: "Feature",
    id: location.Id,
    properties: { ...location },
    geometry: {
      type: "Point",
      coordinates: [
        location.Longitude,
        location.Latitude
      ]
    }
  };
};
