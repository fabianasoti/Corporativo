// Interacciones del manual: copiar, toast, menú móvil y navegación activa
const toast = document.getElementById('toast');
function showToast(msg) {
	toast.querySelector('span').textContent = msg;
	toast.classList.add('show');
	clearTimeout(showToast.t);
	showToast.t = setTimeout(() => toast.classList.remove('show'), 2200);
}
async function copyText(text, msg) {
	try { await navigator.clipboard.writeText(text); }
	catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
	showToast(msg || 'Copiado');
}
document.querySelectorAll('[data-copy]').forEach(el =>
	el.addEventListener('click', () => copyText(el.dataset.copy, 'Copiado: ' + el.dataset.copy)));
document.getElementById('copy-css').addEventListener('click', () =>
	copyText(document.getElementById('css-code').innerText, 'Tokens CSS copiados'));

const sidebar = document.getElementById('sidebar');
document.getElementById('menu-btn').addEventListener('click', () => sidebar.classList.toggle('open'));
sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));

const links = [...document.querySelectorAll('.nav a')];
const io = new IntersectionObserver(entries => {
	entries.forEach(e => {
		if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
	});
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main section').forEach(s => io.observe(s));
