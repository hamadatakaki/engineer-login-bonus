import { Geist, Geist_Mono } from 'next/font/google';
import { ClipboardCopy } from 'lucide-react';
import { tips } from '@/utils/data';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type Props = {
  result: string;
};

export default function ResultPage({ result }: Props) {
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

  const previewTitle = `エンジニア向けのおみくじ（${result}）`;

  return (
    <>
      <Head>
        <title>{tips[result]}</title>

        <meta property="og:title" content={previewTitle} />
        <meta property="og:description" content={tips[result]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
      </Head>

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
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(tips).map(key => ({
    params: { result: key },
  }));
  return {
    paths,
    fallback: false, // それ以外のパラメータは404
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const result = params?.result as string;
  return {
    props: {
      result,
    },
  };
};
