import combine from '@turf/combine';

// Lower = drawn earlier
const typeSortOrder = [
  'MHA',
  'Housing and Homeless Organizing',
  'Rezoning',
  'Tenants',
  'CLT',
];

export const toGeoJson = locations => {
  return {
    type: "FeatureCollection",
    features: locations.map(toGeoJsonFeatures).flat()
  };
};

export const toGeoJsonFeatures = location => {
  const properties = {
    type: location.Type,
  };

  const feature = {
    type: "Feature",
    id: location.Id,
    properties: {
      id: location.Id,
      project: location.Project[0],
    },
    geometry: {
      type: "Point",
      coordinates: [
        location.Longitude,
        location.Latitude
      ]
    }
  };

  return location.Type.map(type => ({
    ...feature,
    properties: {
      ...feature.properties,
      type,
      typeOrder: typeSortOrder.indexOf(type),
    },
  }));
};

export const toPolygonGeoJson = locations => {
  return {
    type: "FeatureCollection",
    features: locations.map(toPolygonGeoJsonFeature)
  };
};

export const toPolygonGeoJsonFeature = location => {
  const polygons = JSON.parse(location.Polygons);
  const combined = combine(polygons);
  const properties = {
    id: location.Id,
    project: location.Project[0],
    type: location.Type,
  };
  return {
    type: "Feature",
    id: location.Id,
    properties,
    geometry: {
      ...combined.features[0].geometry,
    }
  };
};
