import { Client } from '@googlemaps/google-maps-services-js';
import dbConnect from '../../../utils/db';
import TravelRecord from '../../../models/mongo/travelrecord';

dbConnect();

const client = new Client();

const index = async(req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const records = await TravelRecord.find({
          userid: req.query.userid,
        });
        res.status(200).json(records);
      } catch (error) {
        res.status(400).json([]);
      }
      break;
    case 'POST':
      try {
        let record = req.body;
        const departure = await client.placeDetails({
          params: {
            place_id: record.departureid,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
        });
        const arrival = await client.placeDetails({
          params: {
            place_id: record.arrivalid,
            key: process.env.GOOGLE_MAPS_API_KEY,
          },
        });
        const photo = await client.placePhoto({
          params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            photoreference:
            arrival.data.result.photos[
              Math.floor(Math.random() * arrival.data.result.photos.length)
              ].photo_reference,
            maxheight: 400,
          },
        });
        record = {
          ...record,
          departurevicinity: departure.data.result.vicinity,
          departuregeom: {
            type: 'Point',
            coordinates: [
              departure.data.result.geometry.location.lat,
              departure.data.result.geometry.location.lng,
            ],
          },
          arrivalvicinity: arrival.data.result.vicinity,
          arrivalgeom: {
            type: 'Point',
            coordinates: [
              arrival.data.result.geometry.location.lat,
              arrival.data.result.geometry.location.lng,
            ],
          },
          arrivalphoto: {
            mime: 'image/jpg',
            data: photo.data,
          },
        };
        const newrecord = await TravelRecord.create(record);
        if (!newrecord) {
          res.status(400).json({});
        }
        res.status(201).json(newrecord);
      } catch (error) {
        res.status(400).json({});
      }
      break;
    default:
      res.status(400).json({});
      break;
  }
};

export default index;
