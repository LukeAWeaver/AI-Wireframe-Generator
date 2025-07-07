import { ReactNode, useState } from 'react';
import { Box } from '@components/Box'
import {  ContentCard, H4 } from '@ui/components'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useTutorialsContext } from '@contexts/TutorialsContext';
import { Stack } from '@ui/primitives';

interface IFlippableCard {
    frontContent: ReactNode
    backContent: ReactNode
    mustBeSelectedToFlip?: boolean
    showFlipTip?: boolean
}

export const FlippableCard = ({frontContent, backContent, showFlipTip=false, mustBeSelectedToFlip}: IFlippableCard) => {
  const [flipped, setFlipped] = useState(false)
  const { flipControlsAck, setFlipControlsAck } = useTutorialsContext();
  
  return (
    <>
      {/* Overlay for tutorial - covers entire page, pointerEvents: none */}
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
            pointerEvents: 'all',
          }}
          onClick={() => setFlipControlsAck(true)}
        >
          <Stack direction={"row"} gap={2} style={{ pointerEvents: 'auto' }}>
            <H4 color="white">
              Tap on a card to show more details
            </H4>
            <Box
              style={{
                width: "fit-content",
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
      <Box style={{ perspective: '1200px', minWidth: 400, width: '50%', cursor: "pointer", position: 'relative' }}>
          <Box
              onClick={() => {
                  if(mustBeSelectedToFlip || mustBeSelectedToFlip === undefined) {                
                      setFlipped(!flipped)
                  }
              }}
              style={{
              width: '100%',
              height: 500,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
          >
          {/* Flip tip - absolutely positioned inside the card */}
          { showFlipTip && !flipped && (
            <Box
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
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
          )}
          {/* Front Side */}
          <Box
          style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              top: 0,
              left: 0,
          }}
          >
          <ContentCard variant='elevation' style={{ width: '100%', height: '100%' }}>
              {frontContent}
          </ContentCard>
          </Box>
          {/* Back Side */}
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
          }}
          >
          <ContentCard
              variant='elevation'
              style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              }}
          >
              {backContent}
          </ContentCard>
          </Box>
      </Box>
      </Box>
    </>
  )
}

