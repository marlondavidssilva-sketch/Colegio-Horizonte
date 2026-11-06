/* =====================================================================
   Portal Escolar Institucional - Colégio Horizonte
   script.js completo - Parte 1 de 4: dados base, armazenamento e cálculos
   ===================================================================== */
'use strict';

/* ---------- 1. DADOS BASE ---------- */
const TURMAS = ['1º Ano A', '2º Ano B', '3º Ano A'];
const SALAS = { '1º Ano A': 'Sala 101', '2º Ano B': 'Sala 104', '3º Ano A': 'Sala 203' };
const PESOS = [2, 2, 3, 3];
const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const HORAS = ['07:30 - 08:20', '08:20 - 09:10', '09:30 - 10:20', '10:20 - 11:10', '11:10 - 12:00'];
const PERFIS = {
  aluno: { rotulo: 'Aluno', usuario: 'aluno' },
  professor: { rotulo: 'Professor', usuario: 'professor' },
  coordenador: { rotulo: 'Coordenador', usuario: 'coordenador' }
};

const DISC = [
  { nome: 'Língua Portuguesa', aulas: 160, cor: '#1e3a8a', livro: 'Português: Linguagens', autor: 'William Cereja e Thereza Cochar',
    icone: 'M8 12c8-4 16-4 24 2 8-6 16-6 24-2v38c-8-4-16-4-24 2-8-6-16-6-24-2zM32 14v38',
    caps: ['Interpretação de textos', 'Morfologia e sintaxe', 'Literatura brasileira'],
    texto: ['Interpretar um texto é ir além das palavras: é reconhecer o que o autor diz de forma explícita e o que sugere nas entrelinhas. Observamos o gênero, o público e a finalidade do texto.', 'Uma boa leitura começa antes do primeiro parágrafo: título, imagens e fonte já oferecem pistas sobre o assunto.'],
    dest: ['Dica de leitura', 'Releia a pergunta da questão antes de voltar ao texto. A resposta deve estar apoiada no texto, e não na sua opinião.'] },
  { nome: 'Matemática', aulas: 160, cor: '#334155', livro: 'Matemática: Contexto & Aplicações', autor: 'Luiz Roberto Dante',
    icone: 'M10 52V12l44 40zM10 38a14 14 0 0 1 14 14',
    caps: ['Funções', 'Trigonometria', 'Geometria espacial'],
    texto: ['Uma função relaciona cada elemento de um conjunto A a um único elemento de um conjunto B. Escrevemos y = f(x), em que x é a variável independente e y depende de x.', 'A função afim tem a forma f(x) = ax + b. O coeficiente a indica a inclinação da reta e b mostra onde ela corta o eixo y.'],
    dest: ['Exemplo resolvido', 'Em f(x) = 2x + 3, temos f(4) = 2 · 4 + 3 = 11.'] },
  { nome: 'Biologia', aulas: 80, cor: '#155e75', livro: 'Biologia Hoje', autor: 'Sérgio Linhares e Fernando Gewandsznajder',
    icone: 'M12 52C12 26 26 12 54 12c0 28-14 42-38 42M12 52L38 26',
    caps: ['Citologia', 'Genética', 'Ecologia'],
    texto: ['A célula é a unidade básica da vida. Todos os seres vivos são formados por uma ou mais células, que obtêm energia, crescem e se reproduzem.', 'Nas células procariontes, o material genético fica solto no citoplasma. Nas eucariontes, ele está protegido no núcleo.'],
    dest: ['Você sabia?', 'As mitocôndrias produzem a maior parte da energia usada pelas células eucariontes.'] },
  { nome: 'História', aulas: 80, cor: '#475569', livro: 'História: Sociedade & Cidadania', autor: 'Alfredo Boulos Júnior',
    icone: 'M8 22L32 8l24 14zM14 26v22M26 26v22M38 26v22M50 26v22M8 52h48',
    caps: ['Brasil Colônia', 'Revolução Industrial', 'República brasileira'],
    texto: ['Em 1500, a chegada dos portugueses ao território que hoje é o Brasil iniciou um longo processo de ocupação e exploração. Nas primeiras décadas, a principal atividade foi a extração do pau-brasil.', 'A partir da década de 1530, com as capitanias hereditárias e a cana-de-açúcar, a colonização tornou-se mais permanente e passou a depender do trabalho escravizado.'],
    dest: ['Para refletir', 'De que modo a economia açucareira moldou a sociedade colonial?'] },
  { nome: 'Geografia', aulas: 80, cor: '#1d4ed8', livro: 'Geografia Geral e do Brasil', autor: 'José William Vesentini',
    icone: 'M10 32a22 22 0 1 0 44 0a22 22 0 1 0-44 0M32 10c-12 8-12 36 0 44 12-8 12-36 0-44M10 32h44M14 20h36M14 44h36',
    caps: ['Cartografia', 'Geopolítica', 'Meio ambiente'],
    texto: ['Mapas são representações reduzidas e simplificadas da superfície terrestre. Para lê-los, observamos título, legenda e escala.', 'A escala mostra quantas vezes o espaço real foi reduzido. Em 1:100.000, 1 cm no mapa corresponde a 1 km na realidade.'],
    dest: ['Atenção', 'Quanto menor o número depois dos dois pontos, maior a escala e mais detalhes o mapa mostra.'] },
  { nome: 'Língua Inglesa', aulas: 80, cor: '#1e40af', livro: 'Alive High', autor: 'Kátia Tavares e Claudio Franco',
    icone: 'M10 14h44v28H30L18 54V42h-8zM20 24h24M20 32h16',
    caps: ['Simple Present', 'Reading comprehension', 'Phrasal verbs'],
    texto: ['O Simple Present expressa hábitos, rotinas e fatos gerais. Na terceira pessoa do singular (he, she, it), o verbo recebe -s ou -es: she studies, he watches.', 'Para perguntar e negar, usamos o auxiliar do/does: Does she study every day? She does not (doesn\'t) study at night.'],
    dest: ['Remember', 'Com does, o verbo principal volta à forma base: Does he work?'] },
  { nome: 'Física', aulas: 80, cor: '#0f172a', livro: 'Os Fundamentos da Física', autor: 'Francisco Ramalho Jr., Nicolau Ferraro e Paulo Toledo',
    icone: 'M32 28a4 4 0 1 0 0 8a4 4 0 1 0 0-8M8 32c0-5 11-9 24-9s24 4 24 9-11 9-24 9-24-4-24-9z',
    caps: ['Cinemática', 'Leis de Newton', 'Energia e trabalho'],
    texto: ['A cinemática descreve o movimento dos corpos sem se preocupar com suas causas. As grandezas básicas são posição, tempo, velocidade e aceleração.', 'No movimento retilíneo uniforme (MRU), a velocidade é constante e a posição varia segundo s = s0 + v · t.'],
    dest: ['Exemplo', 'Um carro a 20 m/s percorre 100 m em 5 s, pois 20 · 5 = 100.'] }
];
const NOME_CURTO = n => n.replace('Língua ', '');

const GRADE = [[0, 1, 2, 3, 6], [1, 0, 4, 5, 1], [3, 6, 0, 1, 2], [4, 5, 1, 6, 0], [5, 2, 3, 4, 5]];
const GRADE_PROF = { '0-0': '2º Ano B', '0-2': '1º Ano A', '1-1': '2º Ano B', '1-4': '3º Ano A', '2-3': '1º Ano A', '3-0': '3º Ano A', '3-2': '2º Ano B', '4-4': '1º Ano A' };

