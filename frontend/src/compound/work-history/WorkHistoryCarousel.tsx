import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Stack, Slider } from '@mui/material';
import { WorkHistoryCard } from './WorkHistoryCard';
import { IWorkCard } from '../../app/workHistoryData';

export interface WorkHistoryCarouselProps {
  workHistory: IWorkCard[];
}

export const WorkHistoryCarousel: React.FC<WorkHistoryCarouselProps> = ({ workHistory }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);


  const scrollTo = useCallback((idx: number) => {
    if (emblaApi) emblaApi.scrollTo(idx);
  }, [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());

  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Slider marks for durations
  const marks = workHistory.map((item, idx) => ({
    value: idx,
    label: item.duration,
  }));

  return (
    <Stack
      minHeight={0}
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        userSelect: 'none',
        px: { xs: 0, sm: 0 },
        '& .embla__container': {
          flexDirection: 'row',
        },
        '& .embla__slide, & .embla__container > *': {
          minWidth: { xs: '100vw', sm: 'auto' },
          maxWidth: { xs: '100vw', sm: 'auto' },
          width: { xs: '100vw', sm: 'auto' },
        },
      }}
    >
      <Box
        className="embla"
        width="100%"
        flexGrow={1}
        ref={emblaRef}
        sx={{
          overflow: 'hidden',
          borderRadius: 0,
          touchAction: 'pan-y',
          WebkitOverflowScrolling: 'touch',
          overflowX: 'hidden',
        }}
      >
        <Box
          className="embla__container"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: 0,
          }}
        >
          {workHistory.map((item, idx) => (
            <Box
              key={item.company + item.duration}
              sx={{
                marginLeft: idx === 0 ? 8 : 0,
                marginRight: idx === workHistory.length - 1 ? 8 : 0,
                minWidth: '100%',
                minHeight: '100%',
                boxSizing: 'border-box',
                transition: 'opacity 0.2s, transform 0.3s',
                transform: idx === selectedIndex ? 'scale(1)' : 'scale(0.8)',
                opacity: idx === selectedIndex ? 1 : 0.7,
              }}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            >
              <WorkHistoryCard item={item} />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ width: { xs: '90%', sm: 500 }, mt: 3 }}>
        <Slider
          value={selectedIndex}
          min={0}
          max={workHistory.length - 1}
          step={1}
          marks={marks}
          onChange={(_, value) => {
            if (typeof value === 'number') scrollTo(value);
          }}
          valueLabelDisplay="off"
        />
      </Box>
    </Stack>
  );
}; 