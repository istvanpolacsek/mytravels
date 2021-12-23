import { RiCarFill, RiCarLine, RiPlaneFill, RiPlaneLine, RiTrainFill, RiTrainLine } from 'react-icons/ri';

export const TRAVEL_TYPES = [
  { key: 'plane', passiveIcon: RiPlaneLine, activeIcon: RiPlaneFill },
  { key: 'train', passiveIcon: RiTrainLine, activeIcon: RiTrainFill },
  { key: 'car', passiveIcon: RiCarLine, activeIcon: RiCarFill },
];
