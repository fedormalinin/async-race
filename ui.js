import { getCars, createCar, getCar } from "./api.js";
window.onload = function() {
    let currentPage = 1;
    async function render () {
        document.querySelector('body').innerHTML = '';
    
        document.querySelector('body').innerHTML = `
            <button>To Garage</button>
            <button>To Winners</button><br>
            <div class="control-tracks">
                <form action="" method="GET">
                    <input type="text" placeholder="Name car" list="carnames">
                    <datalist id="carnames">
                        <option value="Folkswagen">
                        <option value="Lada">
                        <option value="Ferrari">
                        <option value="Toyota">
                        <option value="Honda">
                    </datalist>
                    <input class="color" type="color">
                    <button type="submit">Create</button>
                </form>
                <form action="" method="GET">
                    <input type="text" placeholder="Change name" list="carnames">
                    <datalist id="carnames">
                        <option value="Folkswagen">
                        <option value="Lada">
                        <option value="Ferrari">
                        <option value="Toyota">
                        <option value="Honda">
                    </datalist>
                    <input class="color" type="color">
                    <button type="submit">Update</button>
                </form>
                <button>Race</button>
                <button>Reset</button>
                <button>Generate cars</button>
            </div>
            <h1>Garage(<span class="car-amount">${await getCars().then(item => item.count)}</span>)</h1>
            <h2>Page</h2>
            <button class="add">Add 100 Random Cars</button><br><br>
            <div class="tracks"></div>
            <button class="previous">Previous</button>
            <button class="next">Next</button>
        `
    }
    render().then(() => {
        document.querySelector('.add').addEventListener('click', addCar);
        document.querySelector('.next').addEventListener('click', () => renderTracks(currentPage = currentPage + 1));
        document.querySelector('.previous').addEventListener('click', () => renderTracks(currentPage = currentPage - 1));
        renderTracks(currentPage);
    })
    
    function renderTracks (page) {
        if (page < 1) {
            page = 1;
            return;
        }
        document.querySelector('.tracks').innerHTML = '';
    
        getCars(page).then(data => data.items.forEach(element => {
            const track = document.createElement('div');
           
            track.classList.add('track');
    
            track.innerHTML = `
                <div id="${element.id}">
                    <button class="select">Select</button>
                    <button class="remove">Remove</button>
                    <button>A</button>
                    <button>B</button>
                        <div class="car-container">
                            <svg class="car-image" xmlns="http://www.w3.org/2000/svg" filter="drop-shadow(0 0 5px rgb(0 0 0 / 0.4))";
                            width="100" fill="${element.color}" version="1."
                            viewBox="0 0 981 378">
                            <path d="M231.5 1c-43.4.9-59.8 1.9-116 7.5-35.7 3.6-40.2 4.2-46.9 7-2.8 1.2-3.5 1.9-2.7 2.8 1.5 1.9-.3 8.5-3.6 12.3C40.2 56.5 29.7 74 22.1 96.9c-6.8 20.8-7.5 26.7-7.6 67.1v36.5L9.7 208C2.8 218.8.5 226.9.5 240.5c.1 20.7 8 42.2 19.4 52.8 8.2 7.6 13.4 9.3 36.5 12.2 10.5 1.3 25 3.3 32.1 4.5 13.4 2 26 2.6 25.1 1.2-.3-.5-1-5.9-1.6-12.1-2-19.6 1.5-40.2 9.6-56.4 12.3-24.5 34.9-43.1 62-50.9 6.9-2 10.1-2.3 24.4-2.2 14.5 0 17.7.3 26.2 2.7 35.9 9.6 65.1 41.3 70.7 76.7 2.1 12.6.9 32.7-2.6 46.7l-.5 2.3h408.8l-1.8-11.3c-2.5-14.7-2.6-38.1-.3-49.1 3.7-17.8 11.3-31.8 23.9-44.1 30-29.2 74.3-37.7 109.5-20.9 27.3 12.9 47.9 36.7 55.3 63.9 3.1 11.8 3.1 33.9-.1 48.5-1.3 5.8-2.4 11.2-2.5 12-.2 2.4 20.5 1.8 31.6-.9 18.5-4.4 40.6-19.5 45.8-31.3 2-4.7 5.2-25.7 7.1-46.8 1.5-17.3.7-38-2-48.1-6.9-26.5-25.6-47.2-50.1-55.3-10.5-3.4-94.4-15.3-142-20.1-30.7-3.1-49.8-7.3-67.9-14.9-11.6-4.9-19.9-10-36.4-22.4-18.5-14-49.5-33.4-108.2-67.9l-7-4.1-.8 2.4c-1.1 3-4.2 3.9-9.3 2.6-2.2-.6-6.6-1.3-9.9-1.6-78.1-7.5-76.4-7.4-183-8-49.5-.2-108.4 0-131 .4zm33.9 22.2c1.5.8 1.8 1.8 1.4 5.7-.4 4-2 7-9.7 18.2-20.3 29.7-40.8 57.5-44 59.6l-3.4 2.3H54l2.6-7.3c8.1-22.9 20.5-42.9 36.9-59.4C104 31.7 104.8 31.1 110 30.1c3-.5 26.6-2.2 52.5-3.6 25.9-1.5 57.1-3.2 69.5-4 22.5-1.3 29.8-1.1 33.4.7zm272.8 2.7c15.6 3.6 30.1 10.9 65.3 32.8l16 10 .3 23.1.2 23.2H470.9l.3-42 .3-42 3.2-3.2c4.3-4.3 7.8-4.7 33.3-4.3 17.2.3 23.2.7 30.2 2.4zM430 67.9v42.9l-23.7.7c-13.1.4-40.2.5-60.3.2-40.9-.7-44.2-1.2-51-7.3-4.8-4.3-6.4-9-5.7-16 .7-6.8 19.8-51.3 24.2-56.3 6.3-7.2 4.8-7.1 63.8-7.1H430v42.9z"/><path d="M782.6 191.6c-27.1 6-50.2 24-62.6 48.9-7.7 15.2-9.4 22.8-9.4 41.5.1 14 .3 16.4 2.8 24.4 6.8 22.3 19.9 40.1 38.5 52.1 15 9.7 31.5 14.5 49.9 14.5 16.3 0 28.6-2.7 41.7-9.3 18.8-9.4 32.3-23 41.5-42.2 7.6-15.5 8.5-20 8.4-40.5 0-16.5-.2-18-2.8-26-10.3-30.8-31-51.6-61.6-61.5-7.5-2.5-10.3-2.8-24-3.1-11.3-.3-17.4.1-22.4 1.2zm38.9 26.4c31 9.6 50.7 40.1 46.5 71.9-2.1 16.2-8.9 29.2-21 40.4-7.7 7.1-18 12.8-28 15.4-8.5 2.2-24.4 2.2-33-.1-24.4-6.3-42.9-25.1-48.6-49.1-2.4-10.6-1.5-26.7 2.1-36.5 10.4-28.1 36.4-45.8 65.5-44.6 5.8.3 12.2 1.3 16.5 2.6z"/><path d="M782.5 229.6c-4.4 1.9-8.1 3.6-8.2 3.8-.4.3 16.6 22.6 17.3 22.6.2 0 .4-6.8.4-15 0-8.3-.3-15-.7-14.9-.5 0-4.4 1.6-8.8 3.5zM813 241.3v15.2l10.7-10.9 10.7-10.8-6-2.5c-3.2-1.3-8-3.3-10.6-4.4L813 226v15.3zM751.3 259.3c-1.8 4.5-3.5 9-3.9 9.9-.6 1.7.4 1.8 12.5 1.8 7.2 0 13.1-.3 13.1-.6 0-.8-17.1-19.4-17.9-19.4-.3 0-2 3.7-3.8 8.3zM840.8 260.9l-8.7 9.6 12.6.3c6.9.1 12.8.1 13-.1.4-.5-6.5-17.8-7.5-18.8-.4-.4-4.6 3.6-9.4 9zM798 276.9c-1.7 1.6-3 3.6-3 4.4 0 1.3 5.5 10.3 6.8 11.1 1.2.7 7.6-8.5 7.5-10.6-.2-2.5-2-4.6-5.5-6.4-2.7-1.4-3-1.4-5.8 1.5zM747 292.7c0 .8 6 16.4 6.6 17.2.3.3 20.4-16.9 20.4-17.5 0-.2-6.1-.4-13.5-.4s-13.5.3-13.5.7zM840 301.5c5.2 5.2 9.8 9.5 10.1 9.5.4 0 1.2-1.2 1.7-2.8.6-1.5 2.2-5.7 3.6-9.5l2.6-6.7h-27.5l9.5 9.5zM780.6 318.4l-9.6 10.4 10 4 10 4v-14.4c0-7.9-.2-14.4-.4-14.4s-4.7 4.7-10 10.4zM813.7 308.6c-.8.9-.9 28.4-.1 28.4 1.7 0 17.4-7.4 17.4-8.2 0-.5-3.2-4.8-7.2-9.6-9.3-11.4-9.3-11.4-10.1-10.6zM190 195.9c-35.4 7.9-62.6 34.1-71.2 68.8-3 12.3-3 30.3.1 42.8 6.7 27.6 27.3 51.8 53.2 62.7 21.5 9 47.4 9.7 68.7 1.8 23.4-8.7 43.3-27.6 52.6-49.8 5.6-13.2 7.1-21 7-36.2-.1-20.1-4.4-34.8-14.9-50.5-12.9-19.3-32-32.9-55-39-9.6-2.6-30.2-2.9-40.5-.6zm34.5 25.6c8.9 2.3 21.3 8.7 27.8 14.5 40.2 36 24.4 100.8-27.7 114-30.5 7.7-62.5-7.5-76.1-36.2-14.2-29.9-3.9-64.9 24.5-83.4 5.6-3.6 17.1-8.4 23.5-9.7 5-1.1 22.5-.6 28 .8z"/><path d="M219 244.7v14.5l3.8-3c4.9-4 17.7-17 17.1-17.5-.2-.2-5-2.2-10.6-4.5l-10.3-4v14.5zM187.5 234.6c-4.4 1.9-8.1 3.7-8.4 3.9-.3.4 8.3 10.5 17.1 20 1.7 1.9 1.8 1.5 1.8-12.8 0-11.1-.3-14.7-1.2-14.6-.7 0-4.9 1.6-9.3 3.5zM159.1 259.8c-1.2 3.1-3.2 7.8-4.2 10.4L153 275h29.1l-9.8-10.5c-5.4-5.8-10-10.5-10.3-10.5-.3 0-1.6 2.6-2.9 5.8zM245.9 265.6c-5.7 4.7-10.5 9-10.7 9.5-.2.5 6.2.9 14.2.9 11.5 0 14.6-.3 14.6-1.3 0-1.4-6.2-16.3-7.2-17.2-.3-.3-5.2 3.3-10.9 8.1zM204.8 281.7c-1.8 1.5-3.5 2.8-3.7 3-.2.1.8 2.1 2.3 4.3 3.1 4.8 4.8 5 11.8 1.4l5.1-2.6-4.4-4.4c-2.4-2.4-5.1-4.4-6-4.4-1 0-3.2 1.2-5.1 2.7zM153 296.9c0 .5.9 2.8 1.9 5.2 1.1 2.4 2.6 6.1 3.5 8.2l1.6 3.8 9.2-8.1c5.1-4.5 9.5-8.6 9.6-9.1.2-.5-5.4-.9-12.7-.9-7.2 0-13.1.4-13.1.9zM244.9 304.9c8.6 9.4 10.9 11.6 11.5 11 .6-.6 7.6-18.2 7.6-19.1 0-.4-6.1-.8-13.6-.8h-13.6l8.1 8.9zM219 326.3v15.6l8.1-3.4c4.5-2 8.5-3.8 9-4.1.7-.4-11-16.8-16.3-22.9-.4-.5-.8 6.1-.8 14.8zM187.6 323.5c-11.1 10.5-11.3 9.1 1.7 14.5 4.3 1.8 8 3 8.3 2.8.2-.3.3-6.4.2-13.5l-.3-13-9.9 9.2z"/></svg>
                            <span class="car-name">${element.name}</span><br><br>
                        </div>
                    <hr>
                </div>
            `
            document.querySelector('.tracks').appendChild(track);
    }))
            .catch(err => console.error(err));
    }
    
    const carNames = ['Porsche', 'KIA', 'Mazda', 'Volvo', 'Nissan', 'Peugeot', 
    'Jaguar', 'Land Rover', 'Skoda', 'Suzuki', 'Audi'];
    const carModels = ['C-Class', '3-Series', 'G-Series', 'E-Class', 'CTS', '5-Series', 'MKZ', 'TSX', 'IS', 'S-Class']

    const addCar = () => {
        let count = 1;
        while(count <= 100) {

        const rndCar = carNames[Math.round(Math.random() * 10)] + ' ' + carModels[Math.round(Math.random() * 9)];
        createCar({
            "name": rndCar,
            "color": '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
        }).then(() => {
            getCars().then((resolve) => resolve.count).then((count) => {
                document.querySelector('.car-amount').innerHTML = count;
            })
        })
        count = count + 1;
        }
        renderTracks(currentPage);
    }
    
    
    // document.querySelector('.remove').addEventListener('click', )
}
