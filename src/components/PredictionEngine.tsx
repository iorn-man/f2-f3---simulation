import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Loader2 } from 'lucide-react';
import { useAppStore, PredictionResult } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const PredictionEngine = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { selectedDriver, selectedCircuit, setPredictionResult } = useAppStore();

  const runSimulation = async () => {
    if (!selectedDriver || !selectedCircuit) {
      toast({
        title: 'Selection Required',
        description: 'Please select both a driver and a circuit',
        variant: 'destructive',
      });
      return;
    }

    setIsSimulating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock prediction calculation
    const basePosition = selectedDriver.f2Position || 10;
    const consistencyFactor = selectedDriver.consistency * 2;
    const crashPenalty = selectedDriver.crashRate * 10;
    const circuitFactor = selectedCircuit.corners / 20;

    const predictedPosition = Math.max(
      1,
      Math.min(
        20,
        Math.round(basePosition - consistencyFactor + crashPenalty + circuitFactor)
      )
    );

    const qualifyingPosition = Math.max(1, predictedPosition + Math.floor(Math.random() * 3 - 1));
    const confidence = Math.min(95, 70 + selectedDriver.consistency * 25);

    const baseLapTime = selectedCircuit.sector1Time + selectedCircuit.sector2Time + selectedCircuit.sector3Time;
    const driverFactor = 1 + (selectedDriver.avgFinish / 100);
    const lapTime = baseLapTime * driverFactor;

    const result: PredictionResult = {
      driverId: selectedDriver.id,
      circuitId: selectedCircuit.id,
      predictedPosition,
      qualifyingPosition,
      predictedPoints: Math.max(0, 26 - predictedPosition * 1.3),
      confidence,
      lapTime,
      sector1: selectedCircuit.sector1Time * driverFactor,
      sector2: selectedCircuit.sector2Time * driverFactor,
      sector3: selectedCircuit.sector3Time * driverFactor,
      weather: {
        temperature: 20 + Math.random() * 15,
        humidity: 40 + Math.random() * 40,
        wind: Math.random() * 20,
      },
    };

    setPredictionResult(result);
    setIsSimulating(false);

    toast({
      title: 'Simulation Complete',
      description: `Predicted P${predictedPosition} for ${selectedDriver.name}`,
    });
  };

  if (!selectedDriver || !selectedCircuit) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border mb-8">
            <Zap className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-sm font-heading font-bold">
                {selectedDriver.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedCircuit.name}
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Run Prediction
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Analyze driver performance using machine learning algorithms and historical F2/F3 data
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={runSimulation}
              disabled={isSimulating}
              className="racing-gradient text-primary-foreground font-heading font-bold text-lg px-12 py-6 rounded-lg shadow-lg racing-glow"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Simulating Race...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Start Simulation
                </>
              )}
            </Button>
          </motion.div>

          {isSimulating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 space-y-2"
            >
              <div className="text-sm text-muted-foreground">Processing telemetry data...</div>
              <div className="h-1 w-64 mx-auto bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full racing-gradient"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
