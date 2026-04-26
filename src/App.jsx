import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar';
import MessageList from './components/MessageList';
import ReadingPane from './components/ReadingPane';
import ComposeModal from './components/ComposeModal';
import './App.css'

const initialEmails = [
  { id: 1, folder: 'inbox', sender: "Marko Marković", subject: "Novi dizajn projekta", time: "10:45", snippet: "Hajde da pogledamo ove nove skice...", unread: true },
  { id: 2, folder: 'sent', sender: "Ja", subject: "Odgovor na ponudu", time: "Juče", snippet: "Hvala na ponudi, prihvatam uslove...", unread: false },
  { id: 3, folder: 'inbox', sender: "Github", subject: "Security Alert", time: "Juče", snippet: "Primećena je nova prijava...", unread: false },
  { id: 4, folder: 'trash', sender: "Spam", subject: "Osvojili ste nagradu", time: "20. Mar", snippet: "Kliknite ovde...", unread: false },
];

function App() {
  const [emails, setEmails] = useState(() => {
    const savedEmails = localStorage.getItem('mailflow_emails');
    return savedEmails ? JSON.parse(savedEmails) : initialEmails;
  });
  const [selectedMail, setSelectedMail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('inbox');

  useEffect(() => {
    localStorage.setItem('mailflow_emails', JSON.stringify(emails));
  }, [emails]);

  const deleteMail = (id) => {
    const updatedEmails = emails.map(mail => {
      if (mail.id === id) {
        return { ...mail, folder: 'trash' }; // Prebaci u trash
      }
      return mail;
    });
    setEmails(updatedEmails);
    setSelectedMail(null); // Zatvori pregled nakon brisanja
  };

  const sendMail = (newMail) => {
    const mailObject = {
      id: Date.now(),
      folder: 'sent',
      sender: "Ja",
      ...newMail,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      unread: false
    };
    setEmails([mailObject, ...emails]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white selection:bg-blue-100">
      <Sidebar onComposeClick={() => setIsComposeOpen(true)} currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} inboxCount={emails.filter(m => m.folder === 'inbox').length} />
      <MessageList emails={emails} currentFolder={currentFolder} onSelectMail={setSelectedMail} />
      <ReadingPane mail={selectedMail} onDelete={deleteMail} />
      <ComposeModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} onSend={sendMail} />
    </div>
  );
}

export default App
