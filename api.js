const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  }
}

export const getCar = async (id) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body) => (await fetch(garage, 
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

export const deleteCar = async (id) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id, body) => (await fetch(`${garage}/${id}`, { 
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})).json();

export const startEngine = async (id) => (await fetch(`${garage}?id=${id}&status=started`)).json();

export const stopEngine = async (id) => (await fetch(`${garage}?id=${id}&status=stopped`)).json();

export const drive = async (id) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();
  console.log(response.status)
  return response.status !== 200 ? { success: false } : { ...(await response.json()) }
}

const getSortOrder = (sort, order) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`
  return '';
}

export const getWinners = async ({ page, limit = 10, sort, order }) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async winner => ({ ...winner, car: await getCar(winner.id)}))),
    count: response.headers.get('X-Total-Count')
  }
}

export const getWinner = async (id) => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id) => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body) => (await fetch(winners, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})).json();

export const updateWinner = async (id, body) => (await fetch(`${winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
})).json();

export const saveWinner = async ({ id, time }) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    })
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    })
  }
};

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  console.log(request.readyState)
}

// request.open('GET', '')