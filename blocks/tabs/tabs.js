export default function decorate(block) {
  const rows = [...block.children];

  const tabNav = document.createElement('div');
  tabNav.className = 'tabs-nav';

  const tabContent = document.createElement('div');
  tabContent.className = 'tabs-content';

  rows.forEach((row, index) => {
    const title = row.children[0].textContent;
    const content = row.children[1].innerHTML;

    // Create button
    const button = document.createElement('button');
    button.textContent = title;
    button.className = 'tab-btn';
    if (index === 0) button.classList.add('active');

    tabNav.appendChild(button);

    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'tab-panel';
    contentDiv.innerHTML = content;
    if (index === 0) contentDiv.classList.add('active');

    tabContent.appendChild(contentDiv);

    // Click Event
    button.addEventListener('click', () => {
    block.querySelectorAll('.tab-btn')
      .forEach((btn) => {
          btn.classList.remove('active');
    });

    block.querySelectorAll('.tab-panel')
      .forEach((panel) => {
          panel.classList.remove('active');
    });

    button.classList.add('active');
    contentDiv.classList.add('active');
  });
  });

  block.textContent = '';
  block.appendChild(tabNav);
  block.appendChild(tabContent);
}
