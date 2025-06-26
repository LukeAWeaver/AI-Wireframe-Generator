import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchPortfolioTechnologies } from '../utils/api';

interface PortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

interface PortfolioTechnologiesContextType {
  technologies: PortfolioTechnology[];
  loading: boolean;
  error: string | null;
}

const PortfolioTechnologiesContext = createContext<PortfolioTechnologiesContextType>({
  technologies: [],
  loading: true,
  error: null,
});

export const usePortfolioTechnologies = () => useContext(PortfolioTechnologiesContext);

export const PortfolioTechnologiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [technologies, setTechnologies] = useState<PortfolioTechnology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioTechnologies()
      .then((data) => {
        console.log('data', data);
        setTechnologies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <PortfolioTechnologiesContext.Provider value={{ technologies, loading, error }}>
      {children}
    </PortfolioTechnologiesContext.Provider>
  );
}; 