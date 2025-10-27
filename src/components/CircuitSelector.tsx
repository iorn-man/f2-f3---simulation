import { motion } from 'framer-motion';
import { MapPin, Gauge, CornerDownRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';

export const CircuitSelector = () => {
  const { circuits, selectedCircuit, setSelectedCircuit, selectedDriver } = useAppStore();

  if (!selectedDriver) {
    return null;
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
            Select Circuit
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose from 23 Formula 1 circuits worldwide
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {circuits.map((circuit, index) => (
              <motion.div
                key={circuit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`
                    p-6 cursor-pointer transition-all duration-300 hover:scale-105
                    ${selectedCircuit?.id === circuit.id 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'hover:border-primary/50'
                    }
                  `}
                  onClick={() => setSelectedCircuit(circuit)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">
                        {circuit.name}
                      </h3>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {circuit.country}
                      </p>
                    </div>
                    {selectedCircuit?.id === circuit.id && (
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
                        <Gauge className="w-4 h-4" />
                        Length
                      </span>
                      <span className="font-bold">{circuit.length.toFixed(2)} km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <CornerDownRight className="w-4 h-4" />
                        Corners
                      </span>
                      <span className="font-bold">{circuit.corners}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="w-4 h-4" />
                        Top Speed
                      </span>
                      <span className="font-bold">{circuit.topSpeed} km/h</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Sector Times: S1 {circuit.sector1Time}s • S2 {circuit.sector2Time}s • S3 {circuit.sector3Time}s
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