const MURAL_SEED = [
  { id: 'm1', data: '2026-11-03', cat: 'Eventos', titulo: 'Feira de Ciências', texto: 'A feira acontecerá no pátio central, com apresentação dos projetos de todas as turmas.' },
  { id: 'm2', data: '2026-11-01', cat: 'Recados da Coordenação', titulo: 'Uso do uniforme', texto: 'Reforçamos a obrigatoriedade do uniforme completo nos dias de avaliação.' },
  { id: 'm3', data: '2026-10-28', cat: 'Prazos', titulo: 'Entrega de trabalhos do 4º bimestre', texto: 'O prazo final para entrega dos trabalhos é 20 de novembro, na secretaria.' }
];
const EVENTOS_SEED = [
  { id: 'e1', data: '2026-02-02', tipo: 'Início', titulo: 'Início do ano letivo' },
  { id: 'e2', data: '2026-04-03', tipo: 'Feriado', titulo: 'Sexta-feira Santa' },
  { id: 'e3', data: '2026-04-20', tipo: 'Prova', titulo: 'Provas do 1º bimestre' },
  { id: 'e4', data: '2026-05-02', tipo: 'Conselho', titulo: 'Conselho de classe - 1º bimestre' },
  { id: 'e5', data: '2026-06-22', tipo: 'Prova', titulo: 'Provas do 2º bimestre' },
  { id: 'e6', data: '2026-07-04', tipo: 'Reunião de pais', titulo: 'Reunião de pais - 2º bimestre' },
  { id: 'e7', data: '2026-09-07', tipo: 'Feriado', titulo: 'Independência do Brasil' },
  { id: 'e8', data: '2026-09-21', tipo: 'Prova', titulo: 'Provas do 3º bimestre' },
  { id: 'e9', data: '2026-10-03', tipo: 'Reunião de pais', titulo: 'Reunião de pais - 3º bimestre' },
  { id: 'e10', data: '2026-11-15', tipo: 'Feriado', titulo: 'Proclamação da República' },
  { id: 'e11', data: '2026-11-30', tipo: 'Prova', titulo: 'Provas do 4º bimestre' },
  { id: 'e12', data: '2026-12-12', tipo: 'Conselho', titulo: 'Conselho de classe final' }
];
const CATS = ['Eventos', 'Recados da Coordenação', 'Prazos'];
const TIPOS = ['Prova', 'Conselho', 'Feriado', 'Reunião de pais', 'Início'];

/* ---------- 2. ARMAZENAMENTO (localStorage) ---------- */
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function seed() {
  if (load('peusers', null)) return;
  const s = '123456';
  const users = [
    { id: 'u1', nome: 'Lucas Oliveira Pereira', usuario: 'aluno', senha: s, perfil: 'aluno', turma: '2º Ano B' },
    { id: 'u2', nome: 'Ana Beatriz Souza', usuario: 'ana', senha: s, perfil: 'aluno', turma: '2º Ano B' },
    { id: 'u3', nome: 'Bruno Almeida', usuario: 'bruno', senha: s, perfil: 'aluno', turma: '1º Ano A' },
    { id: 'u4', nome: 'Álvaro Lima', usuario: 'professor', senha: s, perfil: 'professor', disciplina: 'Matemática' },
    { id: 'u5', nome: 'Helena Costa', usuario: 'coordenador', senha: s, perfil: 'coordenador' }
  ];
  const notas = {};
  users.filter(u => u.perfil === 'aluno').forEach((u, ai) => {
    notas[u.id] = {};
    DISC.forEach((d, di) => {
      notas[u.id][d.nome] = { n: [0, 1, 2].map(b => 5 + ((di * 3 + ai * 2 + b) % 5) + (b % 2 ? 0.5 : 0)).concat(null), f: (di * 2 + ai * 3) % 9 };
    });
  });
  save('peusers', users); save('penotas', notas); save('pemural', MURAL_SEED); save('peeventos', EVENTOS_SEED);
}

let users, notas, mural, eventos, sid;
function loadAll() { users = load('peusers', []); notas = load('penotas', {}); mural = load('pemural', []); eventos = load('peeventos', []); sid = load('pesessao', null); }


/* ---------- IDENTIFICAÇÃO INSTITUCIONAL ----------
   Dados persistentes vinculados ao ID do usuário. Não recria números ao entrar.
   Documento interno demonstrativo; não é uma credencial validada por servidor.
*/
function garantirCarteirinhas() {
  let mudou = false;
  const numeros = new Set(users.filter(u => u.carteirinha?.numero).map(u => u.carteirinha.numero));
  const hoje = new Date();
  const data = `${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}-${String(hoje.getDate()).padStart(2,'0')}`;
  users.forEach(u => {
    if (u.carteirinha?.numero) return;
    let numero;
    do {
      const bytes = new Uint8Array(6);
      window.crypto.getRandomValues(bytes);
      numero = 'CH-' + Array.from(bytes, b => b.toString(16).padStart(2,'0')).join('').toUpperCase();
    } while (numeros.has(numero));
    numeros.add(numero);
    u.carteirinha = { numero, emissao: data };
    mudou = true;
  });
  if (mudou) save('peusers', users);
}

// QR de texto: usa os mesmos dados do cartão, sem links nem consulta externa.
function textoCarteirinha(u) {
  return ['COLÉGIO HORIZONTE','DADOS DA CARTEIRINHA','',
    'Nome: '+u.nome, 'Perfil: '+PERFIS[u.perfil].rotulo,
    u.perfil==='aluno'?'Turma: '+u.turma:u.perfil==='professor'?'Disciplina: '+u.disciplina:'Setor: Coordenação',
    'Identificação: '+u.carteirinha.numero,'Emissão: '+dataBR(u.carteirinha.emissao),'',
    'Dados para conferência. Sem validação externa.'].join('\n');
}
function inserirQRCarteirinha(alvo, u) {
  if (!alvo) return false;
  alvo.replaceChildren();
  if (typeof window.QRCode !== 'function') {
    alvo.textContent='QR indisponível. Recarregue com internet.';return false;
  }
  try {
    new window.QRCode(alvo, {text:textoCarteirinha(u),width:408,height:408,
      colorDark:'#000000',colorLight:'#ffffff',correctLevel:window.QRCode.CorrectLevel.M});
    return true;
  } catch(erro) { console.error('Erro ao gerar QR:',erro);alvo.textContent='Não foi possível gerar o QR.';return false; }
}

