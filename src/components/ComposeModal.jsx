import { useState } from 'react';
import { X, Maximize2, Minimize2, Send, Paperclip } from 'lucide-react';

const ComposeModal = ({ isOpen, onClose, onSend }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if(!to || !subject) {
      alert("Molimo unesite primaoca i predmet poruke.");
    }

    onSend({
      sender: to,
      subject: subject,
      snippet: body,
    });

    setTo('');
    setSubject('');
    setBody('');
    onClose();
  }

  return (
    <div className="fixed bottom-0 right-8 w-125 bg-white shadow-2xl rounded-t-xl border border-gray-200 z-50 flex flex-col transition-all animate-in slide-in-from-bottom-10">
      
      {/* Header prozora */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
        <span className="text-sm font-bold">Nova poruka</span>
        <div className="flex gap-2">
          <Minimize2 size={16} className="cursor-pointer hover:text-gray-300" />
          <X 
            size={18} 
            className="cursor-pointer hover:text-red-400" 
            onClick={onClose} 
          />
        </div>
      </div>

      {/* Forme za unos */}
      <div className="flex flex-col p-2">
        <input 
          type="text" 
          placeholder="Primalac" 
          value={to} // Povezivanje sa state-om
          onChange={(e) => setTo(e.target.value)}
          className="px-4 py-2 border-b border-gray-100 outline-none text-sm focus:border-blue-500 transition-colors"
        />
        <input 
          type="text" 
          placeholder="Predmet (Subject)" 
          value={subject} // Povezivanje sa state-om
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 border-b border-gray-100 outline-none text-sm focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Glavni tekst (Body) */}
      <textarea 
        className="flex-1 p-4 h-64 outline-none text-sm resize-none text-gray-700"
        placeholder="Napišite nešto..."
        value={body} // Povezivanje sa state-om
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      {/* Donja traka sa alatima */}
      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
        <div className="flex items-center gap-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
            onClick={handleSend} // Pozivamo našu novu funkciju
          >
            <Send size={16} />
            Pošalji
          </button>
          <Paperclip size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
        <div 
           onClick={() => { setTo(''); setSubject(''); setBody(''); }}
           className="cursor-pointer"
        >
          <Trash2Icon size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

// Mala pomoćna komponenta za ikonicu kante (da ne uvozimo Trash ponovo ako nećemo)
const Trash2Icon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);

export default ComposeModal;