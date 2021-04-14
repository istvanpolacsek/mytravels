import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { TravelTypes } from '../utils/traveltypes';
import haversine from 'haversine-distance';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Close, MoreVert } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import RecordDelete from './recorddelete';
import RecordEdit from './recordedit';
import { MenuItem } from '@material-ui/core';

const RecordCard = ({ record }) => {
  const [anchor, setAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    setAnchor(null);
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Box m={1}>
        <Card >
          <CardHeader
            avatar={TravelTypes[TravelTypes.findIndex(e => e.displayName === record.traveltype)].icon}
            title={`${record.departurevicinity} - ${record.arrivalvicinity}`}
            subheader={new Intl.DateTimeFormat('en-GB').format(new Date(record.traveldate))}
            action={
              <IconButton color="secondary" onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            }
          />
          {typeof record.arrivalphoto === 'object' && (
            <CardMedia
              component="img"
              height="150"
              src={`data:${record.arrivalphoto.mime};base64,${Buffer.from(record.arrivalphoto.data.data).toString('base64')}`}
            />
          )}
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Typography variant="body2" component="p" color="primary" >
                  Distance:
              </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="p" color="primary" >
                  {(haversine(record.departuregeom.coordinates, record.arrivalgeom.coordinates) / 1000).toFixed(0)} km
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
}

export default RecordCard;