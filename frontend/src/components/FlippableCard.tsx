import { ReactNode, useState, type FC } from 'react'
import { Box } from '@components/Box'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import { useTutorialsContext } from '@contexts/TutorialsContext'
import { useThemeContext } from '@contexts/ThemeContext'
import { ContentCard } from './ContentCard'
import { Stack } from '@primitives/Stack'
import { Text } from '@primitives/Text'
import { Button } from './Button'
import { motion, type Variants, type Transition } from 'framer-motion'

interface IFlippableCard {
  frontContent: ReactNode
  backContent: ReactNode
  mustBeSelectedToFlip?: boolean
  showFlipTip?: boolean
  header?: ReactNode
  flexHeight?: boolean
  isTransparent?: boolean
}

export const FlippableCard: FC<IFlippableCard> = ({
  frontContent,
  backContent,
  showFlipTip = false,
  mustBeSelectedToFlip,
  header,
  flexHeight,
  isTransparent = true
}: IFlippableCard) => {
  const [flipped, setFlipped] = useState<boolean>(false)
  const { flipControlsAck, setFlipControlsAck } = useTutorialsContext()
  const { isDarkMode } = useThemeContext()

  const solidCardStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: isDarkMode
      ? 'linear-gradient(135deg,rgba(9, 9, 16, 0.1) 0%,rgba(22, 33, 62, 1) 50%)'
      : 'linear-gradient(135deg,rgba(98, 101, 163, 0.1) 0%,rgba(255, 255, 255, 1) 50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const faceBaseStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'transform, opacity',
    transformOrigin: '50% 50%'
  }

  const contentCardBaseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    border: '2px solid rgba(255,255,255,0.25)',
    boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
    background: isDarkMode
      ? 'linear-gradient(135deg,rgba(22,33,62,0.25) 0%,rgba(9,9,16,0.15) 100%)'
      : 'linear-gradient(135deg,rgba(255,255,255,0.25) 0%,rgba(98,101,163,0.10) 100%)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const flipperVariants: Variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  }

  const flipperTransition: Transition = { duration: 0.6, ease: [0.2, 0, 0, 1] }

  const isFrontActive: boolean = !flipped
  const isBackActive: boolean = flipped

  const canFlip: boolean = mustBeSelectedToFlip === undefined || mustBeSelectedToFlip === true

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
            justifyContent: 'center'
          }}
          onClick={() => setFlipControlsAck(true)}
        >
          <Stack gap={2} direction={'row'} style={{ pointerEvents: 'auto' }}>
            <Text variant='h4' style={{ color: 'white' }}>
              Click on a Card to flip it and see more details
            </Text>
            <Button
              variant='contained'
              style={{
                width: 'fit-content',
                zIndex: 2010,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 16,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation()
                if (canFlip) {
                  setFlipped((f: boolean) => {
                    if (f) {
                      return false
                    } else {
                      return true
                    }
                  })
                }
              }}
            >
              <FlipCameraAndroidIcon fontSize='small' style={{ marginRight: 4 }} />
              Flip to read more
            </Button>
          </Stack>
        </Box>
      )}

      <Box
        style={{
          position: 'relative',
          perspective: '1200px',
          minWidth: flexHeight ? 430 : 500,
          width: '100%'
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 30,
            display: showFlipTip ? 'flex' : 'none',
            alignItems: 'center',
            background: isDarkMode ? 'rgba(22,33,62,0.85)' : 'rgba(255,255,255,0.85)',
            borderRadius: 16,
            padding: '2px 8px',
            fontSize: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            cursor: canFlip ? 'pointer' : 'default',
            userSelect: 'none'
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            if (canFlip) {
              setFlipped((f: boolean) => {
                if (f) {
                  return false
                } else {
                  return true
                }
              })
            }
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            const icon: Element | null = e.currentTarget.querySelector('.flip-icon')
            if (icon) {
              ;(icon as HTMLElement).style.transform = 'rotate(180deg)'
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            const icon: Element | null = e.currentTarget.querySelector('.flip-icon')
            if (icon) {
              ;(icon as HTMLElement).style.transform = 'rotate(0deg)'
            }
          }}
        >
          <FlipCameraAndroidIcon className='flip-icon' fontSize='small' style={{ marginRight: 4, transition: 'transform 0.3s' }} />
          Flip
        </Box>

        <motion.div
          variants={flipperVariants}
          animate={flipped ? 'back' : 'front'}
          transition={flipperTransition}
          onClick={() => {
            if (canFlip) {
              setFlipped((f: boolean) => {
                if (f) {
                  return false
                } else {
                  return true
                }
              })
            }
          }}
          style={{
            width: '100%',
            height: flexHeight ? 450 : 650,
            maxHeight: '70vh',
            position: 'relative',
            transformStyle: 'preserve-3d',
            cursor: canFlip ? 'pointer' : 'default'
          }}
        >
          <motion.div
            aria-hidden={!isFrontActive}
            initial={false}
            animate={{ opacity: isFrontActive ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{
              ...faceBaseStyle,
              transform: 'rotateY(0deg) translateZ(1px)',
              zIndex: isFrontActive ? 2 : 1,
              pointerEvents: isFrontActive ? 'auto' : 'none'
            }}
          >
            <ContentCard
              variant='elevation'
              style={
                !isTransparent
                  ? solidCardStyle
                  : {
                      ...contentCardBaseStyle
                    }
              }
            >
              {header && (
                <Box
                  style={{
                    width: '100%',
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    fontSize: 14,
                    userSelect: 'none'
                  }}
                >
                  {header}
                </Box>
              )}
              {frontContent}
            </ContentCard>
          </motion.div>

          <motion.div
            aria-hidden={!isBackActive}
            initial={false}
            animate={{ opacity: isBackActive ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            style={{
              ...faceBaseStyle,
              transform: 'rotateY(180deg) translateZ(1px)',
              zIndex: isBackActive ? 2 : 1,
              pointerEvents: isBackActive ? 'auto' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ContentCard
              variant='elevation'
              style={
                !isTransparent
                  ? solidCardStyle
                  : {
                      ...contentCardBaseStyle
                    }
              }
            >
              {backContent}
            </ContentCard>
          </motion.div>
        </motion.div>
      </Box>
    </>
  )
}
