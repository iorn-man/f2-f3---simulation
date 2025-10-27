-- Create enum for model types
CREATE TYPE public.model_type AS ENUM ('linear_regression', 'random_forest', 'xgboost', 'neural_network', 'ensemble');

-- Create enum for prediction status
CREATE TYPE public.prediction_status AS ENUM ('pending', 'completed', 'failed');

-- Drivers table with comprehensive F2/F3 statistics
CREATE TABLE public.drivers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  age INTEGER,
  nationality TEXT,
  f2_position INTEGER,
  f3_position INTEGER,
  wins INTEGER NOT NULL DEFAULT 0,
  podiums INTEGER NOT NULL DEFAULT 0,
  poles INTEGER NOT NULL DEFAULT 0,
  avg_finish DECIMAL(5,2) NOT NULL,
  consistency DECIMAL(5,2) NOT NULL,
  crash_rate DECIMAL(5,2) NOT NULL,
  races_completed INTEGER NOT NULL DEFAULT 0,
  career_win_rate DECIMAL(5,2),
  podium_percentage DECIMAL(5,2),
  recent_form_score DECIMAL(5,2),
  momentum_score DECIMAL(5,2),
  wet_race_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Circuits table with detailed track characteristics
CREATE TABLE public.circuits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  length DECIMAL(6,3) NOT NULL,
  corners INTEGER NOT NULL,
  top_speed INTEGER NOT NULL,
  sector1_time DECIMAL(6,3) NOT NULL,
  sector2_time DECIMAL(6,3) NOT NULL,
  sector3_time DECIMAL(6,3) NOT NULL,
  track_type TEXT,
  elevation_gain INTEGER,
  surface_type TEXT,
  avg_temperature DECIMAL(5,2),
  avg_humidity DECIMAL(5,2),
  avg_wind_speed DECIMAL(5,2),
  rookie_avg_finish DECIMAL(5,2),
  track_complexity_score DECIMAL(5,2),
  speed_vs_downforce_rating DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Historical F1 rookie races for training data
