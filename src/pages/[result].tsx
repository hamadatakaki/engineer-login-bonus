import { Geist, Geist_Mono } from 'next/font/google';
import { ClipboardCopy } from 'lucide-react';
import { tips } from '@/utils/data';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function ResultPage() {
  const router = useRouter();
  const result = router.query.result as string;

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URLをコピーしました！');
    } catch (err) {
      console.error(err);
      toast.error('コピーに失敗しました');
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button onClick={handleCopy}>
          <div className="flex items-center gap-2 text-xl text-gray-600 bg-gray-100 hover:bg-gray-300 rounded-full px-6 py-2">
            {tips[result]}
            <div className="p-2 rounded-full transition">
              <ClipboardCopy className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </button>
      </main>
      <Toaster position="bottom-center" />
    </div>
  );
}
