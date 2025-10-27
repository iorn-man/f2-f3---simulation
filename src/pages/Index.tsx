import { Hero } from '@/components/Hero';
import { CSVUploader } from '@/components/CSVUploader';
import { DriverSelector } from '@/components/DriverSelector';
import { CircuitSelector } from '@/components/CircuitSelector';
import { TrackConditions } from '@/components/TrackConditions';
import { PredictionEngine } from '@/components/PredictionEngine';
import { PredictionResults } from '@/components/PredictionResults';
import { AllDriversRaceSimulation } from '@/components/AllDriversRaceSimulation';
import { TVStyleRaceResults } from '@/components/TVStyleRaceResults';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CSVUploader />
      <DriverSelector />
      <CircuitSelector />
      <TrackConditions />
      <PredictionEngine />
      <PredictionResults />
      <AllDriversRaceSimulation />
      <TVStyleRaceResults />
    </div>
  );
};

export default Index;
