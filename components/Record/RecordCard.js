import { useMemo, useState } from 'react';
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
import { Close, Delete, Edit, MoreVert } from '@material-ui/icons';

import RecordDelete from './RecordDelete';
import { TravelTypes } from '../../utils/TravelTypes';
import { haversineOptions } from '../../utils/constants';
import { Skeleton } from '@material-ui/lab';
import useRoutes from 'hooks/useRoutes';

const RecordCard = ({ record }) => {
  const { toRecordForm, toRecordDelete } = useRoutes();
  const {
    _id,
    arrivalphoto,
    traveltype,
    traveldate,
    arrivalvicinity,
    departurevicinity,
    arrivalgeom,
    departuregeom,
  } = record;

  const [anchor, setAnchor] = useState(null);

  const distance = useMemo(() => {
    return departuregeom
      ? haversine(
          departuregeom.coordinates,
          arrivalgeom.coordinates,
          haversineOptions
        ).toFixed(0)
      : undefined;
  }, [departuregeom, arrivalgeom]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box m={1}>
        <Card>
          <CardHeader
            avatar={find(TravelTypes, { value: traveltype }).label}
            title={
              departurevicinity ? (
                `${departurevicinity} - ${arrivalvicinity}`
              ) : (
                <Skeleton variant="text" width={180} />
              )
            }
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
          {arrivalphoto ? (
            <CardMedia
              component="img"
              height="150"
              src={`data:${arrivalphoto.mime};base64,${Buffer.from(
                arrivalphoto.data.data
              ).toString('base64')}`}
            />
          ) : (
            <Skeleton variant="rect" height={150} />
          )}
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="body2" component="p" color="primary">
                  Distance:
                </Typography>
              </Grid>
              <Grid item>
                {distance ? (
                  <Typography variant="body2" component="p" color="primary">
                    {`${distance} km`}
                  </Typography>
                ) : (
                  <Skeleton variant="text" width={50} />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <MenuItem onClick={() => setAnchor(null)}>
          <Close fontSize="large" color="secondary" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            toRecordForm(_id);
            setAnchor(null);
          }}
        >
          <Edit fontSize="large" color="secondary" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            toRecordDelete(_id);
            setAnchor(null);
          }}
        >
          <Delete fontSize="large" color="secondary" />
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default RecordCard;
