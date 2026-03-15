"use client";

import { useState } from "react";

interface LessonImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export function LessonImage({ src, alt, caption }: LessonImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="my-8 mx-auto max-w-2xl">
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
        {imgError ? (
          <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 text-center px-4">{alt}</p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            onError={() => setImgError(true)}
          />
        )}
        {caption && (
          <p className="text-sm text-gray-500 text-center italic px-4 py-3 border-t border-gray-100">
            {caption}
          </p>
        )}
      </div>
    </figure>
  );
}
