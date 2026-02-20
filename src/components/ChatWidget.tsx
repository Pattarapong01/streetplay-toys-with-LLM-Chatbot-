import { MessageCircle } from 'lucide-react';
import './ChatWidget.css';

function ChatWidget() {
  return (
    <div className="chat-container fixed bottom-8 right-8 z-50">
      <a 
        href="https://c7404fa075a80ac1b9.gradio.live" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-street-lime text-street-black rounded-full shadow-lg hover:shadow-hard-lime hover:scale-110 transition-all duration-300 hover:bg-white group"
        title="💬 Open Chat Assistant"
      >
        <MessageCircle className="w-8 h-8 group-hover:animate-bounce" />
      </a>
      <div className="absolute bottom-20 right-0 bg-street-black border-2 border-street-lime px-3 py-2 rounded-lg text-white text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with SP Bot
      </div>
    </div>
  );
}

export default ChatWidget;