import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useRightSidebar } from '@contexts'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material'
import { ProjectCardSummary } from './projectCard/ProjectCardSummary'
import { ProjectCard } from './projectCard/ProjectCard'
import { PaginationControls } from './PaginationControls'
    
interface IProject {
  id: string;
  title: string;
  url: string;
  purpose: string;
  SvgDiagram: React.ComponentType<any>;
  technologiesUsed: string[];
  description: string;
}

interface ProjectsCarouselProps {
  projects: IProject[]
}

export const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
    startIndex: 1,
    dragFree: false,
    containScroll: 'trimSnaps',
  })



  const theme = useTheme()
  const { setSidebarContent } = useRightSidebar()
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(1)

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
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
>
        <Box style={{maxHeight: "max-content", flex: 1, justifyContent: "center"}}>
          <ProjectCardSummary {...project} />
        </Box>
      </Box>
    )
  }, [selectedIndex, setSidebarContent, projects, theme.palette.text.secondary])

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
      height="100vh"
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
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderRadius: 0,
            }}
          >
            {projects.map((project: IProject, idx: number) => (
              <Box
                key={project.id}
                sx={{
                  width: { xs: idx === selectedIndex ? '100%' : '80%', md: idx === selectedIndex ? '100%' : '60%' },
                  minWidth: { xs: idx === selectedIndex ? '100%' : '80%', md: idx === selectedIndex ? '100%' : '60%' },
                  maxWidth: { xs: idx === selectedIndex ? '100%' : '80%', md: idx === selectedIndex ? '100%' : '60%' },
                  minHeight: '100%',
                  boxSizing: 'border-box',
                  transition: 'opacity 0.2s, transform 0.3s, width 0.3s',
                  transform: idx === selectedIndex ? 'scale(1)' : 'scale(0.9)',
                  opacity: idx === selectedIndex ? 1 : 0.7,
                  zIndex: idx === selectedIndex ? 2 : 1,
                }}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              >
                <ProjectCard
                  purpose={project.purpose}
                  isSelected={idx === selectedIndex}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologiesUsed}
                  SvgDiagram={project.SvgDiagram}
                  url={project.url}
                />
              </Box>
            ))}
          </Box>
        </Box>
      <PaginationControls
        slidesCount={projects.length}
        selectedIndex={selectedIndex} 
        onPrev={scrollPrev as () => void}
        onNext={scrollNext as () => void}
        prevBtnEnabled={prevBtnEnabled}
        nextBtnEnabled={nextBtnEnabled}
        onDotClick={(idx: number) => emblaApi && emblaApi.scrollTo(idx)}
      />
    </Stack>
  )
}