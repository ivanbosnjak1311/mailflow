import { Search } from 'lucide-react';

const MessageList = ({ emails, currentFolder, onSelectMail }) => {
  // Filtriramo mejlove koje smo dobili kao prop
  const filteredEmails = emails.filter(email => email.folder === currentFolder);

  return (
    <main className="w-96 border-r border-gray-200 flex flex-col h-screen bg-white shadow-sm z-10">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{currentFolder}</span>
        <span className="text-[10px] font-bold text-gray-400">{filteredEmails.length} poruka</span>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input type="text" placeholder="Pretraži..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {filteredEmails.map((mail) => (
          <div 
            key={mail.id}
            onClick={() => onSelectMail(mail)}
            className="p-4 border-b border-gray-50 cursor-pointer hover:bg-blue-50/50 transition-all relative"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-900">{mail.sender}</span>
              <span className="text-[10px] text-gray-400">{mail.time}</span>
            </div>
            <div className="text-sm font-bold text-gray-800 mb-1 leading-tight">{mail.subject}</div>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{mail.snippet}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MessageList;