function cartaoHTML(u) {
  const titulo = u.perfil === 'aluno' ? 'Carteira Estudantil' : 'Identificação Institucional';
  const iniciais = u.nome.trim().split(/\s+/).filter(Boolean).slice(0,2).map(n => n[0]).join('');
  return `<article class="school-id" aria-label="${titulo} de ${esc(u.nome)}">
    <header class="school-id-head"><span class="school-id-brand">Colégio Horizonte</span><span>${titulo}</span></header>
    <div class="school-id-layout"><div class="school-id-data"><div class="school-id-person"><div class="school-id-initials" aria-hidden="true">${esc(iniciais)}</div>
    <div><h3>${esc(u.nome)}</h3><p>${esc(PERFIS[u.perfil].rotulo)}</p></div></div>
    <dl class="school-id-fields"><div><dt>Identificação</dt><dd>${esc(u.carteirinha.numero)}</dd></div>
    <div><dt>Emissão</dt><dd>${dataBR(u.carteirinha.emissao)}</dd></div>
    <div><dt>${u.perfil === 'aluno' ? 'Turma' : u.perfil === 'professor' ? 'Disciplina' : 'Setor'}</dt>
    <dd>${esc(u.perfil === 'aluno' ? u.turma : u.perfil === 'professor' ? u.disciplina : 'Coordenação')}</dd></div></dl></div>
    <div class="school-id-qr-box"><div class="school-id-qr" role="img" aria-label="QR Code com os dados da carteirinha"></div>
    <p>Escaneie para ler os dados</p></div></div>
    <footer class="school-id-foot">Uso interno • Colégio Horizonte</footer>
  </article>`;
}
let carteirinhaOcupada = false;
async function baixarCarteirinha() {
  if (carteirinhaOcupada) return;
  const u = me();
  if (!u) return;
  if (!window.jspdf?.jsPDF || typeof window.html2canvas !== 'function' || typeof window.QRCode !== 'function') {
    alert('As bibliotecas de PDF ou QR Code não carregaram. Verifique a internet e recarregue a página.'); return;
  }
  carteirinhaOcupada = true;
  const btn = $('#baixarCarteirinha');
  if (btn) { btn.disabled = true; btn.textContent = 'Gerando PDF...'; }
  let palco;
  try {
    palco = document.createElement('div');
    palco.className = 'school-id-export';
    palco.innerHTML = cartaoHTML(u);
    document.body.appendChild(palco);
    if (!inserirQRCarteirinha(palco.querySelector('.school-id-qr'),u)) throw new Error('QR não gerado');
    await document.fonts.ready;
    // Aguarda a imagem gerada pelo QRCode.js antes de capturar o cartão.
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await Promise.all([...palco.querySelectorAll('img')].filter(img=>img.getAttribute('src')).map(img=>img.decode().catch(()=>{})));
    const alvo = palco.querySelector('.school-id');
    const canvas = await window.html2canvas(alvo, {
      scale: 3, backgroundColor: '#ffffff', logging: false,
      onclone: doc => {
        const el = doc.querySelector('.school-id-export');
        if (el) { el.style.left = '0'; el.style.top = '0'; }
      }
    });
    const pdf = new window.jspdf.jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
    // Largura impressa 120 mm, proporção preservada. Fundo claro independente do tema.
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 22, 25, 120, 120 * canvas.height / canvas.width);
    pdf.save('carteirinha-' + slug(u.nome) + '.pdf');
  } catch (erro) {
    console.error('Erro na carteirinha:', erro);
    alert('Não foi possível gerar a carteirinha. Tente novamente.');
  } finally {
    palco?.remove(); carteirinhaOcupada = false;
    if (btn) { btn.disabled = false; btn.textContent = 'Baixar carteirinha em PDF'; }
  }
}

/* ---------- 3. CÁLCULOS ---------- */
const reg = (id, d) => notas?.[id]?.[d] || { n: [null, null, null, null], f: 0 };
const fmt = n => n == null ? '-' : n.toFixed(1).replace('.', ',');
const pct = n => n == null ? '-' : n.toFixed(1).replace('.', ',') + '%';

function calc(d, r) {
  const ls = r.n.map((v, i) => [v, PESOS[i]]).filter(x => x[0] != null);
  const media = ls.length ? ls.reduce((a, x) => a + x[0] * x[1], 0) / ls.reduce((a, x) => a + x[1], 0) : null;
  const freq = 100 - (r.f / d.aulas) * 100;
  let status = 'Em andamento';
  if (media != null) status = (freq < 75 || media < 4) ? 'Reprovado' : media >= 6 ? 'Aprovado' : 'Recuperação';
  return { media, freq, status };
}
function resumo(id) {
  const rs = DISC.map(d => { const r = reg(id, d.nome); return { d, r, c: calc(d, r) }; });
  const ms = rs.map(x => x.c.media).filter(m => m != null);
  const faltas = rs.reduce((a, x) => a + x.r.f, 0);
  const aulas = DISC.reduce((a, d) => a + d.aulas, 0);
  const ordem = ['Reprovado', 'Recuperação', 'Em andamento', 'Aprovado'];
  const status = ordem.find(o => rs.some(x => x.c.status === o)) || 'Em andamento';
  return { rs, media: ms.length ? ms.reduce((a, b) => a + b, 0) / ms.length : null, faltas, freq: 100 - (faltas / aulas) * 100, status };
}
const avg = a => { const x = a.filter(v => v != null); return x.length ? x.reduce((s, v) => s + v, 0) / x.length : null; };

function validar(u, lista) {
  if (u.nome.trim().length < 3) return 'Informe o nome completo.';
  if (!/^[a-z0-9._-]{3,}$/i.test(u.usuario.trim())) return 'Usuário: mínimo de 3 caracteres, sem espaços.';
  if (u.senha.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
  if (lista.some(x => x.usuario.toLowerCase() === u.usuario.trim().toLowerCase())) return 'Este usuário já está em uso.';
  return '';
}
function parse(s, max, inteiro) {
  const t = s.trim().replace(',', '.');
  if (!t) return { ok: true, val: null };
  const n = Number(t);
  if (Number.isNaN(n) || n < 0 || n > max || (inteiro && !Number.isInteger(n))) return { ok: false };
  return { ok: true, val: Math.round(n * 10) / 10 };
}

/* ---------- 4. UTILITÁRIOS ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dataBR = iso => new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR');
const opts = (arr, sel) => arr.map(x => `<option${x === sel ? ' selected' : ''}>${esc(x)}</option>`).join('');
const badge = s => `<span class="badge b-${s}">${s}</span>`;
const stat = (r, v) => `<div class="card stat"><b>${v}</b><span>${r}</span></div>`;
const tabela = (cab, linhas) => `<div class="tbl-wrap"><table><thead><tr>${cab.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${linhas}</tbody></table></div>`;
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
const svg = d => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;

/* ---------- 5. TEMA CLARO / ESCURO ---------- */
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  save('petema', t);
  const moon = 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z', sun = 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19';
  $$('.js-theme').forEach(b => { b.innerHTML = `${svg(t === 'dark' ? sun : moon)}<span>${t === 'dark' ? 'Tema claro' : 'Tema escuro'}</span>`; });
  redrawCharts();
}
document.addEventListener('click', e => {
  if (e.target.closest('.js-theme')) setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- 6. GRÁFICOS EM CANVAS ---------- */
let chartJobs = [];
const cssv = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function barras(canvas, itens, max, ref, fmtFn) {
  const dpr = window.devicePixelRatio || 1, w = canvas.clientWidth, rowH = 30, h = itens.length * rowH + 28;
  canvas.style.height = h + 'px'; canvas.width = w * dpr; canvas.height = h * dpr;
  const c = canvas.getContext('2d'); c.scale(dpr, dpr); c.clearRect(0, 0, w, h);
  const lab = 130, val = 56, bw = w - lab - val, text = cssv('--text'), muted = cssv('--muted'), trilha = cssv('--track');
  c.font = '13px "Segoe UI", Arial'; c.textBaseline = 'middle';
  itens.forEach((it, i) => {
    const y = i * rowH + 6, v = it.val;
    c.fillStyle = text; c.textAlign = 'left'; c.fillText(it.rot.length > 18 ? it.rot.slice(0, 17) + '.' : it.rot, 0, y + 10);
    c.fillStyle = trilha; c.fillRect(lab, y, bw, 20);
    if (v != null) { c.fillStyle = v < ref ? cssv('--bar-low') : cssv('--bar'); c.fillRect(lab, y, bw * Math.min(v, max) / max, 20); }
    c.fillStyle = text; c.textAlign = 'right'; c.fillText(fmtFn(v), w, y + 10);
  });
  const x = lab + bw * ref / max;
  c.strokeStyle = muted; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(x, 0); c.lineTo(x, itens.length * rowH + 6); c.stroke(); c.setLineDash([]);
  c.fillStyle = muted; c.textAlign = 'center'; c.fillText('ref. ' + fmtFn(ref), x, h - 8);
}
const addChart = fn => { chartJobs.push(fn); fn(); };
function redrawCharts() { chartJobs.forEach(f => { try { f(); } catch { } }); }
window.addEventListener('resize', redrawCharts);

/* ---------- 7. MODAL E LEITOR PAGINADO ---------- */
let readerKey = null;
function openModal(title, sub) { $('#mTitle').textContent = title; $('#mSub').textContent = sub || ''; $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; readerKey = null; }
$('#mClose').onclick = closeModal;
$('#modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') closeModal(); });

