import React, { useState } from 'react';
import { X, Camera, Check, ChevronRight, Search, MoreVertical, ChevronLeft, Pencil, MessageCircle, ThumbsUp, MessageSquare, Bookmark, Send, Bell } from 'lucide-react';

export interface Comment {
  id: number;
  content: string;
  author: string;
  timeago: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  timeago: string;
  author: string;
  commentCount: number;
  likeCount: number;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: '런닝',
    content: '점심에 햇빛 맞으면서 같이 런닝 뛸 사람 구해봅니당',
    timeago: '11분 전',
    author: '익명',
    commentCount: 0,
    likeCount: 0,
    comments: []
  },
  {
    id: 2,
    title: '알바비 해외계좌로 받고 싶은데',
    content: '낼이 급여일이어서 해외계좌로 받고 싶은데 사장님한테 해외송금 해달라고 말씀드리면 될까?...',
    timeago: '17분 전',
    author: '익명',
    commentCount: 9,
    likeCount: 0,
    comments: [
      { id: 1, content: '사장님한테 여쭤봐', author: '익명', timeago: '10분 전' }
    ]
  },
  {
    id: 3,
    title: '4관 조리실',
    content: '수세미 바꿔주세요ㅠㅠ제발',
    timeago: '23분 전',
    author: '익명',
    commentCount: 1,
    likeCount: 0,
    comments: [
      { id: 1, content: '동감합니다', author: '익명', timeago: '20분 전' }
    ]
  },
  {
    id: 4,
    title: 'MT에 돈 얼마정도 갖고가야?',
    content: '이미 비용은 냈는데',
    timeago: '23분 전',
    author: '익명',
    commentCount: 0,
    likeCount: 0,
    comments: []
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'board' | 'write' | 'post'>('board');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (post: { title: string, content: string, isAnonymous: boolean, isQuestion: boolean }) => {
    const newPost: Post = {
      id: Date.now(),
      title: post.title || post.content.substring(0, 10),
      content: post.content,
      timeago: '방금',
      author: post.isAnonymous ? '익명' : '지윤',
      commentCount: 0,
      likeCount: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setCurrentView('board');
  };

  const handleAddComment = (postId: number, content: string, isAnonymous: boolean) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentCount: post.commentCount + 1,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              content,
              author: isAnonymous ? '익명' : '지윤',
              timeago: '방금',
            }
          ]
        };
      }
      return post;
    }));
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#111111] text-[#E0E0E0] font-sans mx-auto max-w-md w-full relative overflow-hidden">
      {currentView === 'board' ? (
        <BoardView 
          onWriteClick={() => setCurrentView('write')} 
          onPostClick={(id) => { setSelectedPostId(id); setCurrentView('post'); }}
          posts={posts} 
        />
      ) : currentView === 'write' ? (
        <WriteView onClose={() => setCurrentView('board')} onSubmit={handleAddPost} />
      ) : selectedPost ? (
        <PostDetailView 
          post={selectedPost} 
          onClose={() => setCurrentView('board')} 
          onAddComment={handleAddComment} 
        />
      ) : null}
    </div>
  );
}

