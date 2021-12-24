import { RiCarFill, RiCarLine, RiPlaneFill, RiPlaneLine, RiTrainFill, RiTrainLine } from 'react-icons/ri';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const TRAVEL_TYPES = [
  { key: 'Plane', passiveIcon: RiPlaneLine, activeIcon: RiPlaneFill },
  { key: 'Train', passiveIcon: RiTrainLine, activeIcon: RiTrainFill },
  { key: 'Car', passiveIcon: RiCarLine, activeIcon: RiCarFill },
];

export const HAVERSINE_OPTIONS = { unit: 'km', format: '[lat,lon]' };