function reader(title, sub, pages, arquivo) {
  let i = 0;
  const draw = () => {
    $('#mBody').innerHTML = `<div class="page">${pages[i]}</div>`;
    $('#mBar').style.width = ((i + 1) / pages.length * 100) + '%';
    $('#mFoot').innerHTML = `<button class="btn btn-sec" id="pPrev" ${i === 0 ? 'disabled' : ''}>Página anterior</button>
      <span class="muted"><b>Página ${i + 1} de ${pages.length}</b></span>
      <button class="btn" id="pNext" ${i === pages.length - 1 ? 'disabled' : ''}>Próxima página</button>`;
    $('#pPrev').onclick = () => go(-1); $('#pNext').onclick = () => go(1);
    $('#mBody').scrollTop = 0;
  };
  const go = d => { i = Math.max(0, Math.min(pages.length - 1, i + d)); draw(); };
  readerKey = e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
  $('#mPdf').onclick = () => baixarPdf(pages, arquivo);
  openModal(title, sub); draw();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); if (readerKey && !$('#modal').hidden) readerKey(e); });

function ebookPages(d) {
  const T = (h, body) => `<div class="page-text"><h3>${h}</h3>${body}</div>`;
  const pages = [
    `<div class="cover" style="--cv:${d.cor}"><span class="cover-tag">Edição escolar - Ensino Médio</span>
      <div class="cover-ico"><svg viewBox="0 0 64 64"><path d="${d.icone}"/></svg></div><h3>${esc(d.livro)}</h3><hr class="rule"><p>${esc(d.nome)}</p><p class="cover-foot">${esc(d.autor)}</p></div>`,
    T('Sumário', `<ul class="toc"><li>Introdução<i></i>3</li>${d.caps.map((c, k) => `<li>Capítulo ${k + 1} - ${esc(c)}<i></i>${4 + k * 2}</li>`).join('')}<li>Exercícios e gabarito<i></i>10</li></ul>
      <p class="muted">Este exemplar integra o acervo do Colégio Horizonte e acompanha o conteúdo programático do ano letivo.</p>`),
    T('Introdução', `<p>Este livro reúne os conteúdos essenciais de ${esc(d.nome)} para o ano letivo, organizados em três capítulos.</p>
      <p>Cada capítulo possui uma página de conceitos e uma página de prática guiada. Ao final, há exercícios com gabarito comentado.</p>
      <div class="callout"><b>Como estudar</b>Leia com lápis na mão, anote dúvidas e traga-as para a aula.</div>`)
  ];
  d.caps.forEach((c, k) => {
    const teoria = k === 0
      ? d.texto.map(t => `<p>${esc(t)}</p>`).join('') + `<div class="callout"><b>${esc(d.dest[0])}</b>${esc(d.dest[1])}</div>`
      : `<p>Neste capítulo, estudamos <i>${esc(c)}</i> em ${esc(d.nome)}. Os conceitos são apresentados em ordem crescente de complexidade, relacionando teoria e situações do cotidiano.</p><p>Ao final da leitura, você deve ser capaz de definir os termos centrais, reconhecer exemplos e aplicar o conteúdo em atividades.</p>`;
    pages.push(T(`Capítulo ${k + 1} - ${esc(c)}`, teoria));
    pages.push(T(`Capítulo ${k + 1} - Prática guiada`, `<ol><li>Resuma em duas frases a ideia central de ${esc(c)}.</li><li>Cite um exemplo do seu dia a dia relacionado ao tema.</li><li>Elabore uma pergunta que você gostaria de discutir com o professor.</li></ol><p class="muted">Registre as respostas no caderno e compare com a turma.</p>`));
  });
  pages.push(T('Exercícios e gabarito', `<ol>${d.caps.map(c => `<li>Explique os principais conceitos de ${esc(c)} e dê um exemplo.</li>`).join('')}</ol>
    <div class="callout"><b>Gabarito comentado</b>Espera-se, em cada item, uma definição correta do tema acompanhada de ao menos um exemplo coerente com o conteúdo do capítulo.</div>`));
  return pages;
}

function teacherBookPages(disc) {
  const T = (h, b) => `<div class="page-text"><h3>${h}</h3>${b}</div>`;
  const temas = [
    ['Apresentação', 'Este manual orienta o planejamento e a avaliação do trabalho docente, alinhado ao projeto pedagógico do Colégio Horizonte.'],
    ['Princípios pedagógicos', 'O ensino prioriza a aprendizagem significativa, o protagonismo do estudante e o respeito aos diferentes ritmos de aprendizagem.'],
    ['Planejamento anual', 'Organize os conteúdos em quatro bimestres, definindo objetivos, habilidades da BNCC e instrumentos de avaliação.'],
    ['Aula expositiva dialogada', 'Alterne exposição curta com perguntas, exemplos e registros dos alunos para manter a participação.'],
    ['Aprendizagem baseada em projetos', 'Proponha problemas reais, divida em etapas, defina critérios claros e acompanhe as entregas parciais.'],
    ['Sala de aula invertida', 'Disponibilize material prévio e use o tempo presencial para resolução de problemas e debates.'],
    ['Plano de curso - 1º bimestre', 'Diagnóstico inicial, revisão de pré-requisitos, contrato didático e primeira avaliação (peso 2).'],
    ['Plano de curso - 2º bimestre', 'Aprofundamento dos conteúdos centrais, atividades em grupo e avaliação processual (peso 2).'],
    ['Plano de curso - 3º bimestre', 'Situações-problema, projetos interdisciplinares e simulado (peso 3).'],
    ['Plano de curso - 4º bimestre', 'Consolidação, recuperação paralela, avaliação final e devolutivas individuais (peso 3).'],
    ['Instrumentos de avaliação', 'Combine provas, trabalhos, observação e autoavaliação, com rubricas compartilhadas com os alunos.'],
    ['Média ponderada e situação final', 'A média usa pesos 2, 2, 3 e 3. Aprovado com média igual ou superior a 6,0; recuperação entre 4,0 e 5,9; reprovado com média inferior a 4,0 ou frequência abaixo de 75%.'],
    ['Feedback formativo', 'Devolva comentários específicos, indicando pontos fortes e próximos passos objetivos.'],
    ['Recuperação paralela', 'Identifique dificuldades cedo, ofereça atividades diferenciadas e registre a evolução.'],
    ['Inclusão e diversidade', 'Adapte materiais e estratégias às necessidades dos estudantes, em diálogo com a coordenação.'],
    ['Registro e documentação', 'Lance notas e faltas dentro dos prazos e mantenha evidências das avaliações.'],
    ['Gabarito - bloco A', 'Questões 1 a 10 do material de ' + disc + ': conferir respostas conforme os critérios de correção da disciplina.'],
    ['Gabarito - bloco B', 'Questões 11 a 20: considerar respostas alternativas válidas e justificar pontuações parciais.']
  ];
  const pages = [
    `<div class="cover" style="--cv:#14284b"><span class="cover-tag">Uso exclusivo do corpo docente</span>
      <div class="cover-ico"><svg viewBox="0 0 64 64"><path d="M8 12c8-4 16-4 24 2 8-6 16-6 24-2v38c-8-4-16-4-24 2-8-6-16-6-24-2zM32 14v38"/></svg></div>
      <h3>Manual Didático do Docente</h3><hr class="rule"><p>Orientações pedagógicas, plano de curso e gabaritos</p><p class="cover-foot">Colégio Horizonte - 2026</p></div>`,
    T('Sumário', `<ul class="toc">${temas.map((t, k) => `<li>${t[0]}<i></i>${k + 3}</li>`).join('')}</ul>`)
  ];
  temas.forEach((t, k) => pages.push(T(`${k + 1}. ${t[0]}`, `<p>${t[1]}</p><div class="callout"><b>Orientação prática</b>Registre no diário as ações realizadas e revise o planejamento a cada bimestre.</div>`)));
  return pages;
}

