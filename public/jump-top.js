const arrow = document.querySelector('.jump-top');
let pointer;
let moved = false;

function place(left, top) {
  const clamp = (value, limit) => Math.max(0, Math.min(value, limit));
  Object.assign(arrow.style, {
    inset: 'auto',
    left: clamp(left, document.documentElement.clientWidth - arrow.offsetWidth) + 'px',
    top: clamp(top, window.innerHeight - arrow.offsetHeight) + 'px',
  });
}

arrow.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  const rect = arrow.getBoundingClientRect();
  moved = false;
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
  arrow.setPointerCapture(event.pointerId);
});

arrow.addEventListener('pointermove', event => {
  if (pointer?.id !== event.pointerId) return;
  const dx = event.clientX - pointer.x;
  const dy = event.clientY - pointer.y;
  if (!moved && Math.hypot(dx, dy) < 6) return;
  moved = true;
  arrow.classList.add('is-dragging');
  place(pointer.left + dx, pointer.top + dy);
});

arrow.addEventListener('lostpointercapture', event => {
  if (pointer?.id !== event.pointerId) return;
  pointer = undefined;
  arrow.classList.remove('is-dragging');
});

arrow.addEventListener('click', event => {
  event.preventDefault();
  const wasDrag = moved && event.detail !== 0;
  moved = false;
  if (wasDrag) return;
  document.getElementById('page-top')?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'instant' });
});

window.addEventListener('resize', () => {
  if (!arrow.style.left) return;
  const rect = arrow.getBoundingClientRect();
  place(rect.left, rect.top);
});
