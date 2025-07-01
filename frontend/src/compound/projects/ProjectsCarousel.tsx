import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useRightSidebar, usePortfolioTechnologies } from '@contexts'
import { TechnologyBadge } from '@compound'
import { CarouselArrow } from '@components'
import { Badge } from '@components'
import { ProjectCard } from '@compound'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface IProject {
  id: string
  title: string
  url: string
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
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}>
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#888', mb: 3, maxWidth: 320 }}>
          {project.description}
        </Typography>
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
  }, [selectedIndex, setSidebarContent, projects, technologiesByName])

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Projects carousel"
    >
      <Typography variant="h1" sx={{ fontSize: 32, mb: 4 }}>
        More Projects
      </Typography>
      <Box width="100%" maxWidth={900} mx="auto" position="relative">
        <Box
          className="embla"
          ref={emblaRef}
          sx={{ overflow: 'hidden', borderRadius: 2 }}
        >
          <Box
            className="embla__container"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {projects.map(project => (
              <Box
                key={project.id}
                sx={{
                  flex: '0 0 80%',
                  minWidth: 0,
                  maxWidth: '80%',
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologiesUsed}
                  imageUrl={project.svgDiagram}
                  onViewDetails={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <CarouselArrow
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous project"
            active={prevBtnEnabled}
          >
            &#8592;
          </CarouselArrow>
          <CarouselArrow
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next project"
            active={nextBtnEnabled}
          >
            &#8594;
          </CarouselArrow>
        </Box>
      </Box>
    </Box>
  )
}
