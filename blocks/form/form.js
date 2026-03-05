export default async function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;
  try {
    const res = await fetch(link.href);
    const data = await res.json();
    const fields = data.data || data;

    const form = document.createElement('form');
    form.classList.add('dynamic-form');

    fields.forEach((field) => {
      if (!field.Type) return;

      if (field.Type.toLowerCase() === 'submit') {
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = field.Label;
        form.appendChild(button);
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.classList.add('form-group');

      const label = document.createElement('label');
      label.textContent = field.Label;

      let input;

      if (field.Type.toLowerCase() === 'message') {
        input = document.createElement('textarea');
      } else {
        input = document.createElement('input');
        input.type = field.Type.toLowerCase() === 'mobile'
          ? 'tel'
          : field.Type.toLowerCase();
      }

      input.name = field.Name.toLowerCase();
      input.placeholder = field.Placeholder || '';

      if (field.Required === 'true') {
        input.required = true;
      }

      wrapper.append(label, input);
      form.appendChild(wrapper);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());

      try {
        const submitRes = await fetch(
          'https://script.google.com/macros/s/AKfycbz88yVlDWeP90ZkrFtw4v018SfBg2psNxbpDHFatO4NAwsVQkJ3O7yFUIWqAP6a06dU1g/exec',
          {
            method: 'POST',
            body: JSON.stringify(jsonData),
          },
        );

        const result = await submitRes.json();

        if (result.status === 'success') {
          const message = document.createElement('p');
          message.textContent = 'Form Submitted Successfully';
          message.style.color = 'green';
          message.style.marginTop = '10px';

          form.appendChild(message);
          form.reset();
        }
      } catch (error) {
        console.error(error);
      }
    });
    block.textContent = '';
    block.appendChild(form);
  } catch (error) {
    console.error('Error loading form:', error);
  }
}
