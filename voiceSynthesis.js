export function speak(message) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(message);
    utter.lang = 'en-US';
    utter.rate = 1;
    utter.pitch = 1;
    speechSynthesis.speak(utter);
  } else {
    console.warn('Speech synthesis not supported in this browser.');
  }
}
