// Varriables
const courses = document.querySelector('#courses-list');




//Listeners
loadEventListeners();
function loadEventListeners() {
      //when a new course is added
      courses.addEventListener('click', buyCourse);
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
      console.log(course);
}