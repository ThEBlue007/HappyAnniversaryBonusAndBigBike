import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from './content';
import { StoryNavigation } from './components/StoryNavigation';
import { SceneOpening } from './components/SceneOpening';
import { SceneMemory } from './components/SceneMemory';
import { SceneQuestion } from './components/SceneQuestion';
import { SceneIntermission } from './components/SceneIntermission';
import { SceneFinalLetter } from './components/SceneFinalLetter';
import { SceneFinalReveal } from './components/SceneFinalReveal';
import { SceneFinalScreen } from './components/SceneFinalScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { PasswordGate } from './components/PasswordGate';

export const App: React.FC = () => {
  // ── Password Gate (หน้าแรกสุดเสมอ) ──────────────────────────────────────────
  // เริ่มต้นที่หน้าใส่รหัสผ่าน 51168 เป็นด่านแรกสุดก่อนเข้าสู่เรื่องราว
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // เคลียร์ค่าค้างเก่าใน sessionStorage เพื่อให้แสดงหน้าใส่รหัสผ่านทุกครั้งที่เปิด/รีเฟรช
  useEffect(() => {
    sessionStorage.removeItem('sno_gate_unlocked');
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  // ── Story state ─────────────────────────────────────────────────────────────
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [snoAnswer, setSnoAnswer] = useState<string>(() => {
    return localStorage.getItem('sno_surprise_answer') || '';
  });

  // Touch gesture state for mobile swipe
  const touchStartXRef = useRef<number | null>(null);

  const memories = siteContent.memories;
  // 1 Opening + 4 Memories + 1 Question + 1 Intermission + 1 Final Letter + 1 Final Reveal = 10 total scenes (ending at Final Screen)
  const totalScenes = 1 + memories.length + 5; 

  const goToNextScene = () => {
    if (currentScene < totalScenes - 1) {
      setDirection(1);
      setCurrentScene((prev) => prev + 1);
    }
  };

  const goToPrevScene = () => {
    if (currentScene > 0) {
      setDirection(-1);
      setCurrentScene((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setDirection(-1);
    setCurrentScene(0);
    setIsUnlocked(false);
  };

  // Sync browser tab title and meta description dynamically
  useEffect(() => {
    if (siteContent.meta?.title) {
      document.title = siteContent.meta.title;
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && siteContent.meta?.title) {
      ogTitle.setAttribute('content', siteContent.meta.title);
    }
    const metaDesc = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
    if (metaDesc && siteContent.meta?.description) {
      metaDesc.setAttribute('content', siteContent.meta.description);
    }
  }, []);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextScene();
      } else if (e.key === 'ArrowLeft') {
        goToPrevScene();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    // Minimum swipe threshold of 60px
    if (deltaX < -60) {
      goToNextScene();
    } else if (deltaX > 60) {
      goToPrevScene();
    }
  };

  // Scene animation variants
  const sceneVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.42,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.32,
        ease: 'easeIn' as const,
      },
    }),
  };

  // Render current scene
  const renderSceneContent = () => {
    // Scene 0: Opening
    if (currentScene === 0) {
      return <SceneOpening onNext={goToNextScene} />;
    }

    // Scenes 1 to 4: Memories 1 to 4
    if (currentScene >= 1 && currentScene <= memories.length) {
      const memoryIndex = currentScene - 1;
      const item = memories[memoryIndex];

      return (
        <SceneMemory
          item={item}
          onNext={goToNextScene}
        />
      );
    }

    // Scene 5: Question for Sno (Write-in question)
    if (currentScene === memories.length + 1) {
      return (
        <SceneQuestion
          savedAnswer={snoAnswer}
          onSaveAnswer={(ans) => setSnoAnswer(ans)}
          onNext={goToNextScene}
        />
      );
    }

    // Scene 6: A Little Note Before the End
    if (currentScene === memories.length + 2) {
      return <SceneIntermission onNext={goToNextScene} />;
    }

    // Scene 7: Final Letter
    if (currentScene === memories.length + 3) {
      return <SceneFinalLetter onNext={goToNextScene} />;
    }

    // Scene 8: Final Reveal (Cake in Car Drawer Clue)
    if (currentScene === memories.length + 4) {
      return <SceneFinalReveal onNext={goToNextScene} />;
    }

    // Scene 9: Final Closing Screen
    return <SceneFinalScreen onRestart={handleRestart} />;
  };

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked ? (
        <PasswordGate key="gate" onUnlock={handleUnlock} />
      ) : (
    <div
      key="story"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-scrapbook-pattern select-none"
    >
      {/* Top Story Navigation (Back button & Heart progress) */}
      <StoryNavigation
        currentScene={currentScene}
        totalScenes={totalScenes}
        onPrevScene={goToPrevScene}
        canGoBack={currentScene > 0}
      />

      {/* Main Full-Screen Cinematic Story Scene Container */}
      <main className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center pt-10 pb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center"
          >
            {renderSceneContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Scrapbook Music Player */}
      <MusicPlayer />
    </div>
      )}
    </AnimatePresence>
  );
};

export default App;
