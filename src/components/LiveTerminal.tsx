import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const codeSnippets = [
  { text: "user@apple-m4-pro ~ % cat src/archangel_core.rs", color: "text-[#34d399]" },
  { text: "pub fn init_zero_copy_ring<T>(capacity: usize) -> Ring<T> {", color: "text-blue-400 font-mono" },
  { text: "    let cap = capacity.next_power_of_two();", color: "text-blue-400 font-mono" },
  { text: "    let layout = Layout::array::<Slot<T>>(cap).unwrap();", color: "text-blue-400 font-mono" },
  { text: "    unsafe { RockBuffer::new_allocated(layout) }", color: "text-blue-400 font-mono" },
  { text: "}", color: "text-blue-400 font-mono" },
  { text: "user@apple-m4-pro ~ % cargo build --release --target=native_cpu", color: "text-[#34d399]" },
  { text: "   Compiling archangel-core v3.2.0 (/src)", color: "text-gray-400" },
  { text: "   Compiling lockless-ring-buffer v1.4.1", color: "text-gray-500" },
  { text: "    Finished release [optimized + link-time-opt] in 1.48s", color: "text-green-400 font-bold" },
  { text: "user@apple-m4-pro ~ % ./target/release/archangel-bench --duration=5s", color: "text-[#34d399]" },
];

const liveLogs = [
  "[RUNNING] Benchmarking non-blocking ring-buffer loop...",
  "[METRIC] Iteration #1,000,000 | Latency: 84ns | Throughput: 11.9M ops/s",
  "[METRIC] Iteration #5,000,000 | Latency: 81ns | Throughput: 12.3M ops/s",
  "[METRIC] Iteration #10,000,000 | Latency: 79ns | Throughput: 12.6M ops/s",
  "[BENCHMARK_SUCCESS] 99.99th percentile: 105ns (jitter < 2.4ns)",
  "[SYSTEM] Lock-free ring-buffer successfully mapped at 0x7fff4a20b000",
  "[METRIC] Verification audit: 0.00 bytes leaked in zero-allocation pipeline",
  "[SUCCESS] Handshake verified: [Secure-US-Node-1] -> secure handshake complete",
];

export const LiveTerminal = ({ className = "" }: { className?: string }) => {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < codeSnippets.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev, codeSnippets[currentLineIndex]];
          if (newLines.length > 9) {
            newLines.shift();
          }
          return newLines;
        });
        setCurrentLineIndex(prev => prev + 1);
      }, Math.random() * 300 + 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const idx = Math.floor(Math.random() * liveLogs.length);
          const newLines = [...prev, { text: liveLogs[idx], color: "text-[var(--primary)] font-mono text-xs opacity-75" }];
          if (newLines.length > 9) {
            newLines.shift();
          }
          return newLines;
        });
        setCurrentLineIndex(prev => prev + 1);
      }, Math.random() * 200 + 150);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  return (
    <motion.div 
      className={`bg-[#0c0c0e] border-[1.5px] border-[#222226] rounded-xl overflow-hidden flex flex-col shadow-2xl relative ${className}`}
      style={{ boxShadow: "0 30px 100px rgba(0,0,0,0.8), 0 0 1px 1px rgba(255,255,255,0.05)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-[#1c1c1f] bg-[#141416] select-none">
        <div className="flex gap-[8px] items-center">
          <div className="w-[12px] h-[12px] rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity"></div>
          <div className="w-[12px] h-[12px] rounded-full bg-[#ffbd2e] border border-[#dfa123] cursor-pointer hover:opacity-80 transition-opacity"></div>
          <div className="w-[12px] h-[12px] rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition-opacity"></div>
        </div>
        <div className="flex-1 text-center text-[11px] font-mono text-gray-400 uppercase tracking-[0.15em] font-medium pr-[56px] cursor-default select-none">
          
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 flex-1 font-mono text-[13px] md:text-[14px] leading-[1.7] flex flex-col justify-end tracking-tight bg-[#0c0c0e] min-h-[250px] overflow-y-auto scrollable-container">
        <div className="w-full flex-col flex justify-end">
          {displayedLines.map((line, i) => (
            <div key={i} className={`whitespace-pre break-all ${line.color}`}>
              {line.text}
            </div>
          ))}
          <div className="h-[24px] flex items-center mt-2">
            {currentLineIndex < codeSnippets.length && (
              <span className="bg-[var(--primary)] w-[10px] h-[16px] inline-block animate-pulse opacity-80" />
            )}
            {currentLineIndex >= codeSnippets.length && (
              <div className="text-[var(--primary)] flex items-center font-bold">
                <span className="mr-3 opacity-60">~</span> <span className="bg-[var(--primary)] w-[10px] h-[16px] inline-block animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
