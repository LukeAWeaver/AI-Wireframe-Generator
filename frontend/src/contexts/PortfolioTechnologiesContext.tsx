import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { fetchPortfolioTechnologies } from '../utils/api';

interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

interface IPortfolioTechnologiesContextType {
  technologies: IPortfolioTechnology[];
  technologiesByName: Record<string, IPortfolioTechnology>;
  loading: boolean;
  error: string | null;
}

const PortfolioTechnologiesContext = createContext<IPortfolioTechnologiesContextType>({
  technologies: [],
  technologiesByName: {},
  loading: true,
  error: null,
});

export const usePortfolioTechnologies = () => useContext(PortfolioTechnologiesContext);

export const PortfolioTechnologiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [technologies, setTechnologies] = useState<IPortfolioTechnology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a name-indexed object for easy access
  const technologiesByName = useMemo(() => {
    const byName: Record<string, IPortfolioTechnology> = {};
    technologies.forEach(tech => {
      byName[tech.name] = tech;
    });
    return byName;
  }, [technologies]);

  useEffect(() => {
    fetchPortfolioTechnologies()
      .then((data: IPortfolioTechnology[]) => {
        console.log('data', data);
        setTechnologies(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        let message = 'Unknown error';
        if (typeof err === 'object' && err !== null && 'message' in err) {
          const maybeError = err as { message?: unknown };
          if (typeof maybeError.message === 'string') {
            message = maybeError.message;
          }
        }
        setError(message);
        setLoading(false);
      });
  }, []);

  return (
    <PortfolioTechnologiesContext.Provider value={{ technologies, technologiesByName, loading, error }}>
      {children}
    </PortfolioTechnologiesContext.Provider>
  );
}; 