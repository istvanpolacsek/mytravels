import { RiCarFill, RiCarLine, RiPlaneFill, RiPlaneLine, RiTrainFill, RiTrainLine } from 'react-icons/ri';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const TRAVEL_TYPE = 'traveltype';
export const TRAVEL_DATE = 'traveldate';
export const DEPARTURE_ID = 'departureid';
export const ARRIVAL_ID = 'arrivalid';

export const DEPARTURE_VICINITY = 'departurevicinity';
export const DEPARTURE_GEOMETRY = 'departuregeom';
export const ARRIVAL_VICINITY = 'arrivalvicinity';
export const ARRIVAL_GEOMETRY = 'arrivalgeom';
export const ARRIVAL_PHOTO = 'arrivalphoto';

export const TRAVEL_TYPES = [
  { key: 'Plane', passiveIcon: RiPlaneLine, activeIcon: RiPlaneFill, label: 'Flights' },
  { key: 'Train', passiveIcon: RiTrainLine, activeIcon: RiTrainFill, label: 'Train Trips' },
  { key: 'Car', passiveIcon: RiCarLine, activeIcon: RiCarFill, label: 'Road Trips' },
];

export const HAVERSINE_OPTIONS = { unit: 'km', format: '[lat,lon]' };

export const MONGOOSE_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

export const CREATE_DEFAULTS = {
  [TRAVEL_TYPE]: TRAVEL_TYPES[0].key,
  [TRAVEL_DATE]: new Date(),
};
