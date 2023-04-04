// Varriables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');
      clearCartBtn = document.querySelector('#clear-cart');




//Listeners
loadEventListeners();
function loadEventListeners() {
      //when a new course is added
      courses.addEventListener('click', buyCourse);

      shoppingCartContent.addEventListener('click', removeCourse);

      clearCartBtn.addEventListener('click', clearCart);

      document.addEventListener('DOMContentLoaded', getFromLocalStorage)
}






//Functions
function buyCourse(e) {
      e.preventDefault();
      //use delegation to find the course that was added to the cart
      if(e.target.classList.contains('add-to-cart')) {
            //read the course values
            const course = e.target.parentElement.parentElement;
            //read the value
            getCourseInfo(course);
      }
}
//read the html information of the selected course
function getCourseInfo(course) {
      const courseInfo = {
            image: course.querySelector('img').src,
            title: course.querySelector('h4').textContent,
            price: course.querySelector('.price span').textContent,
            id: course.querySelector('a').getAttribute('data-id')
      }
      //insert into the shopping cart
      addIntoCart(courseInfo);
}
function addIntoCart(course) {
      const row = document.createElement('tr');
      row.innerHTML = `
      <tr>
            <td>
                  <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                  <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
      </tr>
      `;
      shoppingCartContent.appendChild(row);
      saveIntoStorage(course);
}
function saveIntoStorage(course) {
      let courses = getCoursesFromStorage();

      courses.push(course);

      localStorage.setItem('courses', JSON.stringify(courses));
}
function getCoursesFromStorage() {
      let courses;
      if (localStorage.getItem('courses') === null) {
            courses = [];
      } else {
            courses = JSON.parse(localStorage.getItem('courses'));
      }
      return courses;
}
function removeCourse(e) {
      if (e.target.classList.contains('remove')){
            e.target.parentElement.parentElement.remove();
      }
}

function clearCart() {
      // shoppingCartContent.innerHTML = '';

      while(shoppingCartContent.firstChild) {
            shoppingCartContent.removeChild(shoppingCartContent.firstChild);
      }

      clearLocalStorage();

}
function clearLocalStorage() {
      localStorage.clear();
}
function getFromLocalStorage() {
      let coursesLS = getCoursesFromStorage();

      coursesLS.forEach(function(course) {
            const row = document.createElement('tr');

            row.innerHTML = `
            <tr>
                  <td>
                        <img src="${course.image}" width=100>
                  </td>
                  <td>${course.title}</td>
                  <td>${course.price}</td>
                  <td>
                        <a href="#" class="remove" data-id="${course.id}">X</a>
                  </td>
            </tr>
            `;
            shoppingCartContent.appendChild(row);
      });
}