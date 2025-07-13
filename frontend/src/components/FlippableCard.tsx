import { ReactNode, useState } from 'react';
import { Box } from '@components/Box';
import { ContentCard, H4 } from '@ui/components';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useTutorialsContext } from '@contexts/TutorialsContext';
import { Stack } from '@ui/primitives';
import { useThemeContext } from '@contexts/ThemeContext';

interface IFlippableCard {
  frontContent: ReactNode;
  backContent: ReactNode;
  mustBeSelectedToFlip?: boolean;
  showFlipTip?: boolean;
  header?: ReactNode;
  flexHeight?: boolean;
}

export const FlippableCard = ({
  frontContent,
  backContent,
  showFlipTip = false,
  mustBeSelectedToFlip,
  header,
  flexHeight,
}: IFlippableCard) => {
  const [flipped, setFlipped] = useState(false);
  const { flipControlsAck, setFlipControlsAck } = useTutorialsContext();
  const { isDarkMode } = useThemeContext();

  return (
    <>
      {showFlipTip && !flipControlsAck && (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setFlipControlsAck(true)}
        >
          <Stack gap={2} direction={"row"} style={{ pointerEvents: 'auto' }}>
            <H4 style={{ color: 'white' }}>
              Click on a Card to flip it and see more details
            </H4>
            <Box
              style={{
                width: 'fit-content',
                zIndex: 2010,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: 16,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={e => {
                e.stopPropagation();
                setFlipped(f => !f);
              }}
            >
              <FlipCameraAndroidIcon fontSize="small" style={{ marginRight: 4 }} />
              Flip
            </Box>
          </Stack>
        </Box>
      )}
      <Box
        style={{
          perspective: '1200px',
          minWidth: '20rem',
          maxWidth: flexHeight ? '36rem' : '100%',
          height: flexHeight ? '100vh' : 'auto',
          width: '100%',
          margin: '0 auto',
          cursor: 'pointer',
          position: 'relative',
          maxHeight: '100vh',
        }}
      >
        <Box
          onClick={() => {
            if (mustBeSelectedToFlip || mustBeSelectedToFlip === undefined) {
              setFlipped(!flipped);
            }
          }}
          style={{
            width: '100%',
            minHeight: '26rem',
            maxHeight: '80vh',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {showFlipTip && (
            <Box
              style={{
                position: 'absolute',
                top: '0.6rem',
                right: '0.6rem',
                zIndex: 2010,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: 16,
                padding: '0.1rem 0.4rem',
                fontSize: '0.7rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                userSelect: 'none',
                transform: flipped ? 'rotateY(180deg)' : undefined,
              }}
              onClick={e => {
                e.stopPropagation();
                setFlipped(f => !f);
              }}
            >
              <FlipCameraAndroidIcon fontSize="small" style={{ marginRight: 4 }} />
              Flip
            </Box>
          )}
          <Box
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              top: 0,
              left: 0,
              overflow: 'auto',
            }}
          >
            <ContentCard
              variant="elevation"
              style={{
                width: '100%',
                height: '100%',
                background: isDarkMode
                  ? 'linear-gradient(135deg,rgba(9, 9, 16, 0.1) 0%,rgba(22, 33, 62, 1) 50%)'
                  : 'linear-gradient(135deg,rgba(98, 101, 163, 0.1) 0%,rgba(255, 255, 255, 1) 50%)',
                overflow: 'auto',
              }}
            >
              {header && (
                <Box
                  style={{
                    width: '100%',
                    minHeight: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.1rem 0.4rem',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {header}
                </Box>
              )}
              {frontContent}
            </ContentCard>
          </Box>
          <Box
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'auto',
            }}
          >
            <ContentCard
              variant="elevation"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
              }}
            >
              {backContent}
            </ContentCard>
          </Box>
        </Box>
      </Box>
    </>
  );
}

