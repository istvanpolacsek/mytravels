import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assign, nth, round } from 'lodash';
import { CircularProgress, Container } from '@mui/material';

import { recordsApi } from 'redux/services/recordsService';
import { increaseLimit, selectQuerySettings } from 'redux/slices/records';
import {
  FetchWrapperBody,
  FetchWrapperContainer,
  FetchWrapperFooter,
  FetchWrapperHeader,
} from 'components/RecordsContainer/styled';

const { useRetrieveRecordsQuery } = recordsApi;

const pullDownThreshold = 35;
const pullDownMaximumValue = 55;
const resistance = 2;

function FetchWrapper({ children }) {
  const dispatch = useDispatch();
  const childrenRef = useRef(null);
  const fetchMoreRef = useRef(null);
  const querySettings = useSelector(selectQuerySettings);
  const { data, isLoading, isFetching, refetch } = useRetrieveRecordsQuery(querySettings);

  const settings = useMemo(() => nth(data, 0), [data]);
  const hasMore = useMemo(() => settings?.count > querySettings.limit, [settings, querySettings]);

  const draggingState = { startY: 0, isDragging: false, thresholdReached: false };
  const [height, setHeight] = useState(0);
  const [value, setValue] = useState(0);

  const onTouchStart = (e) => {
    try {
      if (childrenRef.current?.getBoundingClientRect().top < 0) {
        assign(draggingState, { startY: 0, isDragging: false });
      } else {
        assign(draggingState, { startY: e.touches[0].pageY, isDragging: true });
      }
    } catch (e) {
      assign(draggingState, { startY: 0, isDragging: false });
    }
  };

  const onTouchMove = (e) => {
    try {
      const { startY, isDragging } = draggingState;
      const draggingY = e.touches[0].pageY;

      if (isDragging && draggingY > startY) {
        if (e.cancelable) {
          e.preventDefault();
        }

        const distanceY = Math.min((draggingY - startY) / resistance, pullDownMaximumValue);

        setHeight(distanceY);
        setValue(round(distanceY / pullDownMaximumValue * 100, 0));

        if (distanceY >= pullDownThreshold) {
          assign(draggingState, { thresholdReached: true });
        }
      } else {
        assign(draggingState, { startY: 0, isDragging: false });
      }
    } catch (e) {
      assign(draggingState, { startY: 0, isDragging: false });
    }
  };

  const onTouchEnd = () => {
    const { thresholdReached } = draggingState;

    if (thresholdReached) {
      setHeight(pullDownThreshold);
      setValue(0);
      refetch();
    } else {
      setHeight(0);
    }
  };

  const onFetchMore = useCallback((element) => {
    if (fetchMoreRef.current) {
      fetchMoreRef.current.disconnect();
    }

    fetchMoreRef.current = new IntersectionObserver((entries) => {
      const { isIntersecting } = nth(entries, 0);

      if (isIntersecting && hasMore && !isFetching) {
        dispatch(increaseLimit());
      }
    }, { threshold: 0, rootMargin: '100px 0px 0px 0px' });

    if (element) {
      fetchMoreRef.current.observe(element);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    const childrenEl = childrenRef.current;
    childrenEl.addEventListener('touchstart', onTouchStart, { passive: true });
    childrenEl.addEventListener('touchmove', onTouchMove, { passive: false });
    childrenEl.addEventListener('touchend', onTouchEnd);

    return () => {
      childrenEl.removeEventListener('touchstart', onTouchStart);
      childrenEl.removeEventListener('touchmove', onTouchMove);
      childrenEl.removeEventListener('touchend', onTouchEnd);
    };
  }, [children]);

  useEffect(() => {
    if (!isFetching) {
      setHeight(0);
      setValue(0);
      assign(draggingState, { startY: 0, isDragging: false, thresholdReached: false });
    }
  }, [isFetching]);

  return (
    <FetchWrapperContainer>
      <Container disableGutters maxWidth="md">
        <FetchWrapperHeader height={height} maxHeight={pullDownThreshold}>
          <CircularProgress
            size={25}
            color="inherit"
            variant={value ? 'determinate' : 'indeterminate'}
            value={value}
          />
        </FetchWrapperHeader>
        <FetchWrapperBody ref={childrenRef}>
          {children}
        </FetchWrapperBody>
        <FetchWrapperFooter ref={onFetchMore}>
          {!isLoading && isFetching && <CircularProgress size={25} color="inherit" />}
        </FetchWrapperFooter>
      </Container>
    </FetchWrapperContainer>
  );
}

export default memo(FetchWrapper);