function BoardView({ onWriteClick, onPostClick, posts }: { onWriteClick: () => void, onPostClick: (id: number) => void, posts: Post[] }) {
  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-2.5 shrink-0 bg-[#111111] border-b border-[#2A2A2A] z-10 sticky top-0">
        <button className="p-1 text-[#E0E0E0]">
          <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-bold text-[#E0E0E0] leading-tight">자유게시판</span>
          <span className="text-[11px] font-medium text-[#888888] leading-tight mt-0.5">한림대</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1.5 text-[#E0E0E0]">
            <Search className="w-5 h-5" strokeWidth={2} />
          </button>
          <button className="p-1.5 text-[#E0E0E0]">
            <MoreVertical className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-[100px] scrollbar-hide">
        {/* Ad Section */}
        <div className="px-4 py-3 border-b border-[#2A2A2A]">
          <div className="bg-[#EBEBEB] rounded-[16px] p-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-col items-start pr-4">
              <div className="flex items-center space-x-1 mb-1">
                <span className="bg-[#D0D0D0] text-[#666666] text-[9px] font-bold px-1 rounded-sm">광고</span>
                <span className="text-[11px] text-[#A0A0A0] font-medium">가입</span>
              </div>
              <p className="text-[15px] font-extrabold text-[#111111] leading-tight tracking-tight mb-1">바비톡 - 1등 성형/시술 정보 앱</p>
              <p className="text-[12px] text-[#888888] tracking-tight line-clamp-1 break-all">여름에 매끈하려면 지금이 제모 타이밍! 바비톡 최저...</p>
            </div>
            <div className="w-12 h-12 bg-[#8C52FF] rounded-[12px] shrink-0 flex items-center justify-center">
              {/* placeholder icon */}
              <div className="w-6 h-6 bg-white rounded-full opacity-80 mix-blend-screen" />
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="px-4 pt-3 pb-4 border-b border-[#2A2A2A]">
          <div className="flex space-x-2.5 overflow-x-auto scrollbar-hide">
            <div className="w-16 shrink-0 flex flex-col items-center justify-center pb-2 pt-1">
              <div className="w-[34px] h-[34px] rounded-full bg-[#1A2222] flex items-center justify-center mb-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                <span className="text-[#33B6A7] font-extrabold text-[15px]">?</span>
              </div>
              <span className="text-[11px] text-[#D0D0D0] font-bold">질문글</span>
            </div>
            
            <div className="bg-[#121B1C] rounded-[12px] p-3 flex-1 min-w-[150px] shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-[#1A2526]">
              <h4 className="text-[14px] font-bold text-[#D0D0D0] mb-1 tracking-tight">맥날 같이 시키실 분</h4>
              <p className="text-[12px] text-[#667777] truncate tracking-tight">맥날 시키실 분....</p>
            </div>

            <div className="bg-[#121B1C] rounded-[12px] p-3 flex-1 min-w-[150px] shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-[#1A2526]">
              <h4 className="text-[14px] font-bold text-[#D0D0D0] mb-1 tracking-tight">교수님이 출석부를 때</h4>
              <p className="text-[12px] text-[#667777] truncate tracking-tight">화면에 출석부 띄어두시고 하...</p>
            </div>
          </div>
        </div>

        {/* Hot Post Section */}
        <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center">
          <div className="w-5 h-5 rounded-full bg-[#3D2020] flex items-center justify-center mr-3 shrink-0">
             <span className="text-[#E7483B] text-[11px]">🔥</span>
          </div>
          <p className="text-[13px] font-bold text-[#C0C0C0] flex-1 truncate tracking-tight">
             🏈미식축구 동아리 PHOENIX 신입부원...
          </p>
          <span className="text-[#E7483B] text-[13px] flex items-center ml-2 shrink-0">
            <ThumbsUp className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
            12
          </span>
        </div>

        {/* Posts List */}
        <div className="flex flex-col">
          {posts.map(post => (
            <div key={post.id} onClick={() => onPostClick(post.id)} className="p-4 border-b border-[#2A2A2A] active:bg-[#1a1a1a] transition-colors cursor-pointer">
              <h3 className="text-[15px] font-bold text-[#E0E0E0] mb-1.5 leading-snug tracking-tight">{post.title}</h3>
              {post.content && (
                <p className="text-[13px] text-[#888888] leading-snug mb-2 line-clamp-2 tracking-tight">{post.content}</p>
              )}
              <div className="flex items-center text-[11px] text-[#777777]">
                {post.commentCount > 0 && (
                  <span className="flex items-center text-[#33B6A7] mr-2">
                    <MessageCircle className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
                    {post.commentCount}
                  </span>
                )}
                <span>{post.timeago}</span>
                <span className="mx-1.5">|</span>
                <span>{post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Write FAB */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={onWriteClick}
          className="flex items-center space-x-1.5 bg-[#2F2F2F] border border-[#3A3A3A] text-white px-[18px] py-[10px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-95 transition-all"
        >
          <Pencil className="w-[18px] h-[18px] text-[#E7483B]" strokeWidth={2.5} />
          <span className="text-[15px] font-bold tracking-tight">글쓰기</span>
        </button>
      </div>
    </div>
  );
}

function WriteView({ onClose, onSubmit }: { onClose: () => void, onSubmit: (post: {title: string, content: string, isAnonymous: boolean, isQuestion: boolean}) => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isQuestion, setIsQuestion] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showAnonymousWarning, setShowAnonymousWarning] = useState(false);
  const [dontShowThisAgain, setDontShowThisAgain] = useState(false);

  const canSubmit = title.trim().length > 0 || content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (!isAnonymous) {
      setShowConfirmPopup(true);
    } else {
      const hideWarning = localStorage.getItem('hideAnonymousWarning') === 'true';
      if (!hideWarning) {
        setShowAnonymousWarning(true);
      } else {
        onSubmit({ title, content, isAnonymous, isQuestion });
      }
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    onSubmit({ title, content, isAnonymous, isQuestion });
  };

  const handleAnonymousWarningSubmit = () => {
    if (dontShowThisAgain) {
      localStorage.setItem('hideAnonymousWarning', 'true');
    }
    setShowAnonymousWarning(false);
    onSubmit({ title, content, isAnonymous, isQuestion });
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] z-30 fixed inset-0 max-w-md mx-auto w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 shrink-0 bg-[#111111] z-10 border-b border-[#2A2A2A]">
        <button className="p-1 -ml-1 text-[#E0E0E0]" onClick={onClose}>
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
                <p>에브리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.</p>
                <p>아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.</p>
                <div className="space-y-1 text-[#858585]">
                  <p>※ 정치·사회 관련 행위 금지</p>
                  <p className="pl-1">- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위</p>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="flex items-center justify-between px-5 py-3.5 bg-[#111111] shrink-0 sticky bottom-0 z-10 pb-[env(safe-area-inset-bottom,14px)] border-t border-[#2A2A2A]">
        <div className="flex items-center space-x-4">
          <button className="text-[#E0E0E0] p-1 -ml-1">
            <Camera className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <button className="text-[#E0E0E0] p-1 flex items-center justify-center relative">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        <ConfirmPopup 
          type="post"
          onCancel={() => setShowConfirmPopup(false)} 
          onConfirm={handleConfirmSubmit} 
        />
      )}

      {/* Anonymous Warning Popup */}
      {showAnonymousWarning && (
        <AnonymousWarningPopup 
          type="post"
          dontShowThisAgain={dontShowThisAgain}
          setDontShowThisAgain={setDontShowThisAgain}
          onCancel={() => setShowAnonymousWarning(false)}
          onConfirm={handleAnonymousWarningSubmit}
        />
      )}
    </div>
  );
}

function PostDetailView({ post, onClose, onAddComment }: { post: Post, onClose: () => void, onAddComment: (postId: number, comment: string, isAnonymous: boolean) => void }) {
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showAnonymousWarning, setShowAnonymousWarning] = useState(false);
  const [dontShowThisAgain, setDontShowThisAgain] = useState(false);

  const canSubmit = commentText.trim().length > 0;

  const handleSubmitClick = () => {
    if (!canSubmit) return;
    if (!isAnonymous) {
      setShowConfirmPopup(true);
    } else {
      const hideWarning = localStorage.getItem('hideAnonymousWarning') === 'true';
      if (!hideWarning) {
        setShowAnonymousWarning(true);
      } else {
        submitComment();
      }
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    submitComment();
  };

  const handleAnonymousWarningSubmit = () => {
    if (dontShowThisAgain) {
      localStorage.setItem('hideAnonymousWarning', 'true');
    }
    setShowAnonymousWarning(false);
    submitComment();
  };

  const submitComment = () => {
    onAddComment(post.id, commentText, isAnonymous);
    setCommentText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#111111] z-30 fixed inset-0 max-w-md mx-auto w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-2.5 shrink-0 bg-[#111111] border-b border-[#2A2A2A] z-10">
        <button className="p-1 text-[#E0E0E0]" onClick={onClose}>
          <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-bold text-[#E0E0E0] leading-tight">자유게시판</span>
          <span className="text-[11px] font-medium text-[#888888] leading-tight mt-0.5">한림대</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1.5 text-[#888888]">
            <Bell className="w-5 h-5" strokeWidth={2} />
          </button>
          <button className="p-1.5 text-[#888888]">
            <MoreVertical className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto w-full pb-[80px] scrollbar-hide flex flex-col">
        {/* Post Content */}
        <div className="px-4 pt-4 pb-0">
          <h1 className="text-[20px] font-bold text-[#E0E0E0] mb-2">{post.title}</h1>
          <p className="text-[15px] text-[#A0A0A0] leading-[1.6] whitespace-pre-wrap mb-4">{post.content}</p>
          <div className="flex items-center justify-between text-[12px] text-[#888888] mb-4">
            <div className="flex items-center">
               <div className="w-6 h-6 bg-[#333333] rounded overflow-hidden mr-2 flex items-center justify-center">
                 <span className="text-[10px]">익</span>
               </div>
               <span className="font-bold mr-2">{post.author}</span>
               <span>{post.timeago}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-around border-t border-b border-[#2A2A2A] py-1.5 bg-[#141414]">
          <button className="flex items-center space-x-1.5 px-4 py-2 text-[#888888] active:text-[#A0A0A0] transition-colors">
            <ThumbsUp className="w-4 h-4" strokeWidth={2} />
            <span className="text-[13px] font-medium">공감</span>
          </button>
          <button className="flex items-center space-x-1.5 px-4 py-2 text-[#888888] active:text-[#A0A0A0] transition-colors">
            <MessageSquare className="w-4 h-4" strokeWidth={2} />
            <span className="text-[13px] font-medium">댓글</span>
          </button>
          <button className="flex items-center space-x-1.5 px-4 py-2 text-[#888888] active:text-[#A0A0A0] transition-colors">
            <Bookmark className="w-4 h-4" strokeWidth={2} />
            <span className="text-[13px] font-medium">스크랩</span>
          </button>
        </div>

        {/* Ad Section */}
        <div className="bg-[#EBEBEB] p-4 flex items-center justify-between">
          <div className="flex flex-col items-start pr-4">
            <div className="flex items-center space-x-1 mb-1">
              <span className="bg-[#D0D0D0] text-[#666666] text-[9px] font-bold px-1 rounded-sm">광고</span>
              <span className="text-[11px] text-[#A0A0A0] font-medium">확인 해봐</span>
            </div>
            <p className="text-[15px] font-extrabold text-[#111111] leading-tight tracking-tight mb-1">바비톡 - 1등 성형/시술 정보 앱</p>
            <p className="text-[12px] text-[#888888] tracking-tight line-clamp-1 break-all">바비톡 턱보톡스 리얼 후기로 나는 효과 볼 수 있는...</p>
          </div>
          <div className="w-12 h-12 bg-[#8C52FF] rounded-[12px] shrink-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full opacity-80 mix-blend-screen" />
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex-1 flex flex-col">
          {post.comments.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#555555] opacity-80 mt-16 mb-8">
              <MessageSquare className="w-12 h-12 mb-3 stroke-[1.5]" />
              <span className="text-[15px] font-medium tracking-tight">첫 댓글을 남겨주세요.</span>
            </div>
          ) : (
            <div className="flex flex-col">
              {post.comments.map(comment => (
                <div key={comment.id} className="px-4 py-3 border-b border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center">
                       <div className="w-5 h-5 bg-[#333333] rounded overflow-hidden mr-1.5 flex items-center justify-center">
                         <span className="text-[9px] text-[#A0A0A0]">익</span>
                       </div>
                       <span className="text-[13px] font-bold text-[#C0C0C0]">{comment.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <button className="text-[#888888] bg-[#1a1a1a] px-2 py-0.5 rounded text-[11px] font-bold">공감</button>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#E0E0E0] mb-1.5 leading-snug">{comment.content}</p>
                  <span className="text-[11px] text-[#777777]">{comment.timeago}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Input Bar */}
      <footer className="fixed bottom-0 max-w-md w-full bg-[#1A1A1A] px-3 py-2 border-t border-[#333333] z-20 pb-[env(safe-area-inset-bottom,16px)]">
         <div className="bg-[#262626] rounded-[8px] flex items-center px-3 py-2.5">
            <label className="flex items-center space-x-1.5 cursor-pointer select-none shrink-0 mr-3">
              <div className={`w-[14px] h-[14px] rounded-[3px] flex items-center justify-center border ${isAnonymous ? 'bg-[#c62917] border-[#c62917]' : 'border-[#555555] bg-transparent'}`}>
                {isAnonymous && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
              </div>
              <span className={isAnonymous ? 'text-[#c62917] font-bold tracking-tight text-[13px]' : 'text-[#888888] font-medium tracking-tight text-[13px]'}>익명</span>
              <input type="checkbox" className="hidden" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
            </label>
            <input 
               type="text" 
               className="flex-1 bg-transparent text-[14px] text-[#E0E0E0] placeholder-[#666666] outline-none"
               placeholder="댓글을 입력하세요."
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter') handleSubmitClick();
               }}
            />
            <button 
              className={`shrink-0 ml-2 p-1 ${canSubmit ? 'text-[#c62917]' : 'text-[#666666]'}`}
              onClick={handleSubmitClick}
            >
              <Send className="w-5 h-5" strokeWidth={2} />
            </button>
         </div>
      </footer>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <ConfirmPopup 
          type="comment"
          onCancel={() => setShowConfirmPopup(false)} 
          onConfirm={handleConfirmSubmit} 
        />
      )}

      {/* Anonymous Warning Popup */}
      {showAnonymousWarning && (
        <AnonymousWarningPopup 
          type="comment"
          dontShowThisAgain={dontShowThisAgain}
          setDontShowThisAgain={setDontShowThisAgain}
          onCancel={() => setShowAnonymousWarning(false)}
          onConfirm={handleAnonymousWarningSubmit}
        />
      )}
    </div>
  );
}

// Extracted Popups
function ConfirmPopup({ type, onCancel, onConfirm }: { type: 'post' | 'comment', onCancel: () => void, onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-[#1c1c1c] w-[280px] rounded-[14px] overflow-hidden flex flex-col shadow-2xl">
        <div className="pt-6 pb-5 px-4 text-center">
          <p className="text-[16px] font-bold text-[#E0E0E0] mb-2">익명이 아닙니다</p>
          <p className="text-[13px] font-medium text-[#A0A0A0] leading-snug break-keep">
            익명 선택이 해제되어 있습니다.<br />
            이대로 {type === 'post' ? '글을' : '댓글을'} 작성하시겠습니까?
          </p>
        </div>
        <div className="flex border-t border-[#333333]">
          <button 
            className="flex-1 py-3.5 text-[15px] text-[#A0A0A0] font-medium border-r border-[#333333] active:bg-[#2A2A2A] transition-colors"
            onClick={onCancel}
          >
            취소
          </button>
          <button 
            className="flex-1 py-3.5 text-[15px] text-[#c62917] font-bold active:bg-[#2A2A2A] transition-colors"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function AnonymousWarningPopup({ 
  type,
  dontShowThisAgain, 
  setDontShowThisAgain, 
  onCancel, 
  onConfirm 
}: { 
  type: 'post' | 'comment';
  dontShowThisAgain: boolean; 
  setDontShowThisAgain: (v: boolean) => void; 
  onCancel: () => void; 
  onConfirm: () => void; 
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
      <div className="bg-[#1c1c1c] w-[300px] rounded-[14px] overflow-hidden flex flex-col shadow-2xl">
        <div className="pt-6 pb-5 px-5 text-center flex flex-col items-center">
          <p className="text-[16px] font-bold text-[#E0E0E0] mb-3">익명 {type === 'post' ? '글' : '댓글'} 작성 유의사항</p>
          <p className="text-[13px] font-medium text-[#A0A0A0] leading-snug break-keep mb-5 text-left">
            익명으로 작성하더라도 커뮤니티 이용규칙 위반 시 게시물이 삭제되거나 서비스 이용이 제한될 수 있습니다. 타인을 비방하거나 모욕하는 글, 허위사실 유포 등은 법적 처벌 대상이 될 수 있으니 유의하시기 바랍니다.
          </p>
          
          <label className="flex items-center space-x-2 cursor-pointer select-none self-start">
            <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center border ${dontShowThisAgain ? 'bg-[#c62917] border-[#c62917]' : 'border-[#555555] bg-transparent'}`}>
              {dontShowThisAgain && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className={dontShowThisAgain ? 'text-[#E0E0E0] font-medium tracking-tight text-[13px]' : 'text-[#888888] font-medium tracking-tight text-[13px]'}>다시 보지 않기</span>
            <input type="checkbox" className="hidden" checked={dontShowThisAgain} onChange={(e) => setDontShowThisAgain(e.target.checked)} />
          </label>
        </div>
        <div className="flex border-t border-[#333333]">
          <button 
            className="flex-1 py-3.5 text-[15px] text-[#A0A0A0] font-medium border-r border-[#333333] active:bg-[#2A2A2A] transition-colors"
            onClick={onCancel}
          >
            취소
          </button>
          <button 
            className="flex-1 py-3.5 text-[15px] text-[#c62917] font-bold active:bg-[#2A2A2A] transition-colors"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
