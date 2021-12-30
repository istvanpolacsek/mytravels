import mongoose from 'mongoose';

import {
  ARRIVAL_GEOMETRY,
  ARRIVAL_ID,
  ARRIVAL_PHOTO,
  ARRIVAL_VICINITY,
  DEPARTURE_GEOMETRY,
  DEPARTURE_ID,
  DEPARTURE_VICINITY,
  TRAVEL_DATE,
  TRAVEL_TYPE,
} from 'lib/constants';

const PointSchema = new mongoose.Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true },
});

const PhotoSchema = new mongoose.Schema({
  mime: { type: String },
  data: { type: Buffer },
});

const TravelRecordSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  [TRAVEL_DATE]: { type: Date, required: true },
  [TRAVEL_TYPE]: { type: String, required: true },
  [DEPARTURE_ID]: { type: String, requred: true },
  [DEPARTURE_VICINITY]: { type: String, required: true },
  [DEPARTURE_GEOMETRY]: PointSchema,
  [ARRIVAL_ID]: { type: String, required: true },
  [ARRIVAL_VICINITY]: { type: String, required: true },
  [ARRIVAL_GEOMETRY]: PointSchema,
  [ARRIVAL_PHOTO]: PhotoSchema,
});

const TravelRecord = mongoose.models.TravelRecord || mongoose.model('TravelRecord', TravelRecordSchema);

export default TravelRecord;