/* ---------- 8. PDF: IGUAL AO VISUALIZADOR (jsPDF + html2canvas) ---------- */
let pdfBusy = false;
async function baixarPdf(pages, arquivo) {
  if (pdfBusy) return;
  if (!window.jspdf || !window.html2canvas) {
    alert('Não foi possível carregar as bibliotecas de PDF. Verifique sua conexão com a internet e recarregue a página.');
    return;
  }
  pdfBusy = true;
  const btn = $('#mPdf');
  const antigo = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Gerando PDF...'; }
  const n = pages.length;
  const box = document.createElement('div');
  box.className = 'print-book';
  box.innerHTML = pages.map((p, i) => i === 0
    ? `<section class="print-page"><div class="pp-body">${p}</div></section>`
    : `<section class="print-page"><header class="pp-head"><span>Colégio Horizonte</span><span>${esc(arquivo.replace('livro-', '').replace(/-/g, ' '))}</span></header>
        <div class="pp-body">${p}</div>
        <footer class="pp-foot"><span>${esc(arquivo.replace('livro-', '').replace(/-/g, ' '))}</span><span>Página ${i + 1} de ${n}</span></footer></section>`).join('');
  document.body.appendChild(box);
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const W = 210, H = 297;
    for (let i = 0; i < n; i++) {
      const folha = box.children[i];
      if (btn) btn.textContent = `Gerando PDF... ${i + 1}/${n}`;
      const canvas = await html2canvas(folha, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
      const img = canvas.toDataURL('image/jpeg', 0.92);
      if (i > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(img, 'JPEG', 0, 0, W, H, undefined, 'FAST');
    }
    pdf.save(arquivo + '.pdf');
  } catch (err) {
    console.error(err);
    alert('Não foi possível gerar o PDF. Tente novamente.');
  } finally {
    box.remove();
    pdfBusy = false;
    if (btn) { btn.disabled = false; btn.textContent = antigo || 'Baixar PDF'; }
  }
}
function fitPages(box) {
  $$('.pp-body', box).forEach(b => {
    let s = 11.5;
    while (b.scrollHeight > b.clientHeight + 1 && s > 9) { s -= 0.5; b.style.fontSize = s + 'pt'; }
  });
}

/* ---------- 9. AUTENTICAÇÃO ---------- */
let authMode = 'login', authPerfil = 'aluno', authMsg = { erro: '', ok: '' };
const campo = (id, rot, tipo = 'text', extra = '') => `<label class="lbl" for="${id}">${rot}</label><input class="inp" id="${id}" type="${tipo}" ${extra}>`;

function renderAuth() {
  const msg = (authMsg.erro ? `<p class="alert err" role="alert">${esc(authMsg.erro)}</p>` : '') + (authMsg.ok ? `<p class="alert ok">${esc(authMsg.ok)}</p>` : '');
  if (authMode === 'login') {
    $('#authContent').innerHTML = `<form id="loginForm" novalidate>
      <h2>Acesse sua conta</h2><p class="muted">Selecione o seu perfil de acesso.</p>
      <div class="profile-tabs" role="group" aria-label="Perfil">${Object.entries(PERFIS).map(([k, p]) => `<button type="button" data-perfil="${k}" aria-pressed="${authPerfil === k}">${p.rotulo}</button>`).join('')}</div>
      ${msg}${campo('lUser', 'Usuário', 'text', 'autocomplete="username"')}${campo('lPass', 'Senha', 'password', 'autocomplete="current-password"')}
      <button class="btn" style="width:100%" type="submit">Entrar como ${PERFIS[authPerfil].rotulo.toLowerCase()}</button>
      <p class="muted" style="margin-top:1rem">Não possui conta? <button type="button" class="link" id="toReg">Solicitar cadastro de aluno</button></p></form>`;
    $$('[data-perfil]').forEach(b => b.onclick = () => { authPerfil = b.dataset.perfil; authMsg = { erro: '', ok: '' }; renderAuth(); });
    $('#toReg').onclick = () => { authMode = 'reg'; authMsg = { erro: '', ok: '' }; renderAuth(); };
    $('#loginForm').onsubmit = doLogin;
  } else {
    $('#authContent').innerHTML = `<form id="regForm" novalidate><h2>Solicitar cadastro</h2><p class="muted" style="margin-bottom:1rem">A conta será criada com o perfil de aluno.</p>
      ${msg}${campo('rNome', 'Nome completo')}${campo('rUser', 'Usuário')}${campo('rPass', 'Senha (mín. 6 caracteres)', 'password')}
      <label class="lbl" for="rTurma">Turma</label><select class="inp" id="rTurma">${opts(TURMAS)}</select>
      <button class="btn" style="width:100%" type="submit">Criar conta</button>
      <p class="muted" style="margin-top:1rem"><button type="button" class="link" id="toLogin">Voltar ao login</button></p></form>`;
    $('#toLogin').onclick = () => { authMode = 'login'; authMsg = { erro: '', ok: '' }; renderAuth(); };
    $('#regForm').onsubmit = doRegister;
  }
}
function doLogin(e) {
  e.preventDefault();
  const usuario = $('#lUser').value.trim(), senha = $('#lPass').value;
  if (!usuario || !senha) { authMsg = { erro: 'Informe usuário e senha.' }; return renderAuth(); }
  const u = users.find(x => x.usuario.toLowerCase() === usuario.toLowerCase() && x.perfil === authPerfil);
  if (!u) { authMsg = { erro: 'Usuário não encontrado para o perfil ' + PERFIS[authPerfil].rotulo + '.' }; return renderAuth(); }
  if (u.senha !== senha) { authMsg = { erro: 'Senha incorreta.' }; return renderAuth(); }
  sid = u.id; save('pesessao', sid); authMsg = { erro: '', ok: '' }; location.hash = ''; boot();
}
function doRegister(e) {
  e.preventDefault();
  const novo = { nome: $('#rNome').value, usuario: $('#rUser').value, senha: $('#rPass').value, turma: $('#rTurma').value };
  const erro = validar(novo, users);
  if (erro) { authMsg = { erro }; return renderAuth(); }
  users.push({ id: uid(), nome: novo.nome.trim(), usuario: novo.usuario.trim(), senha: novo.senha, perfil: 'aluno', turma: novo.turma });
  garantirCarteirinhas(); save('peusers', users); authMode = 'login'; authPerfil = 'aluno'; authMsg = { erro: '', ok: 'Conta criada. Entre com seu usuário e senha.' }; renderAuth();
}
$('#logoutBtn').onclick = () => { sid = null; localStorage.removeItem('pesessao'); location.hash = ''; boot(); };

/* ---------- 10. TELAS ---------- */
const me = () => users.find(u => u.id === sid);
const NAV = {
  aluno: [['inicio', 'Início'], ['agenda', 'Horário de aulas'], ['boletim', 'Boletim'], ['disciplinas', 'Disciplinas'], ['calendario', 'Calendário'], ['mural', 'Mural'], ['carteirinha', 'Minha carteirinha']],
  professor: [['agenda', 'Horário de aulas'], ['diario', 'Diário de classe'], ['livro', 'Livro do professor'], ['cartilha', 'Boas práticas'], ['calendario', 'Calendário'], ['mural', 'Mural'], ['carteirinha', 'Minha carteirinha']],
  coordenador: [['turmas', 'Visão geral de turmas'], ['usuarios', 'Gestão de usuários'], ['mural', 'Mural'], ['calendario', 'Calendário'], ['carteirinha', 'Minha carteirinha']]
};
const VIEWS = {};
VIEWS.carteirinha = u => `<div class="stack"><h2>Minha carteirinha</h2>
  <p class="muted">Identificação vinculada ao seu cadastro. Documento interno demonstrativo, sem verificação externa.</p>
  <div class="school-id-wrap">${cartaoHTML(u)}</div>
  <button class="btn" id="baixarCarteirinha" type="button">Baixar carteirinha em PDF</button>
  <p class="muted">O PDF utiliza fundo branco para impressão. Nenhuma senha é incluída.</p></div>`;


VIEWS.inicio = u => {
  const r = resumo(u.id);
  const atalhos = [['boletim', 'Boletim Acadêmico', 'Notas por bimestre, médias, frequência e gráfico de rendimento.'], ['agenda', 'Horário de aulas', 'Grade semanal da sua turma.'],
    ['disciplinas', 'Disciplinas e livros', 'Livros adotados, e-books de 10 páginas e material em PDF.'], ['mural', 'Mural de informações', 'Avisos oficiais da escola.']];
  return `<div class="stack"><div class="card hero"><h2>Olá, ${esc(u.nome.split(' ')[0])}</h2><p>${esc(u.turma)} - Ano letivo 2026</p></div>
    <div class="grid g4">${stat('Média geral', fmt(r.media))}${stat('Frequência', pct(r.freq))}${stat('Total de faltas', r.faltas)}${stat('Turma', esc(u.turma))}</div>
    <div class="grid g2">${atalhos.map(a => `<button class="card tile" data-go="${a[0]}"><b>${a[1]}</b><span class="muted">${a[2]}</span></button>`).join('')}</div></div>`;
};
VIEWS['agenda:aluno'] = u => `<h2>Horário de aulas - ${esc(u.turma)}</h2><div class="card">${tabela(['Horário', ...DIAS],
  HORAS.map((h, i) => `<tr><td><b>${h}</b></td>${GRADE[i].map(k => `<td>${esc(NOME_CURTO(DISC[k].nome))}</td>`).join('')}</tr>`).join(''))}</div>`;
VIEWS['agenda:professor'] = u => `<h2>Agenda semanal do docente</h2><div class="card">${tabela(['Horário', ...DIAS],
  HORAS.map((h, i) => `<tr><td><b>${h}</b></td>${DIAS.map((_, j) => { const t = GRADE_PROF[i + '-' + j];
    return t ? `<td>${esc(u.disciplina)} - ${esc(t)} - ${SALAS[t]}</td>` : '<td class="cell-free">Livre</td>'; }).join('')}</tr>`).join(''))}</div>`;

VIEWS.boletim = u => {
  const r = resumo(u.id);
  return `<div class="stack"><div class="card"><div class="head-row no-print"><h2>Boletim Acadêmico</h2><button class="btn" id="pdfBtn">Exportar Boletim em PDF</button></div>
    <div class="so-print"><h1 style="color:#14284b;margin:0">Colégio Horizonte</h1><p>Boletim Acadêmico - Ano letivo 2026</p>
      <p style="margin:.5rem 0 1rem"><b>Aluno:</b> ${esc(u.nome)} &nbsp; <b>Usuário:</b> ${esc(u.usuario)} &nbsp; <b>Turma:</b> ${esc(u.turma)} &nbsp; <b>Emissão:</b> ${new Date().toLocaleDateString('pt-BR')}</p></div>
    ${tabela(['Disciplina', '1º Bim', '2º Bim', '3º Bim', '4º Bim', 'Média pond.', 'Faltas', 'Freq.', 'Situação'],
      r.rs.map(({ d, r: x, c }) => `<tr><td>${esc(d.nome)}</td>${x.n.map(n => `<td>${fmt(n)}</td>`).join('')}<td><b>${fmt(c.media)}</b></td><td>${x.f}</td><td>${c.freq.toFixed(0)}%</td><td>${badge(c.status)}</td></tr>`).join(''))}
    <p class="muted" style="margin-top:.5rem">Média ponderada com pesos ${PESOS.join(', ')} (1º ao 4º bimestre). Aprovado com média igual ou superior a 6,0; recuperação entre 4,0 e 5,9; reprovado com média inferior a 4,0 ou frequência abaixo de 75%.</p>
    <h3 style="margin-top:1.4rem">Rendimento por disciplina</h3><canvas class="chart" id="cv"></canvas></div></div>`;
};

VIEWS.disciplinas = () => `<h2>Disciplinas e livros didáticos</h2><div class="grid g3">${DISC.map((d, i) => `<section class="card book-card" style="border-left-color:${d.cor}">
  <h3 style="margin:0;color:inherit">${esc(d.nome)}</h3><p class="muted">${d.aulas} aulas no ano</p>
  <div class="book-info"><b style="color:var(--heading)">${esc(d.livro)}</b><br><span class="muted">${esc(d.autor)}</span></div>
  <div style="display:flex;gap:.5rem"><button class="btn" style="flex:1" data-ebook="${i}">Visualizar livro</button><button class="btn btn-sec" style="flex:1" data-pdf="${i}">Baixar PDF</button></div></section>`).join('')}</div>`;

let diarioTurma = TURMAS[1];
VIEWS.diario = u => {
  const d = DISC.find(x => x.nome === u.disciplina) || DISC[1];
  const alunos = users.filter(a => a.perfil === 'aluno' && a.turma === diarioTurma);
  const inp = (id, i, v, max, inteiro, rot) => `<input class="num-in" inputmode="decimal" data-aluno="${id}" data-campo="${i}" data-max="${max}" ${inteiro ? 'data-int="1"' : ''} value="${v == null ? '' : String(v).replace('.', ',')}" aria-label="${rot}"><span class="num-hint">${inteiro ? `0 a ${max}` : '0 a 10'}</span>`;
  return `<div class="card"><div class="head-row"><div><h2 style="margin-bottom:.2rem">Diário de classe - ${esc(d.nome)}</h2><p class="muted">Aulas previstas no ano: ${d.aulas}. As alterações são salvas e refletidas no boletim do aluno imediatamente.</p></div>
    <div><label class="lbl" for="dTurma">Turma</label><select class="inp" style="margin:0" id="dTurma">${opts(TURMAS, diarioTurma)}</select></div></div>
    ${alunos.length ? tabela(['Aluno', '1º Bim', '2º Bim', '3º Bim', '4º Bim', 'Faltas', 'Média pond.'], alunos.map(a => { const r = reg(a.id, d.nome);
      return `<tr data-row="${a.id}"><td>${esc(a.nome)}</td>${r.n.map((n, i) => `<td>${inp(a.id, i, n, 10, false, `Nota ${i + 1} bimestre de ${esc(a.nome)}`)}</td>`).join('')}<td>${inp(a.id, 'f', r.f, d.aulas, true, 'Faltas de ' + esc(a.nome))}</td><td><b data-media>${fmt(calc(d, r).media)}</b></td></tr>`; }).join(''))
      : '<p class="muted">Nenhum aluno cadastrado nesta turma.</p>'}</div>`;
};

VIEWS.livro = () => `<div class="card"><h2>Livro do Professor</h2><h3>Manual Didático do Docente</h3><p class="muted" style="margin-bottom:1rem">Leitura interativa de 20 páginas com orientações pedagógicas, plano de curso e gabaritos.</p><button class="btn" id="openBook">Abrir manual</button></div>`;
VIEWS.cartilha = () => {
  const blocos = [['Ética docente', ['Atuar com honestidade, imparcialidade e respeito à diversidade.', 'Preservar o sigilo das informações dos estudantes.', 'Reconhecer os próprios limites e buscar formação continuada.']],
    ['Conduta em sala de aula', ['Iniciar e encerrar as aulas nos horários previstos.', 'Manter ambiente respeitoso, com regras claras e aplicadas de forma consistente.', 'Tratar conflitos com diálogo e acionar a coordenação quando necessário.']],
    ['Relacionamento com os alunos', ['Manter relação profissional e cordial, com limites bem definidos.', 'Oferecer feedback construtivo e evitar comparações públicas.', 'Comunicar-se exclusivamente por canais institucionais.']],
    ['Uso de tecnologias na educação', ['Utilizar ferramentas homologadas pela escola.', 'Proteger dados pessoais, em conformidade com a LGPD.', 'Orientar sobre uso responsável, autoria e citação de fontes.']]];
  return `<h2>Cartilha de Boas Práticas</h2><div class="stack">${blocos.map(b => `<section class="card"><h3>${b[0]}</h3><ul>${b[1].map(i => `<li>${i}</li>`).join('')}</ul></section>`).join('')}</div>`;
};

let muralFiltro = '';
VIEWS.mural = u => {
  const coord = u.perfil === 'coordenador';
  const lista = mural.filter(m => !muralFiltro || m.cat === muralFiltro).sort((a, b) => b.data.localeCompare(a.data));
  return `<div class="stack"><div class="head-row"><h2>Mural de informações</h2><div><label class="lbl" for="mFiltro">Categoria</label><select class="inp" style="margin:0" id="mFiltro"><option value="">Todas</option>${opts(CATS, muralFiltro)}</select></div></div>
    ${coord ? `<form class="card" id="muralForm" novalidate><h3>Publicar aviso</h3><div class="form-grid"><div>${campo('nTit', 'Título')}</div><div><label class="lbl" for="nCat">Categoria</label><select class="inp" id="nCat">${opts(CATS)}</select></div><div>${campo('nData', 'Data', 'date')}</div>
      <div class="span-all"><label class="lbl" for="nTxt">Texto</label><textarea class="inp" id="nTxt" rows="3"></textarea></div></div><p id="nErr"></p><button class="btn" type="submit">Publicar</button></form>` : ''}
    ${lista.length ? lista.map(m => `<article class="card notice"><div class="notice-top"><div><h3 style="margin-bottom:.2rem">${esc(m.titulo)}</h3><p class="muted">${dataBR(m.data)} - <span class="badge">${esc(m.cat)}</span></p></div>
      ${coord ? `<button class="btn btn-danger" data-delm="${m.id}">Excluir</button>` : ''}</div><p style="margin-top:.6rem">${esc(m.texto)}</p></article>`).join('') : '<p class="muted">Nenhum aviso nesta categoria.</p>'}</div>`;
};

VIEWS.calendario = u => {
  const coord = u.perfil === 'coordenador';
  const grupos = {};
  [...eventos].sort((a, b) => a.data.localeCompare(b.data)).forEach(e => { const k = new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }); (grupos[k] = grupos[k] || []).push(e); });
  return `<div class="stack"><h2>Calendário acadêmico 2026</h2>
    ${coord ? `<form class="card" id="evForm" novalidate><h3>Adicionar data oficial</h3><div class="form-grid"><div>${campo('eTit', 'Título')}</div><div><label class="lbl" for="eTipo">Tipo</label><select class="inp" id="eTipo">${opts(TIPOS)}</select></div><div>${campo('eData', 'Data', 'date')}</div></div><p id="eErr"></p><button class="btn" type="submit">Adicionar</button></form>` : ''}
    ${Object.entries(grupos).map(([mes, its]) => `<h3 class="month">${mes}</h3><div class="card">${its.map(e => `<div class="ev"><div class="ev-date">${e.data.slice(8)}<small>${new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</small></div>
      <div class="ev-body"><b>${esc(e.titulo)}</b><br><span class="badge">${esc(e.tipo)}</span></div>${coord ? `<button class="btn btn-danger" data-delev="${e.id}">Excluir</button>` : ''}</div>`).join('')}</div>`).join('')}</div>`;
};

