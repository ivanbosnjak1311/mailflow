import { Trash2, Reply, MoreVertical, Archive, ArrowLeft } from 'lucide-react';

const ReadingPane = ({ mail, onDelete }) => {
  if (!mail) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 text-gray-400">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
           <span className="text-3xl">📧</span>
        </div>
        <p className="text-sm font-semibold text-gray-500">Izaberite poruku da biste je pročitali</p>
        <p className="text-xs text-gray-400 mt-1">Vaš Inbox je siguran i zaštićen.</p>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-white h-screen overflow-hidden">
      
      {/* NOVO: Toolbar sa akcijama */}
      <div className="px-8 py-3 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-full transition-colors">
            <Archive size={19} />
          </button>
          
          {/* Dugme za brisanje koje poziva funkciju iz App.jsx */}
          <button 
            onClick={() => onDelete(mail.id)}
            className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full transition-colors"
            title="Prebaci u obrisano"
          >
            <Trash2 size={19} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-full">
            <Reply size={19} />
          </button>
          <button className="p-2 hover:bg-gray-100 text-gray-500 rounded-full">
            <MoreVertical size={19} />
          </button>
        </div>
      </div>

      {/* Skrolujući sadržaj poruke */}
      <div className="overflow-y-auto flex-1">
        {/* Header poruke */}
        <div className="p-8 border-b border-gray-50">
          <h2 className="text-2xl font-black mb-6 text-gray-900 leading-tight">
            {mail.subject}
          </h2>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-black text-lg shadow-sm">
                {mail.sender.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{mail.sender}</div>
                <div className="text-xs text-gray-500 font-medium tracking-wide italic">
                  za: ja &lt;korisnik@mailflow.com&gt;
                </div>
              </div>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-md">
              {mail.time}
            </div>
          </div>
        </div>

        {/* Sadržaj */}
        <div className="p-8">
          <div className="max-w-2xl text-gray-700 leading-7 space-y-6">
            <p className="text-lg">Poštovani,</p>
            <p>Ovo je simulacija prave poruke unutar vašeg novog <strong>MailFlow</strong> klijenta. Sistem trenutno prikazuje podatke iz memorije, ali je spreman za povezivanje sa backend-om.</p>
            <blockquote className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-blue-900 font-medium shadow-inner">
              "{mail.snippet}"
            </blockquote>
            <p>Ukoliko imate bilo kakva pitanja oko razvoja aplikacije, stojimo vam na raspolaganju.</p>
            <div className="pt-10 border-t border-gray-100">
              <p className="text-sm text-gray-400">Srdačan pozdrav,</p>
              <p className="font-bold text-gray-800 text-lg">{mail.sender}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadingPane;