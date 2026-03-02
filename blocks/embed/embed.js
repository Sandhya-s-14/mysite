export default function decorate(block) {

  const anchor = block.querySelector('a');
  if (!anchor) return;

  const href = anchor.href;

  if (href.includes('youtube.com') || href.includes('youtu.be')) {

    let videoId;

    if (href.includes('youtu.be')) {
      videoId = href.split('/').pop();
    } else {
      videoId = new URL(href).searchParams.get('v');
    }

    if (!videoId) return;

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    block.innerHTML = `
      <div class="youtube-wrapper">
        <img src="${thumbnail}" alt="YouTube Thumbnail" class="youtube-thumb">
        <div class="play-button">▶</div>
      </div>
    `;

    const wrapper = block.querySelector('.youtube-wrapper');

    wrapper.addEventListener('click', () => {
      block.innerHTML = `
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      `;
    });
  }
}