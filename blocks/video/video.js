export default function decorate(block) {
  block.classList.add('video');

  const link = block.querySelector('a');
  if (!link) return;

  const url = link.href;
  let embedURL = '';

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    embedURL = `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop();
    embedURL = `https://player.vimeo.com/video/${videoId}`;
  }

  if (!embedURL) return;

  const wrapper = document.createElement('div');
  wrapper.classList.add('video-wrapper');

  const iframe = document.createElement('iframe');
  iframe.src = embedURL;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  wrapper.appendChild(iframe);
  block.textContent = '';
  block.appendChild(wrapper);
}
