import { Client } from '@googlemaps/google-maps-services-js';
import dbConnect from '../../../utils/db';
import TravelRecord from '../../../models/mongo/travelrecord';

dbConnect();
const client = new Client();

export default async (req, res) => {
  const { method, query: { id, photoreference } } = req;

  switch (method) {
    case 'GET':
      try {
        let photourl = null;
        if (photoreference !== 'undefined') {
          const res = await client.placePhoto({
            params: {
              key: process.env.GOOGLE_MAPS_API_KEY,
              photoreference: photoreference,
              maxheight: 300
            }
          })
          photourl = await res.request.res.responseUrl;
        }
        if (!photourl) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, photourl: photourl })
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const updated = await TravelRecord.updateOne({ _id: id }, req.body);
        if (!updated) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updated });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleted = await TravelRecord.deleteOne({ _id: id });
        if (!deleted) {
          return res.status(400).json({ success: false });  
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}