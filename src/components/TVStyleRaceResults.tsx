import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Award, Zap, Target, Flag } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/card';

export const TVStyleRaceResults = () => {
  const { raceResults, selectedCircuit } = useAppStore();

  if (raceResults.length === 0 || !selectedCircuit) {
    return null;
  }

  const getMedalEmoji = (position: number) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return '';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Finished') return 'text-green-500';
    if (status === 'DNF') return 'text-red-500';
    return 'text-yellow-500';
  };

  const fastestLap = Math.min(...raceResults.filter(r => r.status === 'Finished').map(r => r.lapTime));
  const fastestLapDriver = raceResults.find(r => r.lapTime === fastestLap);

  const finishedDrivers = raceResults.filter(r => r.status === 'Finished');
  const avgGap = finishedDrivers.reduce((sum, r) => sum + r.gapToLeader, 0) / finishedDrivers.length;
  const mostConsistent = finishedDrivers.reduce((prev, current) => 
    Math.abs(current.gapToLeader - avgGap) < Math.abs(prev.gapToLeader - avgGap) ? current : prev
  );

  return (
    <section className="py-20 px-6 tv-results-section">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full racing-gradient text-primary-foreground mb-6"
            >
              <Flag className="w-6 h-6" />
              <span className="font-heading font-bold text-lg">RACE COMPLETE</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              Official Race Results
            </h2>
            <p className="text-muted-foreground text-lg">
              {selectedCircuit.name} • {raceResults.length} Drivers
            </p>
          </div>

          {/* Main Results Table */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-card to-card/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left p-4 font-heading font-bold">POS</th>
                    <th className="text-left p-4 font-heading font-bold">DRIVER</th>
                    <th className="text-left p-4 font-heading font-bold">TEAM</th>
                    <th className="text-right p-4 font-heading font-bold">POINTS</th>
                    <th className="text-right p-4 font-heading font-bold">BEST LAP</th>
                    <th className="text-right p-4 font-heading font-bold">GAP</th>
                    <th className="text-center p-4 font-heading font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {raceResults.map((result, index) => (
                      <motion.tr
                        key={result.driver.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          border-b border-border/50 hover:bg-primary/5 transition-colors
                          ${result.position <= 3 ? 'bg-primary/10' : ''}
                        `}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-heading font-bold">
                              {result.position}
                            </span>
                            {result.position <= 3 && (
                              <span className="text-2xl">{getMedalEmoji(result.position)}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-heading font-bold text-lg">
                            {result.driver.name}
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {result.driver.team}
                        </td>
                        <td className="p-4 text-right">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                            result.points > 0 ? 'bg-primary/20' : 'bg-muted'
                          }`}>
                            <Award className="w-4 h-4" />
                            <span className="font-heading font-bold">{result.points}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right font-heading">
                          {result.status === 'Finished' ? (
                            <div className="flex items-center justify-end gap-1">
                              {result.lapTime === fastestLap && (
                                <Zap className="w-4 h-4 text-primary" />
                              )}
                              <span>{result.lapTime.toFixed(3)}s</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-4 text-right font-heading text-muted-foreground">
                          {result.status === 'Finished' && result.gapToLeader > 0 ? (
                            `+${result.gapToLeader.toFixed(3)}s`
                          ) : result.status === 'Finished' ? (
                            '—'
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`font-heading font-bold ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Performance Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full racing-gradient flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Fastest Lap</div>
                    <div className="font-heading font-bold text-xl">
                      {fastestLapDriver?.driver.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-heading font-bold text-primary">
                    {fastestLap.toFixed(3)}s
                  </span>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full metal-gradient flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Most Consistent</div>
                    <div className="font-heading font-bold text-xl">
                      {mostConsistent?.driver.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-heading font-bold text-secondary">
                    Consistency: {(mostConsistent?.driver.consistency * 100).toFixed(0)}%
                  </span>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Championship Points Summary */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50">
            <h3 className="flex items-center gap-2 font-heading font-bold text-2xl mb-6">
              <Award className="w-6 h-6 text-primary" />
              Championship Points Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {raceResults
                .filter(r => r.points > 0)
                .slice(0, 10)
                .map((result, index) => (
                  <motion.div
                    key={result.driver.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="text-center p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors"
                  >
                    <div className="text-3xl font-heading font-bold text-primary mb-1">
                      {result.points}
                    </div>
                    <div className="text-sm font-heading font-bold truncate">
                      {result.driver.name.split(' ')[1] || result.driver.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      P{result.position}
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
