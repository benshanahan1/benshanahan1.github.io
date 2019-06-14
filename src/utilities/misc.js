/* Get scrollbar width, from https://stackoverflow.com/a/13382873/5161222 */
export function getScrollbarWidth() {
  const outer = document.createElement('div');  // eslint-disable-line
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  // eslint-disable-next-line
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  // eslint-disable-next-line
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}