function statsTurmas() {
  return TURMAS.map(t => {
    const al = users.filter(u => u.perfil === 'aluno' && u.turma === t).map(a => ({ a, r: resumo(a.id) }));
    return { turma: t, qtd: al.length, media: avg(al.map(x => x.r.media)), freq: al.length ? avg(al.map(x => x.r.freq)) : null, apr: al.filter(x => x.r.status === 'Aprovado').length, rec: al.filter(x => x.r.status === 'Recuperação').length, rep: al.filter(x => x.r.status === 'Reprovado').length };
  });
}
VIEWS.turmas = () => {
  const st = statsTurmas(), alunos = users.filter(u => u.perfil === 'aluno');
  const todos = alunos.map(a => ({ a, r: resumo(a.id) }));
  return `<div class="stack"><h2>Visão geral de turmas</h2>
    <div class="grid g4">${stat('Alunos', alunos.length)}${stat('Média geral da escola', fmt(avg(todos.map(x => x.r.media))))}${stat('Frequência média', pct(avg(todos.map(x => x.r.freq))))}${stat('Em recuperação ou reprovados', todos.filter(x => ['Recuperação', 'Reprovado'].includes(x.r.status)).length)}</div>
    <div class="card"><h3>Comparativo entre turmas</h3>${tabela(['Turma', 'Alunos', 'Média', 'Frequência', 'Aprovados', 'Recuperação', 'Reprovados'], st.map(s => `<tr><td>${s.turma}</td><td>${s.qtd}</td><td><b>${fmt(s.media)}</b></td><td>${pct(s.freq)}</td><td>${s.apr}</td><td>${s.rec}</td><td>${s.rep}</td></tr>`).join(''))}</div>
    <div class="grid g2"><div class="card"><h3>Média por turma</h3><canvas class="chart" id="cvMedia"></canvas></div><div class="card"><h3>Frequência por turma</h3><canvas class="chart" id="cvFreq"></canvas></div></div>
    <div class="card"><h3>Média por disciplina</h3><canvas class="chart" id="cvDisc"></canvas></div>
    <div class="card"><h3>Relatório por aluno</h3>${tabela(['Aluno', 'Turma', 'Média', 'Faltas', 'Freq.', 'Situação'], todos.map(({ a, r }) => `<tr><td>${esc(a.nome)}</td><td>${esc(a.turma)}</td><td><b>${fmt(r.media)}</b></td><td>${r.faltas}</td><td>${pct(r.freq)}</td><td>${badge(r.status)}</td></tr>`).join(''))}</div></div>`;
};

