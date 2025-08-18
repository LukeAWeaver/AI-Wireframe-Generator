import { Children, Fragment, ReactNode } from 'react'
import Box from '@mui/material/Box'
import { EmblaViewportRefType } from 'embla-carousel-react'
import { Stack } from '@primitives/Stack'

interface CarouselShellProps {
  children: ReactNode
  emblaRef: EmblaViewportRefType
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export const CarouselShell = ({
  children,
  onKeyDown,
  emblaRef,
}: CarouselShellProps) => {
  const slides = Children.toArray(children)

  return (
    <Stack
      minHeight={0}
      width="100%"
      height="100vh"
      justifyContent="space-between"
      alignItems="center"
      onKeyDown={onKeyDown}
      sx={{
        userSelect: 'none',
        px: { xs: 0, sm: 0 },
        '& .embla__container': {
            gap: "10%",
          flexDirection: 'row',
        },
        '& .embla__container > *': {
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
          paddingLeft: { xs: 10},
          paddingRight: { xs: 10},
          '@media (min-width: 2400px)': {
            paddingLeft: "40%",
            paddingRight: "40%",
          },
        }}
      >
        <Box
          className="embla__container"
          sx={{
            marginTop: 5,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: 0,
          }}
        >
          {slides.map((child, idx) => (
            <Fragment key={idx}>{child}</Fragment>
          ))}
        </Box>
      </Box>
    </Stack>
  )
}
