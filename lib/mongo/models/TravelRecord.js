import mongoose from 'mongoose';

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const PhotoSchema = new mongoose.Schema({
  mime: { type: String },
  data: { type: Buffer },
});

const TravelRecordSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  traveldate: { type: Date, required: true },
  traveltype: { type: String, required: true },
  departureid: { type: String, requred: true },
  departurevicinity: { type: String, required: true },
  departuregeom: PointSchema,
  arrivalid: { type: String, required: true },
  arrivalvicinity: { type: String, required: true },
  arrivalgeom: PointSchema,
  arrivalphoto: PhotoSchema,
});

const TravelRecord = mongoose.models.TravelRecord || mongoose.model('TravelRecord', TravelRecordSchema);

export default TravelRecord;
