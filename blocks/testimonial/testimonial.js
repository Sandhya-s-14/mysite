export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const name = row.children[0];
    const message = row.children[1];

    name.classList.add('testimonial-name');
    message.classList.add('testimonial-message');
  });
}