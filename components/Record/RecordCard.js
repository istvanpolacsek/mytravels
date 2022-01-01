import { forwardRef } from 'react';
import Image from 'next/image';
import { find, map } from 'lodash';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { RiDeleteBin7Line, RiEdit2Line } from 'react-icons/ri';

import useRoutes from 'hooks/useRoutes';
import { TRAVEL_TYPES } from 'lib/constants';

const RecordCard = forwardRef(({
  _id: id,
  arrivalgeom,
  arrivalphoto,
  arrivalvicinity,
  departuregeom,
  departurevicinity,
  getDistance,
  traveldate,
  traveltype = 'Plane',
}, ref) => {
  const { passiveIcon: Icon } = find(TRAVEL_TYPES, { key: traveltype });
  const src = arrivalphoto
    ? `data:${arrivalphoto.mime};base64,${Buffer.from(arrivalphoto.data.data).toString('base64')}`
    : undefined;
  const distance = departuregeom && arrivalgeom
    ? getDistance(departuregeom.coordinates, arrivalgeom.coordinates)
    : undefined;
  const { palette } = useTheme();
  const { toEditRecord, toDeleteRecord } = useRoutes();

  const actions = [{ icon: RiEdit2Line, action: toEditRecord }, { icon: RiDeleteBin7Line, action: toDeleteRecord }];

  return (
    <Grid item xs={12} sm={6} md={6} ref={ref}>
      <Card variant="outlined">
        <CardHeader
          avatar={<Icon size={20} color={palette.primary.main} />}
          title={departurevicinity && arrivalvicinity ? `${departurevicinity} - ${arrivalvicinity}` : <Skeleton />}
          subheader={new Intl.DateTimeFormat('en-GB').format(new Date(traveldate))}
          action={map(actions, ({ icon: Icon, action }, i) =>
            (<IconButton key={i} size="large" onClick={() => action({ id })}><Icon size={20} /></IconButton>))}
        />
        <CardMedia sx={{ position: 'relative', height: 150 }}>
          {src
            ? <Image layout="fill" objectFit="cover" alt={traveldate} src={src} />
            : <Skeleton variant="rectangular" height={150} />}
        </CardMedia>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Typography>Distance:</Typography>
            <Typography>{distance ? `${distance.toFixed(0)} km` : <Skeleton />}</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default RecordCard;
