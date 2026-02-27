export default function decorate(block) {
  [...block.children].forEach((row) => {
    const title = row.querySelector(':scope > div:first-child');
    const content = row.querySelector(':scope > div:last-child');
 
    title.classList.add('accordion-title');
    content.classList.add('accordion-content');
 
    content.style.display = 'none';
 
    // Add arrow icon
    const arrow = document.createElement('span');
    arrow.className = 'accordion-arrow';
    arrow.innerHTML = '▼';
    title.appendChild(arrow);
 
    title.addEventListener('click', () => {
      const isOpen = content.style.display === 'block';
      content.style.display = isOpen ? 'none' : 'block';
      row.classList.toggle('open', !isOpen);
    });
  });
}
 