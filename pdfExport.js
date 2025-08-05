import jsPDF from 'jspdf';

export function exportChatHistoryAsPDF(chatLog) {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("VORTEX.X – Chat History", 10, 10);

  let y = 20;
  chatLog.forEach((entry, index) => {
    const line = `${index + 1}. ${entry.timestamp}: ${entry.message}`;
    doc.text(line, 10, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("chat-history.pdf");
}
