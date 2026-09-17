const display = document.querySelector('output');
let value = '0', stored = null, operator = null, fresh = false;
function reset() { value = '0'; stored = null; operator = null; fresh = false; }
function calculate() {
  if (stored === null || !operator) return;
  const a = stored, b = Number(value);
  const result = operator === '+' ? a + b : operator === '-' ? a - b : operator === '*' ? a * b : b === 0 ? NaN : a / b;
  value = Number.isFinite(result) ? String(Number(result.toPrecision(12))) : 'Error';
  stored = null; operator = null;
}
function input(key) {
  if (key === 'clear') reset();
  else if (/^[0-9.]$/.test(key)) {
    if (fresh || value === 'Error') { value = '0'; fresh = false; }
    if (key === '.') { if (!value.includes('.')) value += '.'; }
    else value = value === '0' ? key : value.length < 15 ? value + key : value;
  } else if (value !== 'Error') {
    if (key === 'sign') value = String(-Number(value));
    else if (key === '%') value = String(Number(value) / 100);
    else if (key === '=') { calculate(); fresh = true; }
    else if ('+-*/'.includes(key)) {
      if (!fresh) calculate();
      if (value !== 'Error') { stored = Number(value); operator = key; fresh = true; }
    }
  }
  display.textContent = value;
}
document.querySelectorAll('button').forEach(button => button.addEventListener('click', () => input(button.dataset.key || button.textContent)));
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest('button') && ['Enter', ' '].includes(event.key)) return;
  const key = event.key === 'Enter' ? '=' : event.key === 'Escape' ? 'clear' : event.key;
  if (/^[0-9.+*/%=\-]$/.test(key) || key === 'clear') { event.preventDefault(); input(key); }
});
