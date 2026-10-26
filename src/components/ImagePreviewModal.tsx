import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Upload, RefreshCw, Heart, Clock, Copy, Check } from 'lucide-react';
import { siteContent } from '../content';

interface ImageSlot {
  sceneId: number;
  sceneTitle: string;
  photoPath: string;
  label: string;
}

interface ImagePreviewModalProps {
  customImages: Record<string, string>;
  onUpdateImage: (photoPath: string, base64Url: string) => void;
  onResetImages: () => void;
  targetPhotoPath?: string | null;
  onCloseTarget?: () => void;
  snoAnswer?: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  customImages,
  onUpdateImage,
  onResetImages,
  targetPhotoPath,
  onCloseTarget,
  snoAnswer = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'answer'>('photos');
  const [copied, setCopied] = useState<boolean>(false);
  const [storedAnswer, setStoredAnswer] = useState<string>(snoAnswer);
  const [storedTime, setStoredTime] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>('/images/photo-1.jpg');

  // Build the full 8-photo slot list from siteContent.memories
  const imageSlots: ImageSlot[] = [];
  siteContent.memories.forEach((m) => {
    const list = m.images || [m.image || '/images/photo-1.jpg'];
    list.forEach((p, idx) => {
      imageSlots.push({
        sceneId: m.id,
        sceneTitle: m.title,
        photoPath: p,
        label: list.length > 1 ? `รูปที่ ${idx + 1}/3` : 'รูปเดี่ยว',
      });
    });
  });

