export default async function decorate(block) {
  const link = block.querySelector('a');
  const resp = await fetch(`${link.href}.json`);
  const json = await resp.json();
  const form = document.createElement('form');

  json.data.forEach((field) => {
    const label = document.createElement('label');
    label.textContent = field.Label;

    const input = document.createElement('input');
    input.type = field.Type;
    input.name = field.Name;
    input.placeholder = field.Placeholder || '';

    form.append(label);
    form.append(input);
  });

  block.textContent = '';
  block.append(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    await fetch('https://script.google.com/macros/s/AKfycbzvtTNzV0yTgMknS4avRRl0b51YPmtM-W_QSSyHfWsBShdH6PzT41yGH-FO1CtO9Y60/exec', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    form.reset();
  });
}
