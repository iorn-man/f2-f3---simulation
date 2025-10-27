import { create } from 'zustand';

export interface Driver {
  id: string;
  name: string;
  team: string;
  f2Position?: number;
  f3Position?: number;
  wins: number;
  podiums: number;
  poles: number;
  avgFinish: number;
  consistency: number;
  crashRate: number;
}

export interface Circuit {
  id: string;
  name: string;
  country: string;
  length: number;
  corners: number;
  topSpeed: number;
  sector1Time: number;
  sector2Time: number;
  sector3Time: number;
}

export interface PredictionResult {
  driverId: string;
  circuitId: string;
  predictedPosition: number;
  qualifyingPosition: number;
  predictedPoints: number;
  confidence: number;
  lapTime: number;
  sector1: number;
  sector2: number;
  sector3: number;
  weather: {
    temperature: number;
    humidity: number;
    wind: number;
  };
}

export interface RaceResult {
  driver: Driver;
  position: number;
  points: number;
  lapTime: number;
  gapToLeader: number;
  status: 'Finished' | 'DNF' | 'DSQ';
}

export interface TrackConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

interface AppState {
  drivers: Driver[];
  circuits: Circuit[];
  selectedDriver: Driver | null;
  selectedCircuit: Circuit | null;
  predictionResult: PredictionResult | null;
  uploadedData: any[];
  raceResults: RaceResult[];
  trackConditions: TrackConditions;
  setDrivers: (drivers: Driver[]) => void;
  setSelectedDriver: (driver: Driver | null) => void;
  setSelectedCircuit: (circuit: Circuit | null) => void;
  setPredictionResult: (result: PredictionResult | null) => void;
  setUploadedData: (data: any[]) => void;
  setRaceResults: (results: RaceResult[]) => void;
  setTrackConditions: (conditions: TrackConditions) => void;
}

export const useAppStore = create<AppState>((set) => ({
  drivers: [],
  raceResults: [],
  trackConditions: {
    temperature: 25,
    humidity: 50,
    windSpeed: 5,
  },
  circuits: [
    {
      id: 'bahrain',
      name: 'Bahrain International Circuit',
      country: 'Bahrain',
      length: 5.412,
      corners: 15,
      topSpeed: 322,
      sector1Time: 28.5,
      sector2Time: 35.2,
      sector3Time: 27.8,
    },
    {
      id: 'monaco',
      name: 'Circuit de Monaco',
      country: 'Monaco',
      length: 3.337,
      corners: 19,
      topSpeed: 290,
      sector1Time: 26.1,
      sector2Time: 31.4,
      sector3Time: 25.2,
    },
    {
      id: 'silverstone',
      name: 'Silverstone Circuit',
      country: 'United Kingdom',
      length: 5.891,
      corners: 18,
      topSpeed: 332,
      sector1Time: 30.2,
      sector2Time: 38.5,
      sector3Time: 29.1,
    },
    {
      id: 'monza',
      name: 'Autodromo Nazionale di Monza',
      country: 'Italy',
      length: 5.793,
      corners: 11,
      topSpeed: 360,
      sector1Time: 27.8,
      sector2Time: 36.9,
      sector3Time: 28.3,
    },
    {
      id: 'spa',
      name: 'Circuit de Spa-Francorchamps',
      country: 'Belgium',
      length: 7.004,
      corners: 19,
      topSpeed: 340,
      sector1Time: 35.2,
      sector2Time: 42.1,
      sector3Time: 34.7,
    },
  ],
  selectedDriver: null,
  selectedCircuit: null,
  predictionResult: null,
  uploadedData: [],
  setDrivers: (drivers) => set({ drivers }),
  setSelectedDriver: (driver) => set({ selectedDriver: driver }),
  setSelectedCircuit: (circuit) => set({ selectedCircuit: circuit }),
  setPredictionResult: (result) => set({ predictionResult: result }),
  setUploadedData: (data) => set({ uploadedData: data }),
  setRaceResults: (results) => set({ raceResults: results }),
  setTrackConditions: (conditions) => set({ trackConditions: conditions }),
}));
