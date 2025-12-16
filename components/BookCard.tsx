import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  index: number;
}

export const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">
                추천 {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">{book.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{book.author} 저</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-1">책 소개</h4>
          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            {book.description}
          </p>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-700 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            생활기록부 기재 Tip
          </h4>
          <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg">
            <p className="text-indigo-900 text-sm leading-relaxed font-medium">
              {book.saenggibuTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};