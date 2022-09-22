import './style.css';
import { icbers } from './data';

console.clear();
const icbs = icbers.icb;

const te = document.getElementById('time-incident') as HTMLInputElement;
const de = document.getElementById('date-incident') as HTMLInputElement;

var date1 = new Date(2022, 8, 22, 23, 30);
const createUtcDate = (date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  );
//de.value = ymd;
//te.value = displayTime;
de.valueAsDate = createUtcDate(date1);
te.valueAsDate = createUtcDate(date1);
const combineToDate = (utcTime, utcDate) => {
  if (utcTime && utcDate) {
    return new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate(),
      utcTime.getUTCHours(),
      utcTime.getUTCMinutes()
    );
  }
  return undefined;
};
const utcTime = te.valueAsDate;
const utcDate = de.valueAsDate;
var date2 = new Date(
  utcDate.getUTCFullYear(),
  utcDate.getUTCMonth(),
  utcDate.getUTCDate(),
  utcTime.getUTCHours(),
  utcTime.getUTCMinutes()
);

const plusMinutes = document.getElementById('plus-minutes') as HTMLInputElement;
plusMinutes.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 'Tab') {
    if (plusMinutes.value.startsWith('+')) {
      const cnt = plusMinutes.value.substring(1);
      const count = Number(cnt);
      if (count !== NaN) {
        const utcTime = te.valueAsDate;
        const utcDate = de.valueAsDate;
        const date = combineToDate(utcTime, utcDate);
        if (date) {
          date.setMinutes(date.getMinutes() + count);
          de.valueAsDate = createUtcDate(date);
          te.valueAsDate = createUtcDate(date);
          const event = new Event('change');
          te.dispatchEvent(event);
        }
      }
    }
    plusMinutes.style.display = 'none';
  }
});
plusMinutes.addEventListener('blur', (event) => {
  plusMinutes.style.display = 'none';
});
te.addEventListener('change', (event) => {
  console.log(`time change:  ${combineToDate(te.valueAsDate, de.valueAsDate)}`);
});
de.addEventListener('change', (event) => {
  console.log(`date change:  ${combineToDate(te.valueAsDate, de.valueAsDate)}`);
});

te.addEventListener('keydown', (event) => {
  if (event.key === '+') {
    plusMinutes.value = '';
    plusMinutes.style.position = 'absolute';
    plusMinutes.style.display = 'block';
    plusMinutes.style.left = `${te.getBoundingClientRect().left}px`;
    plusMinutes.style.top = `${te.getBoundingClientRect().top}px`;
    //plusMinutes.value = '+'
    plusMinutes.focus();
  }
});

const months = [
  'Jan',
  'Feb',
  'Mrt',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Okt',
  'Nov',
  'Dec',
];

const formatDate = (date: Date) => {
  const maand = months[date.getMonth()];
  const dag = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const uur = (date.getHours() < 10 ? '0' : '') + date.getHours();
  const minuten = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return `${dag} ${maand} ${uur}:${minuten}`;
};
const getTitle = (competenties) => competenties.join(', ');
const element = document.getElementById('app');
element.innerHTML = `
<div class="icb-location-container">
  <div class="icb-row icb-row-header">
    <div class="icb-naam">Naam</div>
    <div class="icb-rol">Rol</div>
    <div class="icb-vantot">Beschikbaar</div>
    <div class="icb-comp">Competenties</div>
    <div class="icb-voertuig">Voertuig-ID</div>
    <div class="icb-kenteken">Kenteken</div>
  </div>
  ${icbs
    .map(
      (icb) => `<div class="icb-row"> 
    <div class="icb-naam">${icb.naam}</div>
    <div class="icb-rol">${icb.icbRol}</div>
    <div class="icb-vantot"><div class="align-right">${formatDate(
      new Date(icb.vanaf)
    )}</div><div class="align-right">t/m ${formatDate(
        new Date(icb.totMet)
      )}</div></div>
    <div class="icb-comp">${getTitle(icb.competenties)}</div>
    <div class="icb-voertuig">${icb.voertuigId}</div>
    <div class="icb-kenteken">${icb.kenteken}</div>
    </div>`
    )
    .join('')} 
</div>`;

const grid = document.getElementById('grid');

icbs.reduce((acc, cur) => {
  ['naam', 'icbRol', 'vanaf', 'competenties', 'voertuigId', 'kenteken'].reduce(
    (acc1, cur1) => {
      const item = document.createElement('div');
      item.textContent = cur[cur1];
      item.classList.add('icb-item');
      acc1.appendChild(item);
      return acc1;
    },
    grid
  );
  return acc;
}, grid);

const elementHasEllipsis = (element) => {
  const clonedTarget = element.cloneNode(true);
  clonedTarget.style.display = 'inline';
  clonedTarget.style.width = 'auto';
  clonedTarget.style.visibility = 'hidden';
  document.body.appendChild(clonedTarget);
  const w2 = clonedTarget.offsetWidth;
  clonedTarget.remove();
  const w1 = element.offsetWidth;
  return w2 > w1;
};
let tooltipElement;
grid.addEventListener(
  'click',
  function (e) {
    if (tooltipElement) {
      tooltipElement.style.visibility = 'hidden';
    }
    const target = e.target as HTMLElement;
    if (elementHasEllipsis(target)) {
      tooltipElement = target.querySelector('.icb-tooltip');
      if (tooltipElement) {
        tooltipElement.style.visibility = 'visible';
      }
      const text = target.textContent || target.innerText;
      console.log(text);
    }
  },
  false
);

const icbGrid = document.getElementById('icb-grid');

const addHeader = (element) => {
  const grid = document.createElement('div');
  grid.setAttribute('id', 'int-grid');
  grid.classList.add('grid');

  grid.innerHTML = `<div class="icb-header-item">Naam</div>
	<div class="icb-header-item">Rol</div>
	<div class="icb-header-item">Beschikbaar</div>
	<div class="icb-header-item">Competenties</div>
	<div class="icb-header-item"><span class="emoji">🚗</span>-ID</div>
	<div class="icb-header-item">Kenteken</div>`;
  element.appendChild(grid);
  return element;
};

const gridContainer = addHeader(icbGrid);

const addContent = () => {
  const icbGrid = document.getElementById('int-grid');
  const item = document.createElement('div');
  item.textContent = 'hello';
  item.classList.add('icb-item');
  icbGrid.appendChild(item);
};
addContent();
const kernId = 'kern';
const addKern = () => {
  const myFragment = document.createDocumentFragment();
  const kern = document.createElement('div');
  kern.setAttribute('id', kernId);
  myFragment.appendChild(kern);
  return myFragment;
};

const addToKern = (myFragment) => {
  const kern = myFragment.getElementById(kernId);
  const q = document.createElement('div');
  q.textContent = 'queen';
  kern.appendChild(q);
};
const myFragment = addKern();
addToKern(myFragment);
const deze = document.createElement('div');
document.body.appendChild(deze);
deze.appendChild(myFragment);
