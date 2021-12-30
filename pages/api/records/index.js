import { getSession } from 'next-auth/react';
import * as mongoose from 'mongoose';
import { assign } from 'lodash';
import { Client } from '@googlemaps/google-maps-services-js';

import TravelRecord from 'lib/mongo/models/TravelRecord';
import { GET, MONGOOSE_OPTIONS, POST } from 'lib/constants';
import { createPoint } from 'lib/helpers';

async function handler(req, res) {
  try {
    const { user: { id: userid } } = await getSession({ req });

    try {
      await mongoose.connect(process.env.NEXTAUTH_DATABASE_URL, MONGOOSE_OPTIONS, null);
      const { query, method } = req;

      switch (method) {
        case POST:
          try {
            const { body } = req;

            const client = new Client();
            const key = process.env.GOOGLE_MAPS_API_KEY;

            const { data: { result: departure } } = await client.placeDetails({
              params: { place_id: body.departureid, key },
            });
            const { data: { result: arrival } } = await client.placeDetails({
              params: { place_id: body.arrivalid, key },
            });
            const { data } = await client.placePhoto({
              params: {
                photoreference: arrival.photos[Math.floor(Math.random() * arrival.photos.length)].photo_reference,
                maxheight: 400,
                key,
              },
            });

            const record = {
              ...body,
              userid,
              departurevicinity: departure.vicinity,
              departuregeom: createPoint(departure.geometry),
              arrivalvicinity: arrival.vicinity,
              arrivalgeom: createPoint(arrival.geometry),
              arrivalphoto: { mime: 'image/jpg', data },
            };

            const newRecord = await TravelRecord.create(record);

            if (!newRecord) {
              return res.status(500).json('Database error');
            }

            return res.status(201).json(newRecord);
          } catch (e) {
            return res.status(500).json(e);
          }
        case GET:
          try {
            const { limit, filter } = query;

            const filters = assign({}, { userid }, filter === 'All' ? {} : { traveltype: filter });
            const records = await TravelRecord.find(filters, null, { limit, sort: { traveldate: -1 } });

            return res.status(200).json(records);
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
