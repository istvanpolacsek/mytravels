import { useState } from 'react';
import { find } from 'lodash';
import haversine from 'haversine';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Close, MoreVert } from '@material-ui/icons';

import RecordDelete from './recorddelete';
import RecordEdit from './recordedit';
import { TravelTypes } from '../utils/traveltypes';
import { haversineOptions } from '../utils/constants';

const RecordCard = ({
  record,
  record: {
    arrivalphoto,
    traveldate,
    arrivalvicinity,
    departurevicinity,
    arrivalgeom,
    departuregeom,
  },
}) => {
  const [anchor, setAnchor] = useState(null);

  const handleMenuClose = () => {
    setAnchor(null);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box m={1}>
        <Card>
          <CardHeader
            avatar={find(TravelTypes, { value: record.traveltype }).label}
            title={`${departurevicinity} - ${arrivalvicinity}`}
            subheader={new Intl.DateTimeFormat('en-GB').format(
              new Date(traveldate)
            )}
            action={
              <IconButton
                color="secondary"
                onClick={({ currentTarget }) => setAnchor(currentTarget)}
              >
                <MoreVert />
              </IconButton>
            }
          />
          {typeof arrivalphoto === 'object' && (
            <CardMedia
              component="img"
              height="150"
              src={`data:${arrivalphoto.mime};base64,${Buffer.from(
                arrivalphoto.data.data
              ).toString('base64')}`}
            />
          )}
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="body2" component="p" color="primary">
                  Distance:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="p" color="primary">
                  {`${haversine(
                    departuregeom.coordinates,
                    arrivalgeom.coordinates,
                    haversineOptions
                  ).toFixed(0)} km`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Close fontSize="large" color="secondary" />
        </MenuItem>
        <RecordEdit record={record} handleMenuClose={handleMenuClose} />
        <RecordDelete record={record} handleMenuClose={handleMenuClose} />
      </Menu>
    </Grid>
  );
};

export default RecordCard;
