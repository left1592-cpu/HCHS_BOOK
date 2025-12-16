import React, { useState, useCallback } from 'react';
import { CATEGORIES, APP_TITLE, APP_SUBTITLE } from './constants';
import { Category, Book } from './types';
import { CategoryButton } from './components/CategoryButton';
import { BookCard } from './components/BookCard';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { fetchBookRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategorySelect = useCallback(async (category: Category) => {
    if (loading || loadingMore) return;
    if (category === selectedCategory) return;

    setSelectedCategory(category);
    setBooks([]);
    setError(null);
    setLoading(true);

    try {
      const newBooks = await fetchBookRecommendations(category);
      setBooks(newBooks);
    } catch (err) {
      setError("책 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, loading, loadingMore]);

  const handleLoadMore = useCallback(async () => {
    if (!selectedCategory || loading || loadingMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const existingTitles = books.map(b => b.title);
      const moreBooks = await fetchBookRecommendations(selectedCategory, existingTitles);
      setBooks(prev => [...prev, ...moreBooks]);
    } catch (err) {
      setError("추가 책 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoadingMore(false);
    }
  }, [selectedCategory, books, loading, loadingMore]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header with Cheonma Theme */}
      <header className="bg-white border-b border-indigo-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <h1 className="text-2xl font-bold text-indigo-900 tracking-tight flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl filter drop-shadow-md">🦄</span> 
              <span className="flex flex-col">
                <span>{APP_TITLE}</span>
                <span className="text-xs font-normal text-indigo-600 mt-0.5 tracking-wider">HAMCHANG HIGH SCHOOL</span>
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <span>Powered by Gemini AI</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
            <span>Data Sync Active</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Welcome Message */}
          {!selectedCategory && (
            <div className="text-center py-16 px-4">
              <div className="mb-6 inline-block p-4 rounded-full bg-indigo-50 text-indigo-600 animate-bounce-slow">
                <span className="text-5xl">📚</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                함창고등학교 <span className="text-indigo-600">천마인</span>을 위한<br/>
                맞춤형 독서 큐레이션
              </h2>
              <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                생활기록부에 기재할 과목을 선택하세요.<br/>
                국내외 방대한 도서 데이터베이스에서 AI가 엄선한 책을 추천해드립니다.
              </p>
            </div>
          )}

          {/* Category Grid - Adjusted grid for more items */}
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 ${selectedCategory ? 'lg:mb-12' : 'max-w-4xl mx-auto'}`}>
            {CATEGORIES.map((cat) => (
              <CategoryButton
                key={cat.id}
                category={cat}
                isSelected={selectedCategory === cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                disabled={loading || loadingMore}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center mb-6 border border-red-100">
                {error}
              </div>
            )}

            {loading ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center text-indigo-600 mb-8 py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-lg font-medium animate-pulse">전국 도서 데이터베이스 검색 중...</p>
                  <p className="text-sm text-indigo-400 mt-1">교과 연계성을 분석하고 있습니다</p>
                </div>
                <LoadingSkeleton />
              </div>
            ) : (
              selectedCategory && (
                <div className="space-y-8 animate-fade-in-up">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.label} 추천 도서
                      </h2>
                    </div>
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      {books.length}권 검색됨
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {books.map((book, index) => (
                      <BookCard key={`${book.title}-${index}`} book={book} index={index} />
                    ))}
                  </div>
                  
                  {books.length > 0 && (
                    <div className="pt-8 pb-12 flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="group relative flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3.5 px-10 rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto overflow-hidden"
                      >
                         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        {loadingMore ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>데이터 추가 수집 중...</span>
                          </>
                        ) : (
                          <>
                            <span>추가 도서 검색하기</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 text-slate-500 py-10 text-center text-sm">
        <div className="max-w-5xl mx-auto px-4">
          <p className="font-bold text-indigo-900 text-lg mb-2 flex items-center justify-center gap-2">
            <span>🦄</span> Cheonma Books
          </p>
          <p className="mb-4">함창고등학교 학생들의 꿈을 응원합니다.</p>
          <p className="text-xs text-slate-400">© 2024 Hamchang High School & UniRead. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;