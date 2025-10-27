import { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export const TrackConditions = () => {
  const { trackConditions, setTrackConditions, selectedCircuit } = useAppStore();

  if (!selectedCircuit) {
    return null;
  }

  const getWeatherEmoji = (temp: number) => {
    if (temp < 15) return '❄️';
    if (temp < 25) return '☁️';
    if (temp < 30) return '🌤️';
    return '☀️';
  };

  const getConditionLabel = (temp: number, humidity: number) => {
    if (humidity > 70) return 'Wet Conditions';
    if (temp > 30) return 'Hot & Dry';
    if (temp < 15) return 'Cold';
    return 'Optimal';
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
            Track Conditions
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Drag the sliders to adjust race conditions
          </p>

          <Card className="p-8 bg-gradient-to-br from-card to-card/50">
            <div className="space-y-8">
              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Thermometer className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-heading font-bold">Temperature</div>
                      <div className="text-sm text-muted-foreground">Track surface heat</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{getWeatherEmoji(trackConditions.temperature)}</span>
                    <span className="text-2xl font-heading font-bold text-primary">
                      {trackConditions.temperature}°C
                    </span>
                  </div>
                </div>
                <Slider
                  value={[trackConditions.temperature]}
                  onValueChange={(value) =>
                    setTrackConditions({ ...trackConditions, temperature: value[0] })
                  }
                  min={0}
                  max={40}
                  step={1}
                  className="cursor-grab active:cursor-grabbing"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0°C (Cold)</span>
                  <span>40°C (Hot)</span>
                </div>
              </div>

              {/* Humidity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-heading font-bold">Humidity</div>
                      <div className="text-sm text-muted-foreground">Air moisture level</div>
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-primary">
                    {trackConditions.humidity}%
                  </div>
                </div>
                <Slider
                  value={[trackConditions.humidity]}
                  onValueChange={(value) =>
                    setTrackConditions({ ...trackConditions, humidity: value[0] })
                  }
                  min={0}
                  max={100}
                  step={1}
                  className="cursor-grab active:cursor-grabbing"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0% (Dry)</span>
                  <span>100% (Wet)</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Wind className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-heading font-bold">Wind Speed</div>
                      <div className="text-sm text-muted-foreground">Crosswind effect</div>
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-primary">
                    {trackConditions.windSpeed > 0 ? '+' : ''}{trackConditions.windSpeed} km/h
                  </div>
                </div>
                <Slider
                  value={[trackConditions.windSpeed]}
                  onValueChange={(value) =>
                    setTrackConditions({ ...trackConditions, windSpeed: value[0] })
                  }
                  min={-10}
                  max={10}
                  step={1}
                  className="cursor-grab active:cursor-grabbing"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>-10 km/h (Tailwind)</span>
                  <span>+10 km/h (Headwind)</span>
                </div>
              </div>

              {/* Condition Summary */}
              <div className="pt-6 border-t border-border">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-sm font-heading font-bold">
                  <span className="text-primary">
                    {getConditionLabel(trackConditions.temperature, trackConditions.humidity)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
