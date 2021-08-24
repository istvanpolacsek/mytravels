import { Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';
import { filter, isEmpty, map } from 'lodash';
import haversine from 'haversine';
import { BarChart, Bar, XAxis, Cell } from 'recharts';
import BarChartIcon from '@material-ui/icons/BarChart';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { CheckCircle } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';

import { haversineOptions } from '../utils/constants';

const RecordStats = () => {
  const [session] = useSession();
  const { data } = useQuery(session.user.id);

  const titles = [
    'Kilometers traveled',
    'Cities visited',
    'Total travels',
    'Flights',
    'Train trips',
    'Road Trips',
  ];

  const [records, setRecords] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const bars = new Array();
    const years = new Set();

    if (!isEmpty(data)) {
      const { data: entries } = data;

      map(entries, ({ traveldate }) => {
        years.add(new Date(traveldate).getFullYear());
      });

      map([...years], (year) => {
        let cities = new Set();
        let distance = 0;
        let flights = 0;
        let trains = 0;
        let roads = 0;

        const filtered = filter(entries, ({ traveldate }) => {
          return new Date(traveldate).getFullYear() === year;
        });

        map(
          filtered,
          ({ arrivalvicinity, traveltype, arrivalgeom, departuregeom }) => {
            cities.add(arrivalvicinity);
            if (traveltype === 'Plane') flights++;
            if (traveltype === 'Train') trains++;
            if (traveltype === 'Car') roads++;
            distance += haversine(
              departuregeom.coordinates,
              arrivalgeom.coordinates,
              haversineOptions
            );
          }
        );

        bars.push({
          year,
          stats: [
            distance.toFixed(0),
            cities.size,
            flights + trains + roads,
            flights,
            trains,
            roads,
          ],
        });
      });
    }
    setRecords(bars);
  }, [data]);

  const handleClick = (data, index) => {
    setSelected(index);
  };

  const theme = useTheme();

  const {
    palette: {
      primary: { main: primary },
    },
  } = theme;
  const {
    palette: {
      secondary: { main: secondary },
    },
  } = theme;
  const barSize = 40;

  return (
    <Fragment>
      {!isEmpty(records) && (
        <Tooltip
          title={navigator.maxTouchPoints === 0 ? 'Travel Stats' : ''}
          placement="bottom"
        >
          <IconButton size="small" color="primary" onClick={handleDialogOpen}>
            <BarChartIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleDialogClose}>
        <DialogTitle>Travel Stats</DialogTitle>
        <DialogContent>
          {!isEmpty(records) && (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
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
                      <Cell
                        cursor="pointer"
                        key={index}
                        fill={index === selected ? secondary : primary}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography color="secondary">
                  {records[selected].year} in numbers:
                </Typography>
                {map(records[selected].stats, (stat, index) => (
                  <Grid
                    container
                    key={`${records[selected].year}-${index}`}
                    justify="space-between"
                  >
                    {stat > 0 && (
                      <Fragment>
                        <Typography>{titles[index]}</Typography>
                        <Typography>
                          <b>{stat}</b>
                        </Typography>
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
};

export default RecordStats;
