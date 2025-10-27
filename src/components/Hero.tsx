import { motion } from 'framer-motion';
import { Flag, Zap, TrendingUp } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 carbon-fiber opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />
      
      {/* Animated Racing Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Advanced AI-Powered Analytics</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-heading font-black mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              F1 ROOKIE
            </span>
            <br />
            <span className="text-foreground">PREDICTOR</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-body"
          >
            Harness machine learning and F2/F3 data to predict rookie performance across all 23 Formula 1 circuits
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border">
              <Flag className="w-5 h-5 text-primary" />
              <span className="font-medium">23 Circuits</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Real-Time Analytics</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-medium">AI Predictions</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-lg racing-gradient text-primary-foreground font-heading font-bold text-lg shadow-lg racing-glow transition-all duration-300"
            >
              START ANALYSIS
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 racing-gradient" />
      
      {/* Animated Checkered Flag Pattern */}
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="0" y="0" width="50" height="50" fill="currentColor" />
          <rect x="50" y="50" width="50" height="50" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
};
