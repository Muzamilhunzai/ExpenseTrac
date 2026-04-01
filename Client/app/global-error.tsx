'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="text-center px-8">
          <h2 className="text-2xl font-bold text-[#ff2d78] mb-4">
            System Error Detected
          </h2>
          <p className="text-[#a098b0] mb-6 text-sm">
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-[#ff2d78]/20 border border-[#ff2d78] text-[#ff2d78] rounded-lg text-sm font-bold hover:bg-[#ff2d78] hover:text-black transition-all"
          >
            Restart System
          </button>
        </div>
      </body>
    </html>
  );
}
