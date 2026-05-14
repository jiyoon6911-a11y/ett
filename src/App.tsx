import React, { useState } from 'react';
import { X, Camera, Check, ChevronRight } from 'lucide-react';

export default function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // If there's any text in title or content, enable the submit button
  const canSubmit = title.trim().length > 0 || content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    
    if (!isAnonymous) {
      setShowConfirmPopup(true);
    } else {
      // 익명 작성 시 바로 완료 처리 (추후 서버 연동 등)
      alert('익명으로 게시물이 등록되었습니다.');
      // 초기화 로직 등
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    alert('실명으로 게시물이 등록되었습니다.');
    // 초기화 로직 등
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#111111] text-[#E0E0E0] font-sans mx-auto max-w-md w-full relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0 bg-[#111111] z-10">
        <button className="p-1 -ml-1 text-[#E0E0E0]">
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>
        <span className="text-[16px] font-bold text-[#E0E0E0]">글 쓰기</span>
        <button 
          className={`px-1 -mr-1 text-[15px] font-bold ${canSubmit ? 'text-[#c62917]' : 'text-[#555555]'}`}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          완료
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto w-full pb-6 scrollbar-hide">
        <div className="px-5 pt-5 pb-4 flex-shrink-0">
          <input
            type="text"
            className="w-full bg-transparent text-[22px] font-bold tracking-tight text-white placeholder-[#555555] outline-none"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="px-5 flex-shrink-0">
          <div className="h-[1px] bg-[#2A2A2A] w-full" />
        </div>

        <div className="px-5 py-5 flex-1 flex flex-col relative min-h-[min-content]">
          <textarea
            className="w-full bg-transparent text-[16px] leading-[1.5] tracking-tight text-white placeholder-[#555555] outline-none resize-none flex-shrink-0 min-h-[140px]"
            placeholder="학교 친구들과 자유롭게 얘기해보세요.&#13;&#10;#수강신청 #취업"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Guidelines Section */}
          <div className="mt-8">
             <div className="flex justify-end mb-5">
               <button className="flex items-center text-[12px] font-semibold tracking-tight bg-[#222222] text-[#A0A0A0] px-3 py-1.5 rounded-full transition-colors active:bg-[#333333]">
                 커뮤니티 이용규칙 전체 보기
                 <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-[#888888] stroke-[2.5]" />
               </button>
             </div>
             
             <div className="text-[14px] leading-[1.65] text-[#858585] space-y-6 tracking-tight break-keep">
                <p>
                  에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.
                </p>
                
                <p>
                  아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.
                </p>

                <div className="space-y-1 text-[#858585]">
                  <p>※ 정치·사회 관련 행위 금지</p>
                  <p className="pl-1">- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위</p>
                  <p className="pl-1">- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위</p>
                  <p className="pl-1">- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위</p>
                  <p className="pl-1">- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위</p>
                  <p className="pl-1">* 해당 게시물은 시사·이슈 게시판에만 작성 가능합니다.</p>
                </div>

                <div className="space-y-1 text-[#858585]">
                  <p>※ 홍보 및 판매 관련 행위 금지</p>
                  <p className="pl-1">- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위</p>
                  <p className="pl-1">- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및</p>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="flex items-center justify-between px-5 py-3.5 bg-[#111111] shrink-0 sticky bottom-0 z-10 pb-[env(safe-area-inset-bottom,14px)]">
        <div className="flex items-center space-x-4">
          <button className="text-[#E0E0E0] p-1 -ml-1">
            <Camera className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <button className="text-[#E0E0E0] p-1 flex items-center justify-center relative">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Box overlapping icon with check */}
              <rect x="4" y="8" width="12" height="12" rx="2" />
              <path d="M8 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
              <path d="M7 14l2 2 4-4" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-[14px]">
          <label className="flex items-center space-x-1.5 cursor-pointer select-none">
            <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center border ${isQuestion ? 'bg-[#c62917] border-[#c62917]' : 'border-[#555555] bg-transparent'}`}>
              {isQuestion && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className={isQuestion ? 'text-[#c62917] font-bold tracking-tight' : 'text-[#888888] font-medium tracking-tight'}>질문</span>
            <input type="checkbox" className="hidden" checked={isQuestion} onChange={(e) => setIsQuestion(e.target.checked)} />
          </label>
          
          <label className="flex items-center space-x-1.5 cursor-pointer select-none">
            <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center border ${isAnonymous ? 'bg-[#c62917] border-[#c62917]' : 'border-[#555555] bg-transparent'}`}>
              {isAnonymous && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className={isAnonymous ? 'text-[#c62917] font-bold tracking-tight' : 'text-[#888888] font-medium tracking-tight'}>익명</span>
            <input type="checkbox" className="hidden" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
          </label>
        </div>
      </footer>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="bg-[#1c1c1c] w-[280px] rounded-[14px] overflow-hidden flex flex-col shadow-2xl">
            <div className="pt-6 pb-5 px-4 text-center">
              <p className="text-[16px] font-bold text-[#E0E0E0] mb-2">익명이 아닙니다</p>
              <p className="text-[13px] font-medium text-[#A0A0A0] leading-snug break-keep">
                익명 선택이 해제되어 있습니다.<br />
                이대로 글을 작성하시겠습니까?
              </p>
            </div>
            <div className="flex border-t border-[#333333]">
              <button 
                className="flex-1 py-3.5 text-[15px] text-[#A0A0A0] font-medium border-r border-[#333333] active:bg-[#2A2A2A] transition-colors"
                onClick={() => setShowConfirmPopup(false)}
              >
                취소
              </button>
              <button 
                className="flex-1 py-3.5 text-[15px] text-[#c62917] font-bold active:bg-[#2A2A2A] transition-colors"
                onClick={handleConfirmSubmit}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
