const video = document.getElementById('lemr-video');
video.defaultPlaybackRate = 2.5;
video.playbackRate = 2.5;
const toggle = document.querySelector('.video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;
const play = () => video.play().catch(() => {});
function updateButton() {
  toggle.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} LEMR preview`);
  toggle.firstElementChild.textContent = video.paused ? '▶' : 'Ⅱ';
}
toggle.addEventListener('click', () => {
  if (video.paused) { manuallyPaused = false; play(); }
  else { manuallyPaused = true; video.pause(); }
});
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !reducedMotion.matches && !manuallyPaused && !document.hidden) play();
  else video.pause();
}, {threshold:.4}).observe(video);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) video.pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); });
