import dbConnect from '../../../utils/db';
import TravelRecord from '../../../models/mongo/travelrecord';

dbConnect();

const id = async(req, res) => {
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT':
      try {
        const updated = await TravelRecord.updateOne({ _id: id }, req.body);
        if (!updated) {
          return res.status(400).json({});
        }
        res.status(200).json(updated);
      } catch (error) {
        res.status(400).json({});
      }
      break;
    case 'DELETE':
      try {
        const deleted = await TravelRecord.deleteOne({ _id: id });
        if (!deleted) {
          return res.status(400).json({});
        }
        res.status(200).json(deleted);
      } catch (error) {
        res.status(400).json({});
      }
      break;
    default:
      res.status(400).json({});
      break;
  }
};

export default id;
