/* Non-visual release safeguards. They intentionally leave the portfolio's
   existing renderers and layout untouched. */
(() => {
  const originalNotePages = notePages;
  notePages = function(){
    const pages = originalNotePages();
    pages.services = {
      title: 'Services',
      html: '<h1>SERVICES</h1><p class="note-lead">AVAILABLE FOR PROJECTS</p><h2>WEBSITE &amp; DIGITAL DESIGN</h2><p>I design websites and digital experiences for artists, creative projects and brands — from the first visual direction to a finished, responsive website.</p><p>I use Figma to build page structure, visual systems, typography, layouts and prototypes, then turn the approved design into a working site or prepare it clearly for development. The result is a distinctive website that is easy to navigate, works well on mobile and communicates the project’s identity.</p><div class="note-links"><a href="mailto:ramenskiy.7777@gmail.com">EMAIL ME ↗</a><a href="https://t.me/manjuria_puff616" target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>'
    };
    if (pages.contacts?.html) pages.contacts.html = pages.contacts.html.replace(/<a href="undefined"[^>]*>LinkedIn ↗<\/a>/, '');
    return pages;
  };

  const harden = root => {
    if (root.matches?.('a[target="_blank"]')) root.rel = 'noopener noreferrer';
    root.querySelectorAll?.('a[target="_blank"]').forEach(link => { link.rel = 'noopener noreferrer'; });
  };
  harden(document);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === 1) harden(node);
  }))).observe(document.body, {childList:true, subtree:true});
})();
