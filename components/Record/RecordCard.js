import { memo } from 'react';
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
  SvgIcon,
  Typography,
} from '@mui/material';
import { RiDeleteBin7Line, RiEdit2Line } from 'react-icons/ri';
import { TRAVEL_TYPES } from 'lib/constants';

function RecordCard({
  _id: id,
  arrivalgeom: arrivalPoint,
  arrivalphoto: arrivalPhoto,
  arrivalvicinity: arrivalCity,
  departuregeom: departurePoint,
  departurevicinity: departureCity,
  traveldate: travelDate,
  traveltype: travelType = 'Plane',
  onDeleteRecord,
  onEditRecord,
  onGetDistance,

}) {
  const { passiveIcon: Icon } = find(TRAVEL_TYPES, { key: travelType });
  const src = arrivalPhoto
    ? `data:${arrivalPhoto.mime};base64,${Buffer.from(arrivalPhoto.data.data).toString('base64')}`
    : undefined;
  const distance = departurePoint && arrivalPoint
    ? onGetDistance(departurePoint.coordinates, arrivalPoint.coordinates)
    : undefined;

  const actions = [{ icon: RiEdit2Line, action: onEditRecord }, { icon: RiDeleteBin7Line, action: onDeleteRecord }];

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card variant="outlined">
        <CardHeader
          avatar={<SvgIcon color="primary"><Icon size={20} /></SvgIcon>}
          title={departureCity && arrivalCity ? `${departureCity} - ${arrivalCity}` : <Skeleton />}
          subheader={new Intl.DateTimeFormat('en-GB').format(new Date(travelDate))}
          action={map(actions, ({ icon: Icon, action }, i) =>
            (<IconButton key={i} size="large" onClick={() => action(id)}><Icon size={20} /></IconButton>))}
        />
        <CardMedia sx={{ position: 'relative', height: 150 }}>
          {src
            ? <Image layout="fill" objectFit="cover" alt={travelDate} src={src} />
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
}

export default memo(RecordCard);
