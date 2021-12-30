import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';

import TravelRecord from 'lib/mongo/models/TravelRecord';
import { DELETE, MONGOOSE_OPTIONS, PUT } from 'lib/constants';

async function handler(req, res) {
  try {
    const { user } = await getSession({ req });

    try {
      await mongoose.connect(process.env.NEXTAUTH_DATABASE_URL, MONGOOSE_OPTIONS, null);
      const { query: { id }, body, method } = req;

      switch (method) {
        case PUT:
          try {
            const updatedRecord = await TravelRecord.updateOne({ _id: id }, body);

            if (!updatedRecord) {
              return res.status(500).json('Database error');
            }

            return res.status(200).json(updatedRecord);
          } catch (e) {
            return res.status(500).json(e);
          }
        case DELETE:
          try {
            const deletedRecord = await TravelRecord.deleteOne({ _id: id });

            if (!deletedRecord) {
              return res.status(400).json('Database error');
            }

            return res.status(200).json(deletedRecord);
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
    res.status(401).json('Unauthorized');
  }
}

export default handler;
