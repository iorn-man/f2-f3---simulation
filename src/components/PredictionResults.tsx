import { motion } from 'framer-motion';
import { Trophy, Clock, Gauge, Cloud, Target, Award } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';

export const PredictionResults = () => {
  const { predictionResult, selectedDriver, selectedCircuit } = useAppStore();

  if (!predictionResult || !selectedDriver || !selectedCircuit) {
    return null;
  }

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-500';
    if (position <= 3) return 'text-secondary';
    if (position <= 10) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-32 h-32 rounded-full racing-gradient flex items-center justify-center mb-6 racing-glow mx-auto">
                <div className="text-6xl font-heading font-black text-primary-foreground">
                  P{predictionResult.predictedPosition}
                </div>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Prediction Results
            </h2>
            <p className="text-muted-foreground">
              {selectedDriver.name} at {selectedCircuit.name}
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Trophy className={`w-5 h-5 ${getPositionColor(predictionResult.qualifyingPosition)}`} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Qualifying</div>
                    <div className="text-2xl font-heading font-bold">
                      P{predictionResult.qualifyingPosition}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Predicted Points</div>
                    <div className="text-2xl font-heading font-bold">
                      {predictionResult.predictedPoints.toFixed(1)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                    <div className="text-2xl font-heading font-bold">
                      {predictionResult.confidence.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lap Times */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-heading font-bold text-xl mb-6">
                <Clock className="w-5 h-5 text-primary" />
                Sector Times
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sector 1</span>
                    <span className="font-heading font-bold">
                      {predictionResult.sector1.toFixed(3)}s
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full racing-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${(predictionResult.sector1 / predictionResult.lapTime) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sector 2</span>
                    <span className="font-heading font-bold">
                      {predictionResult.sector2.toFixed(3)}s
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full racing-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${(predictionResult.sector2 / predictionResult.lapTime) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sector 3</span>
                    <span className="font-heading font-bold">
                      {predictionResult.sector3.toFixed(3)}s
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full racing-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${(predictionResult.sector3 / predictionResult.lapTime) * 100}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-bold">Total Lap Time</span>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {predictionResult.lapTime.toFixed(3)}s
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weather Conditions */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-heading font-bold text-xl mb-6">
                <Cloud className="w-5 h-5 text-primary" />
                Track Conditions
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Temperature</span>
                    <span className="font-heading font-bold">
                      {predictionResult.weather.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(predictionResult.weather.temperature / 50) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Humidity</span>
                    <span className="font-heading font-bold">
                      {predictionResult.weather.humidity.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary to-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${predictionResult.weather.humidity}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Wind Speed</span>
                    <span className="font-heading font-bold">
                      {predictionResult.weather.wind.toFixed(1)} km/h
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full metal-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${(predictionResult.weather.wind / 30) * 100}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
