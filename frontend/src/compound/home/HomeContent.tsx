import { useState } from 'react';
import { Box } from '@components/Box'
import { CardContent, Stack } from '@mui/material'
import { Badge, Body2Description, ContentCard, H4 } from '@ui/components'
import { projects } from '../../app/projects'
import { TechnologyBadge } from '@compound/projects/TechnologyBadge'
import { usePortfolioTechnologies } from '@contexts'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const HomeContent = () => {
  const { technologiesByName } = usePortfolioTechnologies();
  const [flipped, setFlipped] = useState(false)

  const allTechNames: string[] = Array.from(
    new Set(projects.flatMap((p) => p.technologiesUsed))
  );
  
  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      marginTop: 40,
    }}>
      <Box style={{ perspective: '1200px', width: '50%' }}>
        <Box
          onClick={() => setFlipped(f => !f)}
          style={{
            width: '100%',
            height: 450,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
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
              <CardContent>
                <H4>Luke Weaver</H4>
              </CardContent>
              <CardContent>
                <Stack gap={2}>
                  <Body2Description>
                    I'm a software engineer who loves crafting polished, accessible user interfaces with clean architecture under the hood. My focus is on frontend development where design and engineering meet — translating complex requirements into smooth, maintainable user experiences.
                  </Body2Description>
                  <Body2Description>
                    Most recently, I worked as a Full Stack Software Engineer at Multi Media, where I helped launch the initial web platform and led frontend development on a new mobile app. I built features for profile, discovery, events, and socials — all while refining a layered UI system and closing gaps in the design system to prepare for production.
                  </Body2Description>
                  <Body2Description>
                    When I'm not building software, I'm probably playing video games with friends, spending time with my wife and dogs, or doing a home project.
                  </Body2Description>
                </Stack>
              </CardContent>
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
              <Box style={{ display: 'flex', gap: 24, margin: '16px 0' }}>
                <a
                  href="https://github.com/LukeAWeaver"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  style={{ color: 'inherit' }}
                >
                  <GitHubIcon fontSize="large" />
                </a>
                <a
                  href="https://www.linkedin.com/in/fullstackengineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: 'inherit' }}
                >
                  <LinkedInIcon fontSize="large" />
                </a>
              </Box>
              <H4>Technologies Used</H4>
              <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 16 }}>
                {allTechNames.map(techKey => {
                  const technology = technologiesByName[techKey]
                  return technology ? (
                    <TechnologyBadge key={techKey} technology={technology} />
                  ) : (
                    <Badge key={techKey}>{techKey}</Badge>
                  )
                })}
              </Box>
            </ContentCard>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
