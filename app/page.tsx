'use client';

import Dither from "@/components/Dither";
import { ArrowUpIcon, Image } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function Home() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the file
      console.log(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // Handle the file
      console.log(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <Dither
        waveColor={[0.59, 0.83, 0.37]}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.8}
        colorNum={4}
        pixelSize={2}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-8">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-8xl md:text-[256px] text-white">
          Podu.pics
        </h1>

        <div className="w-[90%] max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">

          <form
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className="relative"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />

            <label
              htmlFor="file-upload"
              className={`
                flex flex-col items-center justify-center
                min-h-[200px] md:min-h-[300px] p-8 md:p-12
                border-4 border-dashed rounded-2xl
                cursor-pointer transition-all duration-200
                ${dragActive
                  ? 'border-green-400 bg-green-500/10'
                  : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <ArrowUpIcon
                  size={64}
                  weight="light"
                  className={dragActive ? 'text-green-400' : 'text-white/60'}
                />
                <Image
                  size={48}
                  weight="light"
                  className={dragActive ? 'text-green-400' : 'text-white/60'}
                />
                <div className="text-center">
                  <p className="text-xl font-medium text-white mb-2">
                    {dragActive ? 'Drop your image here' : 'Turn your images into links'}
                  </p>
                  <p className="text-sm text-white/70">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
