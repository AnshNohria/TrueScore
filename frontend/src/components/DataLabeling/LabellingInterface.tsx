import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Check, X, ArrowRight, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface DataItem {
  id: number;
  text: string;
  category: string;
}

const sampleData: DataItem[] = [
  { 
    id: 1, 
    text: "The service was excellent and the staff was very helpful. I would definitely recommend this to my friends.", 
    category: ""
  },
  { 
    id: 2, 
    text: "Product arrived damaged. The packaging was insufficient and customer service was unresponsive.", 
    category: ""
  },
  { 
    id: 3, 
    text: "The app crashes every time I try to upload a photo. Very frustrating experience.", 
    category: ""
  },
  { 
    id: 4, 
    text: "Average experience, nothing special but it got the job done.", 
    category: ""
  },
  { 
    id: 5, 
    text: "Exceeded all my expectations! The quality is amazing and delivery was faster than promised.", 
    category: ""
  }
];

interface LabelingInterfaceProps {
  className?: string;
}

export function LabelingInterface({ className }: LabelingInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<DataItem[]>(sampleData);
  const [progress, setProgress] = useState(0);
  
  const handleLabel = (category: string) => {
    const newData = [...data];
    newData[currentIndex].category = category;
    setData(newData);
    
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.success('All items have been labeled!');
      // Reset for demo purposes
      setTimeout(() => {
        setCurrentIndex(0);
        setData(sampleData.map(item => ({ ...item, category: "" })));
      }, 2000);
    }
    
    setProgress(Math.min(100, ((currentIndex + 1) / data.length) * 100));
  };

  return (
    <div className={cn("flex flex-col p-6 bg-card/80 backdrop-blur-md rounded-2xl animate-slide-in-up", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Data Labeling Task</h2>
        <div className="text-sm text-white/70">
          Progress: {currentIndex + 1}/{data.length}
        </div>
      </div>
      
      <div className="relative w-full h-1 bg-white/10 rounded-full mb-8">
        <div 
          className="absolute top-0 left-0 h-full bg-hera rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="p-8 bg-black/20 rounded-xl mb-8 min-h-[200px] flex items-center">
        <div className="flex gap-4 items-start">
          <FileText size={24} className="text-white/70 mt-1" />
          <p className="text-lg">{data[currentIndex]?.text}</p>
        </div>
      </div>
      
      <div className="text-center mb-3">
        <p className="text-white/70">Categorize this feedback as:</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handleLabel("positive")}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl border border-emerald-500/30 transition-all duration-300"
        >
          <Check size={20} className="text-emerald-400" />
          <span>Positive</span>
        </button>
        
        <button
          onClick={() => handleLabel("neutral")}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl border border-blue-500/30 transition-all duration-300"
        >
          <ArrowRight size={20} className="text-blue-400" />
          <span>Neutral</span>
        </button>
        
        <button
          onClick={() => handleLabel("negative")}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all duration-300"
        >
          <X size={20} className="text-red-400" />
          <span>Negative</span>
        </button>
      </div>
    </div>
  );
}
