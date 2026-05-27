import Reveal from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

const deck = new Reveal({
  hash: true,
  center: true,
  transition: 'slide',
  backgroundTransition: 'fade',
  slideNumber: true,
  progress: true,
  controls: true,
  overview: true,
  touch: true,
  mouseWheel: false,
  width: 1280,
  height: 720,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
  plugins: [Highlight, Notes]
});

deck.initialize();
