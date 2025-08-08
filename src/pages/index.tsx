import { Geist, Geist_Mono } from 'next/font/google';
import { NotebookText } from 'lucide-react';
import { tips } from '@/utils/data';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

function useRandomIndex(obj: Record<string, string>): string | undefined {
  const [index, setIndex] = useState<string>();
  useEffect(() => {
    const keys = Object.keys(obj) as string[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    setIndex(keys[randomIndex]);
  }, [index, obj]);
  return index;
}

export default function IndexPage() {
  const key = useRandomIndex(tips);
  const router = useRouter();

  const handleClick = () => {
    if (key != null) {
      router.push(`/${key}`);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {key != null && (
          <button onClick={handleClick}>
            <div className="flex items-center gap-2 text-xl text-gray-600 bg-gray-100 hover:bg-gray-300 rounded-full px-6 py-2">
              おみくじを引く
              <div className="p-2 rounded-full transition">
                <NotebookText className="w-8 h-8 text-gray-600" />
              </div>
            </div>
          </button>
        )}
      </main>
    </div>
  );
}
