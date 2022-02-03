//variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');



//listeners
loadEventListener();
function loadEventListener() {
      //when new course added
      courses.addEventListener('click', buyCourse);
      //when the remove button clicked
      shoppingCartContent.addEventListener('click', removeCourse);
      //clear cart btn
      clearCartBtn.addEventListener('click', clearCart);

      //document ready
      document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}




//functions
function buyCourse(e) {
      e.preventDefault();
      //use deligation to find the course that was added
      if (e.target.classList.contains('add-to-cart')) {
            //read the course values
            const course = e.target.parentElement.parentElement;
            //read the values
            getCourseInfo(course);
      }
}      

function getCourseInfo(course) {
     //creat an object
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
      //creat a tr
      const row = document.createElement('tr');
      //build the template
      row.innerHTML = `
            <tr>
                  <td>
                        <img src="${course.image}" width=100>
                  </td>
                  <td>
                        ${course.title}
                  </td>
                  <td>
                        ${course.price}
                  </td>
                  <td>
                        <a href="#" class="remove" data-id="${course.id}">X</a>
                  </td>
            </tr>
      `;
      //add into the shopping cart
      shoppingCartContent.appendChild(row);

      //Add course into Storage
      saveIntoStorage(course);


}

//add the courses into the local storage

function saveIntoStorage(course) {
      let courses = getCoursesFromStorage();

      //add the courxse into the array
      courses.push(course);
//since storage only saves strings, we need to convert JSON into String
      localStorage.setItem('courses', JSON.stringify(courses) );

}

//get the content from the storage

function getCoursesFromStorage() {
      let courses;

      //if sth exist on storage then we get the value, otherwise create an empty array

      if(localStorage.getItem('courses') === null) {
            courses = [];
      } else {
            courses = JSON.parse(localStorage.getItem('courses') );
      }
      return courses;
}





//remove course from the dom
function removeCourse(e) {
      let course,courseId;
      // e.preventDefault();
      if(e.target.classList.contains('remove')) {
            e.target.parentElement.parentElement.remove();
            course = e.target.parentElement.parentElement;
            courseId = course.querySelector('a').getAttribute('data-id');
      }
      console.log(courseId);
      //remove from local storage
      removeCourseLocalStorage(courseId);
}
//remove from the local storage

function removeCourseLocalStorage(id) {
      let coursesLS = getCoursesFromStorage();

      //loop throught the array and find the index to remove
      coursesLS.forEach(function(courseLS, index) {
            if(courseLS.id === id) {
                  coursesLS.splice(index, 1);
            }
      });
      //add the rest of the arary
      localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//clears the shopping cart
function clearCart() {
      // shoppingCartContent.innerHTML = '';

      while(shoppingCartContent.firstChild){
      shoppingCartContent.removeChild(shoppingCartContent.firstChild);
      }

      //clear from local stortage
      clearLocalStorage();
}

//clears the whole local storage

function clearLocalStorage() {
      localStorage.clear();
}

// Loades when document is ready and print courses into shopping cart

function getFromLocalStorage() {
      let coursesLS = getCoursesFromStorage();

      //loop throught the coursse4s and print to tthe cart

      coursesLS.forEach(function(course) {
            //create tr
            const row = document.createElement('tr');
            //print the content
                  row.innerHTML = `
                  <tr>
                        <td>
                              <img src="${course.image}" width=100>
                        </td>
                        <td>
                              ${course.title}
                        </td>
                        <td>
                              ${course.price}
                        </td>
                        <td>
                              <a href="#" class="remove" data-id="${course.id}">X</a>
                        </td>
                  </tr>
            `;
            shoppingCartContent.appendChild(row);
      });
}