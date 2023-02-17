let id = JSON.parse(localStorage.getItem('id')) || 0;

function saveInfo() {
  id++;
  const info = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    address: document.getElementById('address').value,
    carType: document.getElementById('car-type').value,
    carNumber: document.getElementById('car-number').value,
    id: id
  };
  localStorage.setItem(id, JSON.stringify(info));
  localStorage.setItem('id', id);
  alert('저장되었습니다.');
}

function getInfo() {
  const infoList = [];
  let maxId = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (/^\d+$/.test(key)) {
      const id = parseInt(key, 10);
      const info = JSON.parse(localStorage.getItem(key));
      infoList.push(info);
      if (id > maxId) {
        maxId = id;
      }
    }
  }
  id = maxId;
  return infoList;
}

// 저장된 정보를 불러오기
const savedInfo = JSON.parse(localStorage.getItem('info')) || [];

// 저장된 정보를 출력하는 함수
let info;

function showInfo(info) {
    const tableBody = document.getElementById('info-table');
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${info.id}</td>
      <td>${info.carType}</td>
      <td>${info.carNumber}</td>
      <td>${info.name}</td>
      <td>${info.age}</td>
      <td>${info.address}</td>
    `;
    tableBody.appendChild(tableRow);
    tableRow.onclick = () => showInfoByCarNumber(info.carNumber);
    window.info = info;
  }

  function showSavedInfo() {
    const infoList = getInfo();
    const tableBody = document.getElementById('info-table');
    tableBody.innerHTML = '';
    if (infoList.length === 0) {
      let tableRow = document.createElement('tr');
      tableRow.innerHTML = `<td colspan="7">저장된 정보가 없습니다.</td>`;
      tableBody.appendChild(tableRow);
    } else {
      infoList.forEach(info => showInfo(info));
    }
  }
  function deleteInfo(id) {
    localStorage.removeItem(id);
    const tableBody = document.getElementById('info-table');
    tableBody.innerHTML = '';
    const infoList = getInfo();
    infoList.forEach(info => showInfo(info));
  }
  
  function showInfo(info) {
    const tableBody = document.getElementById('info-table');
    const row = document.createElement('tr');
  
    const idCell = document.createElement('td');
    idCell.textContent = info.id;
  
    const carTypeCell = document.createElement('td');
    carTypeCell.textContent = info.carType;
  
    const carNumberCell = document.createElement('td');
    carNumberCell.textContent = info.carNumber;
  
    const nameCell = document.createElement('td');
    nameCell.textContent = info.name;
  
    const ageCell = document.createElement('td');
    ageCell.textContent = info.age;
  
    const addressCell = document.createElement('td');
    addressCell.textContent = info.address;
  
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      deleteInfo(info.id);
    });
    deleteButtonCell.appendChild(deleteButton);
  
    row.appendChild(idCell);
    row.appendChild(carTypeCell);
    row.appendChild(carNumberCell);
    row.appendChild(nameCell);
    row.appendChild(ageCell);
    row.appendChild(addressCell);
    row.appendChild(deleteButtonCell);
  
    tableBody.appendChild(row);
  }
  
  function showInfoByCarNumber(carNumber) {
    const infoList = getInfo().filter(info => info.carNumber === carNumber);
    const tableBody = document.getElementById('info-table');
    tableBody.innerHTML = '';
    if (infoList.length === 0) {
      let tableRow = document.createElement('tr');
      tableRow.innerHTML = `<td colspan="7">일치하는 차량번호의 정보가 없습니다.</td>`;
      tableBody.appendChild(tableRow);
    } else {
      infoList.forEach(info => showInfo(info));
    }
  }
// 저장된 정보를 순서대로 출력
savedInfo.forEach(info => showInfo(info));

// 차량번호 별 그룹
function groupByCarNumber(infoList) {
  const group = {};
  infoList.forEach(info => {
    if (!group[info.carNumber]) {
      group[info.carNumber] = [];
    }
    group[info.carNumber].push(info);
  });
  return group;
}

const infoList = getInfo();
const group = groupByCarNumber(infoList);
console.log(group);  // 예시: { "12가3456": [ {...}, {...} ], "34나5678": [ {...} ] }

// select 요소 초기화
const carNumberSelect = document.getElementById('carNumber');
const carNumberList = Object.keys(group);
carNumberList.forEach(carNumber => {
  const option = document.createElement('option');
  option.value = carNumber;
  option.textContent = carNumber;
  carNumberSelect.appendChild(option);
});

// select 요소 변경 시, 해당 차량번호의 정보를 출력
carNumberSelect.addEventListener('change', () => {
  const carNumber = carNumberSelect.value;
  const tableBody = document.getElementById('info-table');
  tableBody.innerHTML = '';
  group[carNumber].forEach(info => showInfo(info));
});

