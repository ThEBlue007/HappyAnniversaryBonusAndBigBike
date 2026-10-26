import React, { useRef, useState } from 'react';
import { Camera, X, Upload, RefreshCw } from 'lucide-react';
import { siteContent } from '../content';

interface ImagePreviewModalProps {
  customImages: Record<number, string>;
  onUpdateImage: (memoryId: number, base64Url: string) => void;
  onResetImages: () => void;
  targetMemoryId?: number | null;
  onCloseTarget?: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  customImages,
  onUpdateImage,
  onResetImages,
  targetMemoryId,
  onCloseTarget,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number>(1);

  const memories = siteContent.memories;

  // If a specific memory photo was clicked on the page, open modal directly for that slot
  React.useEffect(() => {
    if (targetMemoryId) {
      setSelectedSlot(targetMemoryId);
      setIsOpen(true);
    }
  }, [targetMemoryId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateImage(selectedSlot, reader.result);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  const handleSelectSlotAndUpload = (id: number) => {
    setSelectedSlot(id);
    fileInputRef.current?.click();
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

      {/* Floating Trigger Button (Subtle & discreet for Blue) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-scrapbook-brown-dark border border-[#ded2c3] shadow-md hover:shadow-lg font-cute text-xs transition-all hover:scale-105 backdrop-blur-xs group"
          title="โหมดลองใส่รูปภาพชั่วคราวเพื่อดูหน้าตาเว็บ"
        >
          <Camera size={14} className="text-scrapbook-pink-500 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">โหมดลองจัดรูปภาพ ♡</span>
          <span className="sm:hidden">ลองจัดรูป</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#fffdfa] rounded-3xl border-2 border-[#eddcd0] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f0e4d7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-scrapbook-pink-100 flex items-center justify-center text-scrapbook-pink-500">
                  <Camera size={16} />
                </div>
                <div>
                  <h3 className="font-cute text-base font-bold text-scrapbook-brown-dark">
                    โหมดลองใส่รูปภาพ (Photo Preview)
                  </h3>
                  <p className="font-body text-xs text-scrapbook-brown-light">
                    ลองเลือกรูปจากเครื่องเพื่อดูหน้าตาโพลารอยด์ได้ทันที
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full text-scrapbook-brown-light hover:text-scrapbook-brown hover:bg-[#f7efe6] flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Slots List */}
            <div className="py-4 space-y-3">
              {memories.map((m) => {
                const hasCustom = !!customImages[m.id];

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#faf5ed] border border-[#eee2d4] hover:border-scrapbook-pink-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#e8ded0] overflow-hidden flex items-center justify-center flex-shrink-0">
                        {hasCustom ? (
                          <img
                            src={customImages[m.id]}
                            alt={`Preview ${m.id}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg">📸</span>
                        )}
                      </div>
                      <div>
                        <div className="font-cute text-sm font-semibold text-scrapbook-brown-dark">
                          รูปที่ {m.id}: {m.title}
                        </div>
                        <div className="font-body text-xs text-scrapbook-brown-light">
                          ไฟล์จริง: <code className="text-[11px] bg-white px-1 rounded text-scrapbook-pink-600">{m.image}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectSlotAndUpload(m.id)}
                        className="px-3 py-1.5 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-xs font-semibold shadow-xs flex items-center gap-1 transition-all"
                      >
                        <Upload size={12} />
                        <span>{hasCustom ? 'เปลี่ยน' : 'ลองใส่'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note & Action Footer */}
            <div className="pt-3 border-t border-[#f0e4d7] space-y-3">
              <div className="bg-[#fff3f5] p-3 rounded-xl border border-scrapbook-pink-200 text-xs font-body text-scrapbook-brown leading-relaxed">
                💡 <span className="font-bold">คำแนะนำสำหรับบลู:</span> โหมดนี้ใช้ลองพรีวิวรูปบนหน้าจอชั่วคราว หากต้องการใส่รูปถาวรสำหรับส่งให้สโนเปิดอ่าน แค่นำไฟล์รูปมาวางไว้ที่โฟลเดอร์ <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">public/images/</code> โดยตั้งชื่อว่า <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-1.jpg</code> ถึง <code className="bg-white px-1 rounded text-scrapbook-pink-600 font-bold">photo-6.jpg</code> ได้เลยครับ
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={onResetImages}
                  className="font-cute text-xs text-scrapbook-brown-light hover:text-scrapbook-pink-600 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} />
                  <span>ล้างรูปที่ลองใส่ทั้งหมด</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full bg-scrapbook-brown-dark text-white font-cute text-xs font-semibold shadow-xs hover:bg-scrapbook-brown transition-colors"
                >
                  เรียบร้อย
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
