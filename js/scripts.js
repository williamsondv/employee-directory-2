let employees;
let html = " ";
const gridContainer = document.getElementById('main');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
let currentIndex = 0;
let card;



  fetch(`https://randomuser.me/api/?results=12&inc=name, picture,
  email, location, phone, dob &noinfo &nat=US`)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))
  
  //add html for searchbar
  function addSearchBar() {
    let searchHtml = `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                      </form>`
    document.getElementsByClassName('search-container')[0].insertAdjacentHTML('beforeend', searchHtml);
  }

  //call to add searchbar function
  addSearchBar();

  //add event listeners for search bar and button
  document.getElementById('search-input').addEventListener('keyup', function(event){
    searchFunction();
  });

  //add html to gallery in order to display employee cards
  function displayEmployees(employeeData) {
    employees = employeeData;
    employees.forEach((employee, index) => {
        if(employee) {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        let state = employee.location.state;

        html += `<div class="card" data-index="${index}">
                  <div class="card-img-container">
                    <img class="card-img" src="${picture.large}" alt ="profile-picture" />
                  </div>
                  <div class="card-info-container">
                    <h3 class="name">${name.first} ${name.last}</h2>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                  </div>
                </div>`
        }

    });
        document.getElementById('gallery').insertAdjacentHTML('beforeend', html);
  }

  //open modal window on click, add listeners for close, next and previous butttons
  function displayModal(index) {
    currentIndex = index;
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${picture.large}" alt="profile-picture"/>
          <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h2>
          <p class="modal-text">${email}</p>
          <p class="modal-text cap"><a class="left-arrow"><span class="left"></span></a>${city}<a class="right-arrow"><span class="right"></span></a></p>
          <hr />
          <p class="modal-text">${phone}</p>
          <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
          <p class="modal-text">Birthday:
          ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
      </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", modalHTML);
    document.getElementById('modal-close-btn').addEventListener('click', () => {
      document.querySelector('.modal-container').remove();
      });
    selectEmployeeArrows();
    }

    

    //event listenter to display modal window
    document.getElementById('gallery').addEventListener('click', e => {
        if (e.target !== gridContainer) {
                const card = e.target.closest(".card");
                const index = card.getAttribute('data-index');
                displayModal(index);
            }
        });
           
    //search function to filter employees by name
    function searchFunction() {
        let input = document.getElementById("search-input");
        let filter = input.value.toUpperCase();
        let thumb = document.getElementsByClassName('card');
        let searchString;
           
        for(let i = 0; i < 12; i++) {
            searchString = document.getElementsByClassName('name')[i].textContent.toUpperCase();
            if(searchString.includes(filter)) {
                thumb[i].style.display = "flex"; 
              } else {
                 thumb[i].style.display = "none";
                }
                
               }
              
           }

    //eventlistener for previous and next
    function selectEmployeeArrows() {
      for(let i = 0; i < 2; i++){
         document.getElementsByClassName('btn')[i].addEventListener('click', function(event){
          if(event.target.getAttribute('id') == 'modal-next' && employees[(parseInt(currentIndex,10))+1]) {
           document.querySelector('.modal-container').remove();
           displayModal((parseInt(currentIndex,10))+1);
          }
          if(event.target.getAttribute('id') == 'modal-prev' && employees[(parseInt(currentIndex,10))-1]) {
            document.querySelector('.modal-container').remove();
            displayModal((parseInt(currentIndex,10))-1);
            }
        });
    }
  }
    