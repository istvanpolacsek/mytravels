import { Fragment, useEffect, useState } from 'react';
import { filter, isEmpty, map } from 'lodash';
import haversine from 'haversine';
import { BarChart, Bar, XAxis, Cell } from 'recharts';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/styles';

import IconButtonWrapper from 'components/IconButtonWrapper/IconButtonWrapper';
import useUserData from 'hooks/useUserData';
import useRoutes from 'hooks/useRoutes';
import { haversineOptions } from 'utils/constants';

const titles = [
  'Kilometers traveled',
  'Cities visited',
  'Total travels',
  'Flights',
  'Train trips',
  'Road Trips',
];

const RecordStats = () => {
  const { data } = useUserData();
  const { toHomePage } = useRoutes();

  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const bars = new Array();
    const years = new Set();

    if (!isEmpty(data)) {
      map(data, ({ traveldate }) => {
        years.add(new Date(traveldate).getFullYear());
      });

      map([...years], (year) => {
        let cities = new Set();
        let distance = 0;
        let flights = 0;
        let trains = 0;
        let roads = 0;

        const filtered = filter(data, ({ traveldate }) => {
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
      <DialogTitle>
        <Grid container alignItems="center" justify="space-between">
          Travel Stats
          <IconButtonWrapper title="close" onClick={toHomePage}>
            <Close />
          </IconButtonWrapper>
        </Grid>
      </DialogTitle>
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
        <DialogActions>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              onClick={toHomePage}
            >
              ok
            </Button>
          </ButtonGroup>
        </DialogActions>
      </DialogContent>
    </Fragment>
  );
};

export default RecordStats;