let userMsg = { erro: '', ok: '' }, userPerfil = 'aluno';
VIEWS.usuarios = u => `<div class="stack"><h2>Gestão de usuários</h2>
  <form class="card" id="userForm" novalidate><h3>Novo usuário</h3>${userMsg.erro ? `<p class="alert err" role="alert">${esc(userMsg.erro)}</p>` : ''}${userMsg.ok ? `<p class="alert ok">${esc(userMsg.ok)}</p>` : ''}
    <div class="form-grid"><div><label class="lbl" for="cPerfil">Perfil</label><select class="inp" id="cPerfil"><option value="aluno"${userPerfil === 'aluno' ? ' selected' : ''}>Aluno</option><option value="professor"${userPerfil === 'professor' ? ' selected' : ''}>Professor</option></select></div>
    <div>${userPerfil === 'aluno' ? `<label class="lbl" for="cTurma">Turma</label><select class="inp" id="cTurma">${opts(TURMAS)}</select>` : `<label class="lbl" for="cDisc">Disciplina</label><select class="inp" id="cDisc">${opts(DISC.map(d => d.nome), 'Matemática')}</select>`}</div>
    <div>${campo('cNome', 'Nome completo')}</div><div>${campo('cUser', 'Usuário')}</div><div>${campo('cPass', 'Senha (mín. 6 caracteres)', 'password')}</div></div>
    <button class="btn" type="submit">Cadastrar usuário</button></form>
  <div class="card"><h3>Usuários cadastrados (${users.length})</h3>${tabela(['Nome', 'Usuário', 'Perfil', 'Turma / Disciplina', 'Ação'], users.map(x => `<tr><td>${esc(x.nome)}</td><td>${esc(x.usuario)}</td><td>${PERFIS[x.perfil].rotulo}</td><td>${esc(x.turma || x.disciplina || '-')}</td>
    <td>${x.id === u.id ? '<span class="muted">conta atual</span>' : `<button class="btn btn-danger" data-deluser="${x.id}">Remover</button>`}</td></tr>`).join(''))}</div></div>`;

