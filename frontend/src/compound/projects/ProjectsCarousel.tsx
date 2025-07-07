import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useRightSidebar, usePortfolioTechnologies } from '@contexts'
import { TechnologyBadge } from '@compound'
import { CarouselArrow } from '@components'
import { Badge } from '@components'
import { ProjectCard } from '@compound'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { ProjectPurpose, ProjectDescription } from '@ui/components'

interface IProject {
  id: string
  title: string
  url: string
  purpose: string
  svgDiagram: string
  technologiesUsed: string[]
  description: string
}

interface ProjectsCarouselProps {
  projects: IProject[]
}

export const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { setSidebarContent } = useRightSidebar()
  const { technologiesByName } = usePortfolioTechnologies()
  const theme = useTheme()

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return
    }
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) {
      return
    }
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])


  useEffect(() => {
    return () => setSidebarContent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const project = projects[selectedIndex]
    setSidebarContent(
      <Box
        sx={{
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ProjectPurpose>
          {project.purpose}
        </ProjectPurpose>
        <ProjectDescription>
          {project.description}
        </ProjectDescription>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {project.technologiesUsed.map(techKey => {
            const technology = technologiesByName[techKey]
            return technology ? (
              <TechnologyBadge key={techKey} technology={technology} />
            ) : (
              <Badge key={techKey}>{techKey}</Badge>
            )
          })}
        </Box>
      </Box>
    )
  }, [selectedIndex, setSidebarContent, projects, technologiesByName, theme.palette.text.secondary])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollNext()
    }
  }

  return (
    <Stack
      minHeight={0}
      width="100%"
      height="100%"
      justifyContent="space-between"
      alignItems="center"
      onKeyDown={handleKeyDown}
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
      {/* Carousel */}
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
            overflowX: 'hidden', }}
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
            {projects.map((project, idx) => (
              <Box
                key={project.id}
                sx={{
                  marginLeft: idx === 0 ? 8 : 0,
                  marginRight: idx === projects.length -1 ? 8 : 0,
                  flex: '0 0 80%',
                  minWidth: 0,
                  width: { xs: '100vw', sm: 'auto' },
                  display: 'flex',
                  boxSizing: 'border-box',
                  borderRadius: 2,
                  transition: 'border 0.2s, transform 0.3s',
                  transform: idx === selectedIndex ? 'scale(1)' : 'scale(0.8)',
                  opacity: idx === selectedIndex ? 1 : 0.7,
                  cursor: 'pointer',
                }}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              >
                <ProjectCard
                  isSelected={idx === selectedIndex}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologiesUsed}
                  imageUrl={project.svgDiagram}
                  url={project.url}
                />
              </Box>
            ))}
          </Box>
        </Box>
      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="center" gap={2} sx={{ mt: { xs: 1, sm: 2 } }}>
        <CarouselArrow
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          aria-label="Previous project"
          active={prevBtnEnabled}
          sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
        >
          &#8592;
        </CarouselArrow>
        <CarouselArrow
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          aria-label="Next project"
          active={nextBtnEnabled}
          sx={{ minWidth: { xs: 44, sm: 36 }, minHeight: { xs: 44, sm: 36 } }}
        >
          &#8594;
        </CarouselArrow>
      </Box>
    </Stack>
  )
}
