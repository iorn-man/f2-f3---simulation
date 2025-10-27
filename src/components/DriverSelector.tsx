import { motion } from 'framer-motion';
import { User, Trophy, Target, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';

export const DriverSelector = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useAppStore();

  if (drivers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-muted/30 driver-selector-section">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
            Select Driver
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose a driver to analyze their potential F1 performance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((driver, index) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`
                    p-6 cursor-pointer transition-all duration-300 hover:scale-105
                    ${selectedDriver?.id === driver.id 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                    }
                  `}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg">
                          {driver.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {driver.team}
                        </p>
                      </div>
                    </div>
                    {selectedDriver?.id === driver.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        Wins
                      </span>
                      <span className="font-bold">{driver.wins}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Target className="w-4 h-4" />
                        Podiums
                      </span>
                      <span className="font-bold">{driver.podiums}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        Avg Finish
                      </span>
                      <span className="font-bold">{driver.avgFinish.toFixed(1)}</span>
                    </div>
                  </div>

                  {driver.f2Position && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-sm">
                        <span className="font-heading font-bold text-primary">
                          F2 P{driver.f2Position}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
