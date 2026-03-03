export default async function decorate(block) {
  const response = await fetch(block.querySelector('a').href);
  const json = await response.json();
  const form = document.createElement('form');
  form.classList.add('form');
  json.data.forEach((field) => {
    if (field.Type !== 'submit') {
      const label = document.createElement('label');
      label.textContent = field.Label;
      let input;
      if (field.Type === 'textarea') {
        input = document.createElement('textarea');
      } else {
        input = document.createElement('input');
        input.type = field.Type;
      }
      input.name = field.Name;
      input.placeholder = field.Placeholder || '';
      if (field.Required === 'true') {
        input.required = true;
      }
      form.appendChild(label);
      form.appendChild(input);
    } else {
      const button = document.createElement('button');
      button.type = 'submit';
      button.textContent = field.Label;
      form.appendChild(button);
    }
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Remove existing status message if any
    const existingMessage = form.querySelector('.form-status');
    if (existingMessage) existingMessage.remove();

    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Form submitted successfully!';
      successMessage.className = 'form-status success';
      form.appendChild(successMessage);
      form.reset();
    } catch (error) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Submission failed!';
      errorMessage.className = 'form-status error';
      form.appendChild(errorMessage);
    }
  });
  // Clear block and append form ONLY ONCE
  block.textContent = '';
  block.appendChild(form);
}
