import { Box, Stack } from '@mui/material';
import { CarouselArrow } from '@components/CarouselArrow';

interface PaginationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (idx: number) => void;
  prevBtnEnabled: boolean;
  nextBtnEnabled: boolean;
  slidesCount: number;
  selectedIndex: number;
}

export const PaginationControls = ({
  onPrev,
  onNext,
  onDotClick,
  prevBtnEnabled,
  nextBtnEnabled,
  slidesCount,
  selectedIndex,
}: PaginationControlsProps) => (
  <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: { xs: 1, sm: 2 } }}>
    <CarouselArrow
      onClick={onPrev}
      disabled={!prevBtnEnabled}
      aria-label="Previous project"
      active={prevBtnEnabled}
      sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
    >
      &#8592;
    </CarouselArrow>
    <Stack direction="row" spacing={1} alignItems="center">
      {Array.from({ length: slidesCount }).map((_, idx) => (
        <Box
          key={idx}
          onClick={() => onDotClick(idx)}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: idx === selectedIndex ? 'primary.main' : 'grey.400',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            border: idx === selectedIndex ? '2px solid' : 'none',
            borderColor: idx === selectedIndex ? 'primary.main' : 'transparent',
          }}
          aria-label={`Go to slide ${idx + 1}`}
          role="button"
          tabIndex={0}
        />
      ))}
    </Stack>
    <CarouselArrow
      onClick={onNext}
      disabled={!nextBtnEnabled}
      aria-label="Next project"
      active={nextBtnEnabled}
      sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
    >
      &#8594;
    </CarouselArrow>
  </Stack>
); 