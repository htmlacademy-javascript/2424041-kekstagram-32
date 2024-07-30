function isEscapeKeydown(evt) {
  return evt.key === 'Escape';
}

function isClickTargetTrue(evt, targetEl) {
  return evt.target === targetEl;
}

export { isEscapeKeydown, isClickTargetTrue };
