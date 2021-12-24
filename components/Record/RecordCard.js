import { memo } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { find } from 'lodash';
import { RiDeleteBin7Line, RiEdit2Line } from 'react-icons/ri';

import { TRAVEL_TYPES } from 'lib/constants';

const RecordCard = ({
  arrivalgeom,
  arrivalphoto,
  arrivalvicinity,
  departuregeom,
  departurevicinity,
  getDistance,
  traveldate,
  traveltype = 'Plane',
}) => {
  const { passiveIcon: Icon } = find(TRAVEL_TYPES, { key: traveltype });
  const src = `data:${arrivalphoto.mime};base64,${Buffer.from(arrivalphoto.data.data).toString('base64')}`;
  const distance = getDistance(departuregeom.coordinates, arrivalgeom.coordinates);
  const { palette } = useTheme();

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card>
        <CardHeader
          avatar={<Icon size={20} color={palette.primary.main} />}
          title={`${departurevicinity} - ${arrivalvicinity}`}
          subheader={new Intl.DateTimeFormat('en-GB').format(new Date(traveldate))}
          action={<>
            <IconButton color="secondary" size="large"><RiEdit2Line size={20} /></IconButton>
            <IconButton color="secondary" size="large"><RiDeleteBin7Line size={20} /></IconButton>
          </>}
        />
        <CardMedia component="img" height={150} src={src} />
        <CardContent>
          <Grid container justifyContent="space-between">
            <Typography>Distance:</Typography>
            <Typography>{`${distance.toFixed(0)} km`}</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default memo(RecordCard);
