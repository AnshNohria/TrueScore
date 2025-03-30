import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, MinusCircle } from 'lucide-react';

interface TableItem {
  id: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  date: string;
}

const recentLabels: TableItem[] = [
  {
    id: 1,
    text: "The customer service was outstanding",
    sentiment: 'positive',
    confidence: 0.98,
    date: "2023-05-15"
  },
  {
    id: 2,
    text: "Product broke after one week of use",
    sentiment: 'negative',
    confidence: 0.95,
    date: "2023-05-14"
  },
  {
    id: 3,
    text: "Delivery was on time as expected",
    sentiment: 'neutral',
    confidence: 0.86,
    date: "2023-05-14"
  },
  {
    id: 4,
    text: "I'm very satisfied with my purchase",
    sentiment: 'positive',
    confidence: 0.92,
    date: "2023-05-13"
  },
  {
    id: 5,
    text: "The application is difficult to navigate",
    sentiment: 'negative',
    confidence: 0.89,
    date: "2023-05-12"
  }
];

interface DataTableProps {
  className?: string;
}

export function DataTable({ className }: DataTableProps) {
  return (
    <div className={cn("p-6 bg-card/80 backdrop-blur-md rounded-2xl animate-slide-in-up", className)}>
      <h2 className="text-xl font-bold mb-6">Recent Labels</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/70 font-medium">Text</th>
              <th className="text-left py-3 px-4 text-white/70 font-medium">Sentiment</th>
              <th className="text-left py-3 px-4 text-white/70 font-medium">Confidence</th>
              <th className="text-left py-3 px-4 text-white/70 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentLabels.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 truncate max-w-[300px]">{item.text}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {item.sentiment === 'positive' && (
                      <>
                        <CheckCircle size={16} className="text-emerald-400" />
                        <span>Positive</span>
                      </>
                    )}
                    {item.sentiment === 'negative' && (
                      <>
                        <AlertCircle size={16} className="text-red-400" />
                        <span>Negative</span>
                      </>
                    )}
                    {item.sentiment === 'neutral' && (
                      <>
                        <MinusCircle size={16} className="text-blue-400" />
                        <span>Neutral</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          item.confidence > 0.9 ? "bg-emerald-500" : 
                          item.confidence > 0.8 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                    <span>{Math.round(item.confidence * 100)}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white/70">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
