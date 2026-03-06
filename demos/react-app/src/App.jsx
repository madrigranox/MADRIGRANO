import { useState, useEffect } from 'react';
import LogisticaCore from './components/LogisticaCore';
import EsgEngine from './components/EsgEngine';
import FleetSync from './components/FleetSync';
import AlgorithmicWorkforce from './components/AlgorithmicWorkforce';
import RagOracle from './components/RagOracle';
import CLevelMatrix from './components/CLevelMatrix';

function App() {
  const [currentRoute, setCurrentRoute] = useState('logistica');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'logistica';
      setCurrentRoute(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial load

    // Read the theme from the URL
    if (window.location.search.includes('theme=kinder')) {
      document.documentElement.classList.add('theme-kinder');
    } else {
      document.documentElement.classList.remove('theme-kinder');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple router
  const renderDemo = () => {
    switch (currentRoute) {
      case 'logistica': return <LogisticaCore />;
      case 'emissoes': return <EsgEngine />;
      case 'voos': return <FleetSync />;
      case 'escala': return <AlgorithmicWorkforce />;
      case 'faq': return <RagOracle />;
      case 'bi': return <CLevelMatrix />;
      default: return <LogisticaCore />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-bg-primary text-text-primary">
      {renderDemo()}
    </div>
  );
}

export default App;
