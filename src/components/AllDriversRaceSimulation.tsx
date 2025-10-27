import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Loader2 } from 'lucide-react';
import { useAppStore, RaceResult } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const AllDriversRaceSimulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const { drivers, selectedCircuit, trackConditions, setRaceResults } = useAppStore();

  const calculatePoints = (position: number): number => {
    const pointsTable: { [key: number]: number } = {
      1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1,
    };
    return pointsTable[position] || 0;
  };

  const runAllDriversSimulation = async () => {
    if (!selectedCircuit) {
      toast({
        title: 'Circuit Required',
        description: 'Please select a circuit first',
        variant: 'destructive',
      });
      return;
    }

    if (drivers.length === 0) {
      toast({
        title: 'No Drivers',
        description: 'Please upload driver data first',
        variant: 'destructive',
      });
      return;
    }

    setIsSimulating(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Calculate predictions for all drivers
    const predictions = drivers.map(driver => {
      const basePosition = driver.f2Position || 10;
      const consistencyFactor = driver.consistency * 2;
      const crashPenalty = driver.crashRate * 10;
      const circuitFactor = selectedCircuit.corners / 20;
      
      // Weather factors
      const tempFactor = Math.abs(trackConditions.temperature - 25) / 50;
      const humidityFactor = trackConditions.humidity / 200;
      const windFactor = Math.abs(trackConditions.windSpeed) / 20;

      const predictedPosition = Math.max(
        1,
        Math.min(
          20,
          Math.round(
            basePosition - consistencyFactor + crashPenalty + circuitFactor + 
            tempFactor + humidityFactor + windFactor + (Math.random() * 2 - 1)
          )
        )
      );

      const baseLapTime = selectedCircuit.sector1Time + selectedCircuit.sector2Time + selectedCircuit.sector3Time;
      const driverFactor = 1 + (driver.avgFinish / 100);
      const weatherImpact = tempFactor + humidityFactor + windFactor;
      const lapTime = baseLapTime * driverFactor * (1 + weatherImpact);

      // Randomly assign DNF/DSQ (5% chance)
      const status = Math.random() < 0.05 ? (Math.random() < 0.5 ? 'DNF' : 'DSQ') : 'Finished';

      return {
        driver,
        position: predictedPosition,
        lapTime,
        status: status as 'Finished' | 'DNF' | 'DSQ',
      };
    });

    // Sort by position (DNF/DSQ go to the end)
    const finishedDrivers = predictions
      .filter(p => p.status === 'Finished')
      .sort((a, b) => a.position - b.position);
    
    const dnfDrivers = predictions.filter(p => p.status !== 'Finished');

    // Reassign positions based on final order
    const finalResults: RaceResult[] = [];
    let currentPosition = 1;

    finishedDrivers.forEach((pred, index) => {
      const leaderTime = finishedDrivers[0].lapTime;
      finalResults.push({
        driver: pred.driver,
        position: currentPosition++,
        points: calculatePoints(index + 1),
        lapTime: pred.lapTime,
        gapToLeader: pred.lapTime - leaderTime,
        status: 'Finished',
      });
    });

    dnfDrivers.forEach(pred => {
      finalResults.push({
        driver: pred.driver,
        position: currentPosition++,
        points: 0,
        lapTime: pred.lapTime,
        gapToLeader: 0,
        status: pred.status,
      });
    });

    setRaceResults(finalResults);
    setIsSimulating(false);

    toast({
      title: 'Race Simulation Complete',
      description: `All ${drivers.length} drivers have completed the race`,
    });

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.querySelector('.tv-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  if (drivers.length === 0 || !selectedCircuit) {
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
            <Users className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-sm font-heading font-bold">
                {drivers.length} Drivers Loaded
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedCircuit.name}
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            All-Drivers Race Simulation
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Run a complete race simulation with all uploaded drivers and see the full championship standings
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={runAllDriversSimulation}
              disabled={isSimulating}
              className="racing-gradient text-primary-foreground font-heading font-bold text-lg px-12 py-6 rounded-lg shadow-lg racing-glow"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Running Race Simulation...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Start All-Drivers Race Simulation
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
              <div className="text-sm text-muted-foreground">
                Processing {drivers.length} driver predictions with weather conditions...
              </div>
              <div className="h-1 w-64 mx-auto bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full racing-gradient"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
