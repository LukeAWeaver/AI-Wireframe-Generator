import { Box } from '@mui/material';
import { CarouselArrow } from '@components/CarouselArrow';

interface PaginationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  prevBtnEnabled: boolean;
  nextBtnEnabled: boolean;
}

export const PaginationControls = ({ onPrev, onNext, prevBtnEnabled, nextBtnEnabled }: PaginationControlsProps) => (
  <Box display="flex" justifyContent="center" gap={2} sx={{ mt: { xs: 1, sm: 2 } }}>
    <CarouselArrow
      onClick={onPrev}
      disabled={!prevBtnEnabled}
      aria-label="Previous project"
      active={prevBtnEnabled}
      sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
    >
      &#8592;
    </CarouselArrow>
    <CarouselArrow
      onClick={onNext}
      disabled={!nextBtnEnabled}
      aria-label="Next project"
      active={nextBtnEnabled}
      sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
    >
      &#8594;
    </CarouselArrow>
  </Box>
); 