/* ---------- 11. ROTAS, EVENTOS E INICIALIZAÇÃO ---------- */
function currentRoute(u) {
  const r = location.hash.slice(1), validas = NAV[u.perfil].map(n => n[0]);
  return validas.includes(r) ? r : validas[0];
}
function render() {
  const u = me(); if (!u) return;
  const r = currentRoute(u);
  chartJobs = [];
  $('#navBar').innerHTML = NAV[u.perfil].map(([k, t]) => `<button data-go="${k}" ${k === r ? 'aria-current="page"' : ''}>${t}</button>`).join('');
  $('#userLabel').textContent = `${u.nome} - ${PERFIS[u.perfil].rotulo}`;
  const view = VIEWS[r + ':' + u.perfil] || VIEWS[r];
  $('#view').innerHTML = view(u);
  afterRender(r, u);
}
function afterRender(r, u) {
  if (r === 'carteirinha') {
    inserirQRCarteirinha($('#view .school-id-qr'),u);
    $('#baixarCarteirinha').onclick = baixarCarteirinha;
  }
  if (r === 'boletim') {
    const rs = resumo(u.id).rs;
    addChart(() => { const c = $('#cv'); if (c) barras(c, rs.map(x => ({ rot: NOME_CURTO(x.d.nome), val: x.c.media })), 10, 6, fmt); });
    $('#pdfBtn').onclick = () => window.print();
  }
  if (r === 'turmas') {
    const st = statsTurmas();
    addChart(() => {
      const c1 = $('#cvMedia'), c2 = $('#cvFreq'), c3 = $('#cvDisc'), al = users.filter(x => x.perfil === 'aluno');
      if (c1) barras(c1, st.map(s => ({ rot: s.turma, val: s.media })), 10, 6, fmt);
      if (c2) barras(c2, st.map(s => ({ rot: s.turma, val: s.freq })), 100, 75, pct);
      if (c3) barras(c3, DISC.map(d => ({ rot: NOME_CURTO(d.nome), val: avg(al.map(a => calc(d, reg(a.id, d.nome)).media)) })), 10, 6, fmt);
    });
  }
  if (r === 'livro') $('#openBook').onclick = () => reader('Manual Didático do Docente', 'Colégio Horizonte - 2026', teacherBookPages(u.disciplina), 'manual-didatico-docente');
  if (r === 'diario') {
    $('#dTurma').onchange = e => { diarioTurma = e.target.value; render(); };
    $$('.num-in').forEach(i => i.addEventListener('input', () => salvarCampo(i, u)));
  }
  if (r === 'mural') {
    $('#mFiltro').onchange = e => { muralFiltro = e.target.value; render(); };
    const f = $('#muralForm'); if (f) f.onsubmit = ev => { ev.preventDefault();
      const t = $('#nTit').value.trim(), tx = $('#nTxt').value.trim(), d = $('#nData').value;
      if (!t || !tx || !d) return ($('#nErr').innerHTML = '<span class="alert err" style="display:block">Preencha título, data e texto.</span>');
      mural.push({ id: uid(), data: d, cat: $('#nCat').value, titulo: t, texto: tx }); save('pemural', mural); render(); };
  }
  if (r === 'calendario') {
    const f = $('#evForm'); if (f) f.onsubmit = ev => { ev.preventDefault();
      const t = $('#eTit').value.trim(), d = $('#eData').value;
      if (!t || !d) return ($('#eErr').innerHTML = '<span class="alert err" style="display:block">Informe título e data.</span>');
      eventos.push({ id: uid(), data: d, tipo: $('#eTipo').value, titulo: t }); save('peeventos', eventos); render(); };
  }
  if (r === 'usuarios') {
    $('#cPerfil').onchange = e => { userPerfil = e.target.value; userMsg = { erro: '', ok: '' }; render(); };
    $('#userForm').onsubmit = ev => { ev.preventDefault();
      const n = { nome: $('#cNome').value, usuario: $('#cUser').value, senha: $('#cPass').value };
      const erro = validar(n, users);
      if (erro) { userMsg = { erro, ok: '' }; return render(); }
      const novo = { id: uid(), nome: n.nome.trim(), usuario: n.usuario.trim(), senha: n.senha, perfil: userPerfil };
      if (userPerfil === 'aluno') novo.turma = $('#cTurma').value; else novo.disciplina = $('#cDisc').value;
      users.push(novo); garantirCarteirinhas(); save('peusers', users);
      userMsg = { erro: '', ok: (userPerfil === 'aluno' ? 'Aluno' : 'Professor') + ' cadastrado. Já pode entrar no sistema.' }; render(); };
  }
}
function salvarCampo(input, u) {
  const d = DISC.find(x => x.nome === u.disciplina) || DISC[1];
  const p = parse(input.value, +input.dataset.max, !!input.dataset.int);
  input.classList.toggle('invalid', !p.ok);
  if (!p.ok) return;
  const id = input.dataset.aluno, campoKey = input.dataset.campo;
  notas[id] = notas[id] || {};
  const r = reg(id, d.nome), n = [...r.n];
  if (campoKey === 'f') notas[id][d.nome] = { n, f: p.val ?? 0 };
  else { n[+campoKey] = p.val; notas[id][d.nome] = { n, f: r.f }; }
  save('penotas', notas);
  $('[data-media]', input.closest('tr')).textContent = fmt(calc(d, notas[id][d.nome]).media);
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-ebook],[data-pdf],[data-delm],[data-delev],[data-deluser]'); if (!t) return;
  const D = t.dataset;
  if (D.go) location.hash = D.go;
  if (D.ebook) { const d = DISC[+D.ebook]; reader(d.livro, d.nome + ' - ' + d.autor, ebookPages(d), 'livro-' + slug(d.nome)); }
  if (D.pdf) { const d = DISC[+D.pdf]; baixarPdf(ebookPages(d), 'livro-' + slug(d.nome)); }
  if (D.delm && confirm('Excluir este aviso?')) { mural = mural.filter(m => m.id !== D.delm); save('pemural', mural); render(); }
  if (D.delev && confirm('Excluir esta data?')) { eventos = eventos.filter(x => x.id !== D.delev); save('peeventos', eventos); render(); }
  if (D.deluser) {
    const x = users.find(v => v.id === D.deluser);
    if (x && confirm(`Remover ${x.nome}?`)) { users = users.filter(v => v.id !== D.deluser); delete notas[D.deluser]; save('peusers', users); save('penotas', notas); render(); }
  }
});
window.addEventListener('hashchange', () => { if (me()) render(); });

function boot() {
  loadAll();
  garantirCarteirinhas();
  const logado = !!me();
  $('#authScreen').hidden = logado; $('#appScreen').hidden = !logado;
  document.body.classList.toggle('auth-active', !logado);
  $('.site-footer').hidden = !logado;
  if (logado) {
    setTheme(load('petema', 'light'));   // restaura a escolha do usuário no painel
    render();
  } else {
    document.documentElement.setAttribute('data-theme', 'light'); // sem gravar: preserva a preferência
    chartJobs = [];
    renderAuth();
  }
}
seed();
boot();
