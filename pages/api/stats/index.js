import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import {
  ARRIVAL_GEOMETRY,
  ARRIVAL_VICINITY,
  DEPARTURE_GEOMETRY,
  GET,
  HAVERSINE_OPTIONS,
  MONGOOSE_OPTIONS,
  TRAVEL_DATE,
  TRAVEL_TYPE,
  TRAVEL_TYPES,
} from 'lib/constants';
import TravelRecord from 'lib/mongo/models/TravelRecord';
import { assign, filter, includes, map, reduce, size, uniq } from 'lodash';
import haversine from 'haversine';

const projection = [
  TRAVEL_TYPE,
  TRAVEL_DATE,
  ARRIVAL_VICINITY,
  ARRIVAL_GEOMETRY,
  DEPARTURE_GEOMETRY,
];

async function handler(req, res) {
  try {
    const { user: { id: userid } } = await getSession({ req });

    try {
      await mongoose.connect(process.env.NEXTAUTH_DATABASE_URL, MONGOOSE_OPTIONS, null);
      const { method } = req;

      switch (method) {
        case GET:
          try {
            const filters = { userid };

            const records = await TravelRecord.find(filters, projection, { sort: { traveldate: -1 } });

            const years = uniq(map(records, ({ traveldate }) => new Date(traveldate).getFullYear()));
            const bars = reduce(years, (acc, year) => {
              const travels = filter(records, ({ traveldate }) => new Date(traveldate).getFullYear() === year);
              const stats = {};


              const kilometers = reduce(
                travels,
                (acc, {
                  departuregeom,
                  arrivalgeom,
                }) => acc + haversine(departuregeom.coordinates, arrivalgeom.coordinates, HAVERSINE_OPTIONS),

                0,
              );
              const cities = reduce(
                travels,
                (acc, { arrivalvicinity }) => includes(acc, arrivalvicinity) ? acc : [...acc, arrivalvicinity],
                [],
              );

              const pieStats = reduce(TRAVEL_TYPES, (acc, { key }) => {
                const travelsByType = filter(travels, ({ traveltype }) => traveltype === key);

                return size(travelsByType) ? [...acc, { name: key, value: size(travelsByType) }] : acc;
              }, []);

              assign(stats, { kilometers, cities: size(cities), pieStats });
              return [...acc, { year, ...stats }];
            }, []);

            return res.status(200).json(bars);
          } catch (e) {
            return res.status(500).json(e);
          }
        default:
          return res.status(400).json('Bad Request');
      }
    } catch (e) {
      return res.status(500).json(e);

    }
  } catch (e) {
    res.status(401).json(e);

  }
}

export default handler;
