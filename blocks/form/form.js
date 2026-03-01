export default function decorate(block) {
  block.innerHTML = `
    <form>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Message" required></textarea>
      <button type="submit">Submit</button>
    </form>
  `;
}