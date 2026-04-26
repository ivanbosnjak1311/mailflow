import { Inbox, Send, File, Trash, Edit3 } from 'lucide-react';

const Sidebar = ({ onComposeClick, currentFolder, setCurrentFolder, inboxCount }) => {
  const menuItems = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox size={19} />, count: inboxCount },
    { id: 'sent', label: 'Poslato', icon: <Send size={19} /> },
    { id: 'drafts', label: 'Skice', icon: <File size={19} /> },
    { id: 'trash', label: 'Obrisano', icon: <Trash size={19} />, isTrash: true },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col p-4 bg-gray-50 h-screen">
      <div className="flex items-center gap-2 mb-8 px-2 text-blue-600">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">M</div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 font-sans">MailFlow</h1>
      </div>

      <button onClick={onComposeClick} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mb-6 shadow-md transition-all active:scale-95 group w-full">
        <Edit3 size={18} className="group-hover:rotate-12 transition-transform" />
        <span className="font-semibold">Nova poruka</span>
      </button>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setCurrentFolder(item.id)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              item.isTrash ? 'border-t border-gray-200 mt-4 pt-4' : ''
            } ${
              currentFolder === item.id 
                ? 'bg-blue-100 text-blue-700 font-bold' 
                : 'text-gray-600 hover:bg-gray-200/50'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
            
            {/* 3. Provjera mora biti preciznija jer je 0 "falsy" vrijednost u JS-u */}
            {item.count !== undefined && (
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                currentFolder === item.id ? 'bg-blue-200 text-blue-800' : 'bg-blue-100 text-blue-600'
              }`}>
                {item.count}
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;