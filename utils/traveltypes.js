import { Flight, Train, DirectionsCar } from '@material-ui/icons';

export const TravelTypes = [
  { type: 'plane', displayName: 'Plane', icon: <Flight color="secondary" /> },
  { type: 'train', displayName: 'Train', icon: <Train color="secondary" /> },
  { type: 'car', displayName: 'Car', icon: <DirectionsCar color="secondary" /> },
];