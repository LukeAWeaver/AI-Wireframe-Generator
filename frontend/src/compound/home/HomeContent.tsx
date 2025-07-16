import { Box } from '@components/Box'
import { CardContent, Stack } from '@mui/material'
import { Body2Description, H1, H5 } from '@ui/components'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { FlippableCard } from '@components/FlippableCard'
import { usePortfolioTechnologies } from '@contexts/PortfolioTechnologiesContext'
import { useRef, useLayoutEffect } from 'react'

export const HomeContent = () => {
  const { technologies } = usePortfolioTechnologies()
  // const displayedTechnologyNames = [
  //   "React", "React Native", "GraphQL", "Django", "Github Actions",
  //   "AWS S3", "AWS Lambda", "PostgreSQL", "SASS", "MUI", "Tamagui", "TypesScript"
  // ]

  const backRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (backRef.current !== null) {
    }
  }, [technologies])

  const header = <H1>Luke Weaver</H1>

  const cardBack = (
    <Stack ref={backRef}>
      <CardContent>
        <Stack gap={2}>
          <Body2Description>
           Most recently, I worked as a Full Stack Software Engineer at Multi Media, where I made impactful contributions to launching the web platform and led feature development for a new mobile app. I built core experiences across profile, discovery, events, and social features — while also refining a layered UI system and closing gaps in the design system to prepare for production.
          </Body2Description>
          <Body2Description>
            When not building software, I am probably playing video games with friends, spending time with my wife and dogs, or doing a home project.
          </Body2Description>
          <Body2Description>
            For now, I'm keeping up my skills by building this portfolio site and exploring new technologies. I'm open to new opportunities, so please feel free to reach out!
          </Body2Description>
        </Stack>
      </CardContent>
    </Stack>
  )

  const cardFront = (
    <Stack
              style={{
                height: '100%',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                padding: 32,
                paddingBottom: 0,
              }}
            >
              {header}
              <Box style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                {/* {technologies && technologies.length > 0 ? (
                  technologies
                    .filter(tech => displayedTechnologyNames.includes(tech.name))
                    .map(tech => (
                      <TechnologyBadge key={tech.id} techName={tech.name} />
                    ))
                ) : (
                  <Stack gap={1}>
                    <Stack direction={"row"} gap={1}>
                      <CircularProgress />
                      <Body2Description>Loading technologies...</Body2Description>
                    </Stack>
                    <Body2Description>...waking django backend</Body2Description>
                  </Stack>
                )} */}
                 <CardContent>
                <Body2Description>
                  A full-stack software engineer who loves crafting untuitive, pixel-perfect user interfaces with clean architecture under the hood. My focus is on frontend development where design and engineering meet — translating complex requirements into smooth, maintainable user experiences. 5 years experience in a React + Django environment, 2 years in a Vanilla JS + C environment, and 6 months in React Native.
                </Body2Description>
              </CardContent>
              </Box>
              <Stack direction={"row"} style={{ display: 'flex', gap: 24, alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 16 }}>
  <a  
    href="https://github.com/LukeAWeaver"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    style={{ color: 'inherit', transition: 'transform 0.2s, color 0.2s', cursor: 'pointer' }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.color = '#333' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = 'inherit' }}
  >
    <GitHubIcon fontSize="large" />
  </a>
  <a
    href="https://www.linkedin.com/in/fullstackengineer/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    style={{ color: 'inherit', transition: 'transform 0.2s, color 0.2s', cursor: 'pointer' }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.color = '#0A66C2' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = 'inherit' }}
  >
    <LinkedInIcon fontSize="large" />
  </a>
  <H5 >Full Stack Software Engineer</H5>
</Stack>
            </Stack>
  )

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
      }}
    >
      <Box
        style={{
          width: '50%',
          maxWidth: '50%',
          maxHeight: '80vh',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlippableCard
          showFlipTip={true}
          flexHeight={true}
          frontContent={
            cardFront
          }
          backContent={cardBack}
        />
      </Box>
    </Box>
  )
}
