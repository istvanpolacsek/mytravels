import { getSession } from 'next-auth/react';
import * as mongoose from 'mongoose';
import { assign } from 'lodash';

import { GET } from 'lib/constants';
import TravelRecord from 'lib/mongo/models/TravelRecord';

async function handler(req, res) {
  const { method, query } = req;

  const session = await getSession({ req });

  await mongoose.connect(process.env.NEXTAUTH_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, null);

  switch (method) {
    case GET:
      try {
        const { user: { id: userid } } = session;
        const { limit, filter } = query;

        const filters = assign({}, { userid }, filter === 'All' ? {} : { traveltype: filter });
        const records = await TravelRecord.find(filters, null, { limit, sort: { traveldate: -1 } });

        res.status(200).json(records);
      } catch (e) {
        res.status(401).json('Unauthorized');
      }

      break;
    default:
      res.status(400).json('Bad Request');
      break;
  }
}


export default handler;
