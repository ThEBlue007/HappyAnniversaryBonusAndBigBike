import React, { useState } from 'react';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { MemoriesScrapbook } from './components/MemoriesScrapbook';
import { LittleThingsSection } from './components/LittleThingsSection';
import { IntermissionNote } from './components/IntermissionNote';
import { FinalLetterEnvelope } from './components/FinalLetterEnvelope';
import { FinalScreen } from './components/FinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { ImagePreviewModal } from './components/ImagePreviewModal';

export const App: React.FC = () => {
  // State for in-browser temporary image previews (requested by Blue)
  const [customImages, setCustomImages] = useState<Record<number, string>>({});
  const [targetMemoryId, setTargetMemoryId] = useState<number | null>(null);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateImage = (memoryId: number, base64Url: string) => {
    setCustomImages((prev) => ({
      ...prev,
      [memoryId]: base64Url,
    }));
  };

  const handleResetImages = () => {
    setCustomImages({});
  };

  return (
    <div className="min-h-screen text-scrapbook-brown-dark relative selection:bg-scrapbook-pink-200">
      {/* 1. Opening Screen — A Little Surprise 💌 */}
      <OpeningEnvelope onStartReading={() => scrollTo('memories-section')} />

      {/* 2. Our Little Memories — เรื่องราวของเราสองคน 📸 */}
      <MemoriesScrapbook
        customImages={customImages}
        onTriggerImagePicker={(id) => setTargetMemoryId(id)}
      />

      {/* 3. Little Things I Love About You 🌷 */}
      <LittleThingsSection />

      {/* 4. A Little Note Before the End ♡ */}
      <IntermissionNote onProceedToLetter={() => scrollTo('final-letter-section')} />

      {/* 5. The Final Letter — จดหมายถึงสโน 💌 */}
      <FinalLetterEnvelope />

      {/* 6. Final Screen — A Little Surprise Awaits 🎂 */}
      <FinalScreen />

      {/* Floating Music Player 🎵 (Plays upon click, with volume slider and spinning vinyl) */}
      <MusicPlayer />

      {/* Photo Preview & Customization Drawer (for Blue) */}
      <ImagePreviewModal
        customImages={customImages}
        onUpdateImage={handleUpdateImage}
        onResetImages={handleResetImages}
        targetMemoryId={targetMemoryId}
        onCloseTarget={() => setTargetMemoryId(null)}
      />
    </div>
  );
};

export default App;
