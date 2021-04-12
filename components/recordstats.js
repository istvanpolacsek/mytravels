import { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart';
import { CheckCircle } from '@material-ui/icons';
import haversine from 'haversine-distance';
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { useTheme } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useSession } from 'next-auth/client';
import { useQuery } from 'react-query';

const RecordStats = () => {
  const [session] = useSession();
  const { data } = useQuery(session.user.id);

  const titles = [
    'Kilometers traveled',
    'Cities visited',
    'Total travels',
    'Flights',
    'Train trips',
    'Road Trips'
  ];

  const [records, setRecords] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleDialogOpen = () => {
    setOpen(true);
  }

  const handleDialogClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const bars = new Array();
    const years = new Set();
    if (data) {
      data.data.map(record => years.add(new Date(record.traveldate).getFullYear()));
      [...years].map(year => {
        let cities = new Set();
        let distance = 0;
        let flights = 0;
        let trains = 0;
        let roads = 0;
        data.data
          .filter(e => new Date(e.traveldate).getFullYear() === year)
          .map(e => {
            cities.add(e.arrivalvicinity);
            distance += haversine(e.departuregeom.coordinates, e.arrivalgeom.coordinates);
            if (e.traveltype === 'Plane') flights++;
            if (e.traveltype === 'Train') trains++;
            if (e.traveltype === 'Car') roads++;
          })
        bars.push({
          year,
          stats: [
            (distance / 1000).toFixed(0),
            cities.size,
            flights + trains + roads,
            flights,
            trains,
            roads
          ]
        });
      });
    }
    setRecords(bars);
  }, [data])

  const handleClick = (data, index) => {
    setSelected(index);
  };

  const theme = useTheme();

  const { palette: { primary: { main: primary } } } = theme;
  const { palette: { secondary: { main: secondary } } } = theme;
  const barSize = 40;

  return (
    <Fragment>
      {records && records.length > 0 && (
        <Tooltip
          title={navigator.maxTouchPoints === 0 ? 'Travel Stats' : ''}
          placement="bottom"
        >
          <IconButton size="small" color="primary" onClick={handleDialogOpen} >
            <BarChartIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleDialogClose} >
        <DialogTitle>
          Travel Stats
        </DialogTitle>
        <DialogContent>
          {records && records.length > 0 && (
            <Grid container direction="row" justify="space-between" alignItems="center" >
              <Grid item xs={12} sm={4}>
                <BarChart
                  width={records.length * 1.5 * barSize}
                  height={150}
                  barSize={barSize}
                  data={records}
                >
                  <XAxis dataKey="year" />
                  <Bar dataKey="stats[0]" onClick={handleClick}>
                    {records.map((entry, index) => (
                      <Cell cursor="pointer" key={index} fill={index === selected ? secondary : primary} />
                    ))}
                  </Bar>
                </BarChart>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography color="secondary" >{records[selected].year} in numbers:</Typography>
                {records[selected].stats.map((stat, index) => (
                  <Grid container key={`${records[selected].year}-${index}`} justify="space-between" >
                    {stat > 0 && (
                      <Fragment>
                        <Typography>{titles[index]}</Typography>
                        <Typography><b>{stat}</b></Typography>
                      </Fragment>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              onClick={handleDialogClose}
            >
              ok
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default RecordStats;