  // Sync answer from localStorage whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const ans = localStorage.getItem('sno_surprise_answer') || snoAnswer;
      const time = localStorage.getItem('sno_answer_time') || '';
      setStoredAnswer(ans);
      setStoredTime(time ? new Date(time).toLocaleTimeString('th-TH') : '');
    }
  }, [isOpen, snoAnswer]);

  // If a specific memory photo was clicked on the page, open modal directly for that photo
  useEffect(() => {
    if (targetPhotoPath) {
      setSelectedPath(targetPhotoPath);
      setActiveTab('photos');
      setIsOpen(true);
    }
  }, [targetPhotoPath]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateImage(selectedPath, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSelectSlotAndUpload = (path: string) => {
    setSelectedPath(path);
    fileInputRef.current?.click();
  };

  const handleCopyAnswer = () => {
    if (!storedAnswer) return;
    navigator.clipboard.writeText(storedAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseTarget?.();
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Floating Trigger Button (Discreet for Blue at bottom-left) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-scrapbook-brown-dark border border-[#ded2c3] shadow-md hover:shadow-lg font-cute text-xs transition-all hover:scale-105 backdrop-blur-xs group"
          title="เมนูตั้งค่าและแอบดูคำตอบของสโน"
        >
          <Camera size={13} className="text-scrapbook-pink-500 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">เมนูลับของบลู ♡</span>
          <span className="sm:hidden">เมนูบลู</span>
          {storedAnswer && (
            <span className="w-2 h-2 rounded-full bg-scrapbook-pink-500 animate-ping" />
          )}
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#fffdfa] rounded-3xl border-2 border-[#eddcd0] p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f0e4d7]">
              <div>
                <h3 className="font-cute text-base font-bold text-scrapbook-brown-dark">
                  เมนูลับสำหรับบลู (Blue's Secret Menu)
                </h3>
                <p className="font-body text-xs text-scrapbook-brown-light">
                  จัดการรูปภาพพรีวิว (8 ช่อง) และแอบอ่านคำตอบที่สโนพิมพ์
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full text-scrapbook-brown-light hover:text-scrapbook-brown hover:bg-[#f7efe6] flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 my-3 border-b border-[#f0e4d7] pb-2 font-cute text-xs">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  activeTab === 'photos'
                    ? 'bg-scrapbook-pink-400 text-white font-bold shadow-xs'
                    : 'text-scrapbook-brown hover:bg-[#faf4ea]'
                }`}
              >
                <Camera size={13} />
                <span>ลองจัดรูปภาพ ({imageSlots.length} รูป)</span>
              </button>

              <button
                onClick={() => setActiveTab('answer')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 relative ${
                  activeTab === 'answer'
                    ? 'bg-scrapbook-pink-400 text-white font-bold shadow-xs'
                    : 'text-scrapbook-brown hover:bg-[#faf4ea]'
                }`}
              >
                <Heart size={13} className="fill-current" />
                <span>แอบดูคำตอบของสโน 💌</span>
                {storedAnswer && (
                  <span className="w-2 h-2 rounded-full bg-scrapbook-pink-500 absolute -top-0.5 -right-0.5" />
                )}
              </button>
            </div>

            {/* TAB 1: Photos Preview */}
            {activeTab === 'photos' && (
              <div className="space-y-2.5 py-1">
                {imageSlots.map((slot) => {
                  const hasCustom = !!customImages[slot.photoPath];

                  return (
                    <div
                      key={slot.photoPath}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf5ed] border border-[#eee2d4]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-white border border-[#e8ded0] overflow-hidden flex items-center justify-center flex-shrink-0">
                          {hasCustom ? (
                            <img
                              src={customImages[slot.photoPath]}
                              alt={slot.photoPath}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-base">📸</span>
                          )}
                        </div>
                        <div>
                          <div className="font-cute text-xs sm:text-sm font-semibold text-scrapbook-brown-dark">
                            ฉาก {slot.sceneId}: {slot.label}
                          </div>
                          <div className="font-body text-[11px] text-scrapbook-brown-light">
                            ชื่อไฟล์: <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">{slot.photoPath}</code>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectSlotAndUpload(slot.photoPath)}
                        className="px-3 py-1 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-xs font-semibold shadow-xs flex items-center gap-1 transition-all"
                      >
                        <Upload size={11} />
                        <span>{hasCustom ? 'เปลี่ยน' : 'ลองใส่'}</span>
                      </button>
                    </div>
                  );
                })}

                <div className="bg-[#fff3f5] p-3 rounded-xl border border-scrapbook-pink-200 text-xs font-body text-scrapbook-brown leading-relaxed mt-2">
                  💡 <span className="font-bold">วิธีใส่รูปจริงในโปรเจกต์:</span> นำรูปมาวางในโฟลเดอร์ <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">public/images/</code> โดยตั้งชื่อตามนี้:
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                    <li>ฉาก 1: <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-1.jpg</code> (1 รูป)</li>
                    <li>ฉาก 2: <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-2-1.jpg, photo-2-2.jpg, photo-2-3.jpg</code> (3 รูป)</li>
                    <li>ฉาก 3: <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-3-1.jpg, photo-3-2.jpg, photo-3-3.jpg</code> (3 รูป)</li>
                    <li>ฉาก 4: <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-4.jpg</code> (1 รูป)</li>
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={onResetImages}
                    className="font-cute text-xs text-scrapbook-brown-light hover:text-scrapbook-pink-600 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={12} />
                    <span>ล้างรูปที่ลองใส่ทั้งหมด</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-5 py-1.5 rounded-full bg-scrapbook-brown-dark text-white font-cute text-xs font-semibold"
                  >
                    ปิดหน้าต่าง
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Sno's Answer */}
            {activeTab === 'answer' && (
              <div className="py-2 space-y-3">
                {storedAnswer ? (
                  <div className="bg-[#fff5f7] p-4 rounded-2xl border-2 border-scrapbook-pink-300 space-y-3 shadow-soft">
                    <div className="flex items-center justify-between text-xs font-cute text-scrapbook-brown-light">
                      <span className="font-bold text-scrapbook-pink-600">คำตอบที่สโนพิมพ์ตอบ:</span>
                      {storedTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          <span>บันทึกเมื่อ {storedTime}</span>
                        </span>
                      )}
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-scrapbook-pink-100 font-body text-base text-scrapbook-brown-dark leading-relaxed">
                      “{storedAnswer}”
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={handleCopyAnswer}
                        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-scrapbook-pink-50 text-scrapbook-pink-600 border border-scrapbook-pink-200 font-cute text-xs flex items-center gap-1 transition-all"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copied ? 'คัดลอกแล้ว ♡' : 'คัดลอกข้อความ'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-[#faf5ed] rounded-2xl border border-dashed border-[#e6d7c3] space-y-2">
                    <span className="text-3xl">💌</span>
                    <p className="font-cute text-sm text-scrapbook-brown-dark font-semibold">
                      ยังไม่มีคำตอบที่สโนพิมพ์
                    </p>
                    <p className="font-body text-xs text-scrapbook-brown-light max-w-xs mx-auto">
                      เมื่อสโนเปิดอ่านถึงฉากคำถามแล้วพิมพ์ตอบ ข้อความจะมาแสดงตรงนี้โดยอัตโนมัติครับ ♡
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleClose}
                    className="px-5 py-1.5 rounded-full bg-scrapbook-brown-dark text-white font-cute text-xs font-semibold"
                  >
                    ปิดหน้าต่าง
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
