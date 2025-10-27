import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileCheck, AlertCircle, X } from 'lucide-react';
import { useAppStore, Driver } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const CSVUploader = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const { setDrivers, setUploadedData } = useAppStore();

  const processCSV = useCallback((file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            const values = line.split(',').map(v => v.trim());
            const row: any = { id: `driver-${index}` };
            headers.forEach((header, i) => {
              row[header] = values[i];
            });
            return row;
          });

        // Convert to Driver format
        const drivers: Driver[] = data.map((row, index) => ({
          id: row.id || `driver-${index}`,
          name: row.name || row.Name || 'Unknown Driver',
          team: row.team || row.Team || 'Independent',
          f2Position: parseInt(row.f2Position || row.F2Position) || undefined,
          f3Position: parseInt(row.f3Position || row.F3Position) || undefined,
          wins: parseInt(row.wins || row.Wins) || 0,
          podiums: parseInt(row.podiums || row.Podiums) || 0,
          poles: parseInt(row.poles || row.Poles) || 0,
          avgFinish: parseFloat(row.avgFinish || row.AvgFinish) || 10,
          consistency: parseFloat(row.consistency || row.Consistency) || 0.75,
          crashRate: parseFloat(row.crashRate || row.CrashRate) || 0.05,
        }));

        setDrivers(drivers);
        setUploadedData(data);
        setPreview(data.slice(0, 5));
        setIsProcessing(false);

        toast({
          title: 'Upload Successful',
          description: `Processed ${drivers.length} drivers from CSV file`,
        });

        // Auto-scroll to the driver selector section
        setTimeout(() => {
          const driverSection = document.querySelector('.driver-selector-section');
          if (driverSection) {
            driverSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      } catch (error) {
        setIsProcessing(false);
        toast({
          title: 'Upload Failed',
          description: 'Error processing CSV file. Please check the format.',
          variant: 'destructive',
        });
      }
    };

    reader.readAsText(file);
  }, [setDrivers, setUploadedData]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'text/csv') {
      processCSV(file);
    } else {
      toast({
        title: 'Invalid File',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      });
    }
  }, [processCSV]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  return (
    <section id="upload" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
            Upload Driver Data
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Import F2/F3 driver statistics in CSV format
          </p>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`
              relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
              transition-all duration-300
              ${isDragActive 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-border bg-card hover:border-primary/50'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <motion.div
              animate={isProcessing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isProcessing ? Infinity : 0, ease: 'linear' }}
            >
              {isProcessing ? (
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
              ) : (
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              )}
            </motion.div>

            <h3 className="text-xl font-heading font-bold mb-2">
              {isDragActive ? 'Drop your CSV file here' : 'Drag & Drop CSV File'}
            </h3>
            <p className="text-muted-foreground mb-4">
              or click to browse files
            </p>
            
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <FileCheck className="w-4 h-4" />
              <span>Supports: .csv format</span>
            </div>
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 p-6 rounded-lg bg-card border border-border"
            >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    <h4 className="font-heading font-bold">Data Preview</h4>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPreview([])}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {preview[0] && Object.keys(preview[0]).map((key) => (
                          <th key={key} className="text-left p-2 font-heading">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          {Object.values(row).map((value: any, j) => (
                            <td key={j} className="p-2">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Showing first 5 rows. Total rows processed: {preview.length}
                </p>
              </motion.div>
            )}

          {/* Sample Data Button */}
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => {
                const sampleDrivers: Driver[] = [
                  {
                    id: 'sample-1',
                    name: 'Alex Morrison',
                    team: 'Prema Racing',
                    f2Position: 1,
                    wins: 8,
                    podiums: 14,
                    poles: 6,
                    avgFinish: 2.3,
                    consistency: 0.92,
                    crashRate: 0.02,
                  },
                  {
                    id: 'sample-2',
                    name: 'Sofia Chen',
                    team: 'Carlin',
                    f2Position: 2,
                    wins: 5,
                    podiums: 11,
                    poles: 4,
                    avgFinish: 3.1,
                    consistency: 0.88,
                    crashRate: 0.03,
                  },
                  {
                    id: 'sample-3',
                    name: 'Lucas Schmidt',
                    team: 'ART Grand Prix',
                    f2Position: 3,
                    wins: 4,
                    podiums: 9,
                    poles: 3,
                    avgFinish: 4.2,
                    consistency: 0.85,
                    crashRate: 0.04,
                  },
                ];
                setDrivers(sampleDrivers);
                toast({
                  title: 'Sample Data Loaded',
                  description: 'Loaded 3 sample drivers',
                });
              }}
            >
              Load Sample Data
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