CREATE TABLE public.historical_races (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  circuit_id UUID REFERENCES public.circuits(id) ON DELETE CASCADE,
  season INTEGER NOT NULL,
  race_number INTEGER NOT NULL,
  qualifying_position INTEGER NOT NULL,
  finishing_position INTEGER NOT NULL,
  points_scored DECIMAL(5,2) NOT NULL,
  fastest_lap BOOLEAN DEFAULT FALSE,
  dnf BOOLEAN DEFAULT FALSE,
  weather_condition TEXT,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  lap_time DECIMAL(6,3),
  sector1_time DECIMAL(6,3),
  sector2_time DECIMAL(6,3),
  sector3_time DECIMAL(6,3),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Feature engineering table for derived metrics
CREATE TABLE public.feature_engineering (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  circuit_id UUID REFERENCES public.circuits(id) ON DELETE CASCADE,
  driver_circuit_compatibility DECIMAL(5,2),
  team_strength_factor DECIMAL(5,2),
  weather_adaptation_score DECIMAL(5,2),
  track_experience_factor DECIMAL(5,2),
  rolling_avg_finish DECIMAL(5,2),
  form_trend DECIMAL(5,2),
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Model versions table for ML model tracking
CREATE TABLE public.model_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_type public.model_type NOT NULL,
  version TEXT NOT NULL,
  rmse DECIMAL(8,4),
  mae DECIMAL(8,4),
  r_squared DECIMAL(5,4),
  mape DECIMAL(5,2),
  accuracy_within_2_positions DECIMAL(5,2),
  training_samples INTEGER,
  test_samples INTEGER,
  feature_count INTEGER,
  hyperparameters JSONB,
  feature_importance JSONB,
  is_active BOOLEAN DEFAULT FALSE,
  training_duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Predictions table for storing all predictions
CREATE TABLE public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE,
  circuit_id UUID REFERENCES public.circuits(id) ON DELETE CASCADE,
  model_version_id UUID REFERENCES public.model_versions(id),
  predicted_position INTEGER NOT NULL,
  predicted_qualifying INTEGER NOT NULL,
  predicted_points DECIMAL(5,2) NOT NULL,
  top_10_probability DECIMAL(5,2),
  confidence DECIMAL(5,2) NOT NULL,
  prediction_lower_bound INTEGER,
  prediction_upper_bound INTEGER,
  predicted_lap_time DECIMAL(6,3),
  predicted_sector1 DECIMAL(6,3),
  predicted_sector2 DECIMAL(6,3),
  predicted_sector3 DECIMAL(6,3),
  weather_temperature DECIMAL(5,2),
  weather_humidity DECIMAL(5,2),
  weather_wind DECIMAL(5,2),
  shap_values JSONB,
  feature_contributions JSONB,
  status public.prediction_status DEFAULT 'pending',
  actual_position INTEGER,
  actual_points DECIMAL(5,2),
  prediction_error DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circuits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historical_races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_engineering ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Allow public read access for all tables (academic project)
CREATE POLICY "Allow public read access to drivers"
  ON public.drivers FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to circuits"
  ON public.circuits FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to historical_races"
  ON public.historical_races FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to feature_engineering"
  ON public.feature_engineering FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to model_versions"
  ON public.model_versions FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to predictions"
  ON public.predictions FOR SELECT
  USING (true);

-- RLS Policies: Allow public insert for predictions and drivers
CREATE POLICY "Allow public insert to predictions"
  ON public.predictions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert to drivers"
  ON public.drivers FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for drivers table
CREATE TRIGGER update_drivers_updated_at
  BEFORE UPDATE ON public.drivers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial circuit data
INSERT INTO public.circuits (name, country, length, corners, top_speed, sector1_time, sector2_time, sector3_time, track_type, track_complexity_score, speed_vs_downforce_rating) VALUES
('Bahrain International Circuit', 'Bahrain', 5.412, 15, 322, 28.5, 35.2, 27.8, 'power', 6.5, 7.2),
('Circuit de Monaco', 'Monaco', 3.337, 19, 290, 26.1, 31.4, 25.2, 'street', 9.8, 9.5),
('Silverstone Circuit', 'United Kingdom', 5.891, 18, 332, 30.2, 38.5, 29.1, 'power', 7.8, 6.8),
('Autodromo Nazionale di Monza', 'Italy', 5.793, 11, 360, 27.8, 36.9, 28.3, 'power', 5.2, 4.8),
('Circuit de Spa-Francorchamps', 'Belgium', 7.004, 19, 340, 35.2, 42.1, 34.7, 'power', 8.5, 6.5),
('Circuit of the Americas', 'United States', 5.513, 20, 330, 29.5, 37.8, 28.9, 'mixed', 8.2, 7.5),
('Suzuka International Racing Course', 'Japan', 5.807, 18, 320, 31.2, 39.6, 30.5, 'mixed', 8.9, 8.2),
('Marina Bay Street Circuit', 'Singapore', 5.063, 23, 300, 28.8, 36.5, 27.3, 'street', 9.5, 9.1);

-- Create indexes for better performance
CREATE INDEX idx_drivers_name ON public.drivers(name);
CREATE INDEX idx_circuits_name ON public.circuits(name);
CREATE INDEX idx_historical_races_driver ON public.historical_races(driver_id);
CREATE INDEX idx_historical_races_circuit ON public.historical_races(circuit_id);
CREATE INDEX idx_predictions_driver ON public.predictions(driver_id);
CREATE INDEX idx_predictions_circuit ON public.predictions(circuit_id);
CREATE INDEX idx_predictions_created_at ON public.predictions(created_at DESC);
CREATE INDEX idx_model_versions_active ON public.model_versions(is_active) WHERE is_active = true;