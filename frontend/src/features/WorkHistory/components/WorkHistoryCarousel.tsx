import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Stack, Slider, useMediaQuery } from '@mui/material';
import { WorkHistoryCard } from './WorkHistoryCard';
import { IWorkCard } from '../data/workHistory';
import { CarouselShell } from '@components/CarouselShell';

export interface WorkHistoryCarouselProps {
  workHistory: IWorkCard[];
}

export const WorkHistoryCarousel: React.FC<WorkHistoryCarouselProps> = ({ workHistory }) => {
  const isMobile = useMediaQuery('(max-width:740px)');
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
        >
     <CarouselShell emblaRef={emblaRef}>
          {workHistory.map((item, idx) => (
            <Box
              key={item.company + item.duration}
              sx={{
                minWidth: { xs: '100vw', sm: 'auto' },
                maxWidth: { xs: '100vw', sm: 'auto' },
                width: { xs: '100vw', sm: 'auto' },
                minHeight: '100%',
                boxSizing: 'border-box',
                transition: 'opacity 0.2s, transform 0.3s',
                transform: idx === selectedIndex ? 'scale(1)' : 'scale(0.8)',
                opacity: idx === selectedIndex ? 1 : 0.7,
              }}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            >
              <WorkHistoryCard item={item} mustBeSelectedToFlip={idx === selectedIndex} />
            </Box>
          ))}
        </CarouselShell>
      <Box
  sx={{
    width: '80%',
    mt: '2.5rem',
    px: isMobile ? '1.25rem' : '2rem',
    overflow: 'visible',
  }}
>
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
    sx={{
      '.MuiSlider-markLabel': {
        fontSize: isMobile ? '0.5rem' : '0.875rem',
        whiteSpace: 'nowrap',
      },
    }}
  />
</Box>
    </Stack>
  );
};