import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7OeKICrbbOwtHLjN8cnqTbB2j2qWYSyg",
  authDomain: "courseregistration-a066e.firebaseapp.com",
  projectId: "courseregistration-a066e",
  storageBucket: "courseregistration-a066e.appspot.com",
  messagingSenderId: "930658313804",
  appId: "1:930658313804:web:08adc1ffe2ef97d0c136e9",
  measurementId: "G-XF571J6GLJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// alert massage
const alertMassage = document.querySelector(".alert");
const overlay = document.querySelector(".overlay");

// ------------------Fetching json data & adding data to firebase
// fetch("courseData.txt")
//   .then((response) => response.json())
//   .then((data) => {
//     // Now 'data' is an array of objects
//     const courseData = JSON.parse(JSON.stringify(data));
//     console.log(courseData);

//     for (const obj of courseData) {
//       // 'obj' represents each object in the array
//       //   console.log(obj.code);
//       addDoc(collection(db, "courseData"), {
//         code: obj.code,
//         courseDescription: obj.courseDescription,
//         prereq: obj.prereq,
//         credit: obj.credit,
//       });
//     }
//   });

// const courses = [];

// const data = query(collection(db, "courseData"));

// const querySnapshot = getDocs(data);

// querySnapshot.then((snapshot) => {
//   snapshot.forEach((item) => {
//     courses.push(item.data().courseDescription);
//   });
// });
// console.log(courses);

// let nilCourses = [];

// const inputSection = document.querySelector(".inputSection");

const info = document.querySelector(".info", ".unactive");

window.addEventListener("load", (e) => {
  e.preventDefault();
  const loader = document.querySelector(".loader");

  loader.classList.add("active");

  function loading() {
    loader.classList.remove("active");
    info.classList.remove("unactive");

    getDataFromLocalStorage();
  }
  setTimeout(loading, "500");
  const checkCoursesArray = JSON.parse(localStorage.getItem("courses")) || [];

  if (checkCoursesArray.length === 0) {
    getCourses();
  }
});

let courses = [];
let completedCourses = [];
let availableCourses = [];

const input = document.getElementById("content");
const suggestionList = document.getElementById("suggestionList");
const add = document.getElementById("add");

let creditCompleted = 0;
let creditTaken = 0;

const creditCompletedDiv = document.getElementById("creditCompleted");
const creditTakenDiv = document.getElementById("creditTaken");

const getCourses = async () => {
  courses = [];
  const data = query(collection(db, "courseData"));
  const querySnapshot = await getDocs(data);

  querySnapshot.forEach((item) => {
    courses.push(item.data().courseDescription);
  });

  courses.sort();

  // courses = courses.filter(
  //   (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  // );

  const coursesJSON = JSON.stringify(courses);
  localStorage.setItem("courses", coursesJSON);
  // console.log(courses);
};

function updateLocalStorage(completedCourses, availableCourses) {
  // Convert the array of objects to a JSON string

  const completedCoursesJSON = JSON.stringify(completedCourses);
  const availableCoursesJSON = JSON.stringify(availableCourses);

  // Set the JSON string in local storage under a specific key
  localStorage.setItem("completedCourses", completedCoursesJSON);
  localStorage.setItem("availableCourses", availableCoursesJSON);
}

function getDataFromLocalStorage() {
  const completedCoursesJSON = localStorage.getItem("completedCourses");
  const availableCoursesJSON = localStorage.getItem("availableCourses");
  const coursesJSON = localStorage.getItem("courses");

  // Parse the JSON string back into an array of objects
  completedCourses = JSON.parse(completedCoursesJSON);
  availableCourses = JSON.parse(availableCoursesJSON);
  courses = JSON.parse(coursesJSON);

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);
}

function checkDuplicate(userInput) {
  completedCourses.forEach((course) => {
    if (course.courseDescription == userInput) {
      alertMassage.innerHTML = `<h2>Already added</h2>
      <button class="ok">Ok</button>`;
      alertMassage.classList.add("active");
      overlay.classList.add("active");

      const ok = document.querySelector(".ok");

      ok.addEventListener("click", (e) => {
        alertMassage.classList.remove("active");
        overlay.classList.remove("active");
      });
      return;
    }
  });
  checkValid(userInput);
}

function checkValid(userInput) {
  let found = false;
  courses.forEach((course) => {
    if (course == userInput) {
      found = true;
    }
  });
  if (!found) {
    alertMassage.innerHTML = `<h2>Invalid Course</h2>
    <button class="ok">Ok</button>`;
    alertMassage.classList.add("active");
    overlay.classList.add("active");

    const ok = document.querySelector(".ok");

    ok.addEventListener("click", (e) => {
      alertMassage.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
  return;
}

function showSuggestions(userInput) {
  suggestionList.innerHTML = "";

  const matchingWords = courses.filter((word) => word.startsWith(userInput));

  matchingWords.forEach((word) => {
    const listItem = document.createElement("li");
    listItem.textContent = word;
    listItem.addEventListener("click", function () {
      input.value = word;
      input.focus();
      showSuggestions(word);
    });
    suggestionList.appendChild(listItem);
  });
}

input.addEventListener("focus", (e) => {
  suggestionList.classList.add("active");
  showSuggestions("");
});

input.addEventListener("keyup", (e) => {
  const userInput = e.target.value.trim().toUpperCase();

  if (e.key === "Enter") {
    checkDuplicate(userInput);
    getResults(userInput);

    input.value = "";
    // suggestionList.innerHTML = "";
    showSuggestions("");

    return;
  }
  // Show suggestions based on user input
  showSuggestions(userInput);
});

add.addEventListener("click", (e) => {
  suggestionList.classList.remove("active");

  const userInput = input.value.trim().toUpperCase();

  checkDuplicate(userInput);
  getResults(userInput);

  input.value = "";
  // suggestionList.innerHTML = "";
  showSuggestions("");
});

function CreditCompleted(completedCourses) {
  creditCompleted = 0;
  completedCourses.forEach((item) => {
    if (item.credit == "3/LAB") {
      creditCompleted += 3;
    } else {
      creditCompleted += parseInt(item.credit);
    }
  });

  creditCompletedDiv.innerHTML = `Credit Completed : ${creditCompleted}`;
  // console.log("creditCompleted : ", creditCompleted);
}

// async function setNill() {
//   const data = query(collection(db, "courseData"));
//   const querySnapshot = await getDocs(data);

//   querySnapshot.forEach((item) => {
//     const Prereq = item.data().prereq;
//     // console.log(Prereq);
//     if (Prereq == "Nil") {
//       availableCourses.push({ ...item.data(), id: item.id });
//     }
//   });
//   console.log(availableCourses);
//   updateLocalStorage(completedCourses, availableCourses);
// }
// setNill();

// const getData = async () => {
//   const data = query(collection(db, "courseData"));
//   const querySnapshot = await getDocs(data);
//   console.log("Get Data");
//   if (completedCourses.length > 0) {
//     completedCourses.forEach((Course) => {
//       querySnapshot.forEach((item) => {
//         // const Code = Course.code.replace(/\s+/g, "");
//         // const Prereq = item.data().prereq.replace(/\s+/g, "");

//         if (item.data().prereq == "Nil" && item.data() != Course) {
//           // console.log(item.data().courseDescription);
//           availableCourses.push({ ...item.data(), id: item.id });
//         }
//       });
//     });
//   } else {
//     querySnapshot.forEach((item) => {
//       // const Code = Course.code.replace(/\s+/g, "");
//       // const Prereq = item.data().prereq.replace(/\s+/g, "");

//       if (item.data().prereq == "Nil") {
//         // console.log(item.data().courseDescription);
//         availableCourses.push({ ...item.data(), id: item.id });
//       }
//     });
//   }
//   availableCourses = availableCourses.filter(
//     (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
//   );

//   createCompletedCourse(completedCourses);
//   createAvailableCourse(availableCourses);

//   updateLocalStorage(completedCourses, availableCourses);
// };
// getData();

const getResults = async (Course) => {
  const data = query(collection(db, "courseData"));
  const querySnapshot = await getDocs(data);

  querySnapshot.forEach((item) => {
    if (item.data().courseDescription == Course) {
      completedCourses.push({ ...item.data(), id: item.id });

      CreditCompleted(completedCourses);

      const Code = item.data().code.replace(/\s+/g, "");
      // console.log(Code);
      querySnapshot.forEach((item) => {
        const Prereq = item.data().prereq.replace(/\s+/g, "");
        // console.log(creditCompleted.toString());
        if (
          Prereq.includes(Code) ||
          Prereq == "Nil" ||
          Prereq == creditCompleted.toString()
        ) {
          // console.log(item.data().courseDescription);
          availableCourses.push({ ...item.data(), id: item.id });
        }
      });
    }
  });

  let valuesToRemove = completedCourses.map((obj) => obj.courseDescription);

  availableCourses = availableCourses.filter(
    (obj) => !valuesToRemove.includes(obj.courseDescription)
  );

  completedCourses = completedCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  );

  availableCourses = availableCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
  );

  console.log(completedCourses);
  console.log(availableCourses);

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);

  updateLocalStorage(completedCourses, availableCourses);
};

const deleteCompletedCourse = async (deleteCourseCode) => {
  completedCourses = completedCourses.filter(
    (obj) => obj.code !== deleteCourseCode
  );
  // availableCourses = availableCourses.filter(
  //   (obj) => obj.prereq !== deleteCourseCode
  // );
  availableCourses = [];

  const data = query(collection(db, "courseData"));
  const querySnapshot = await getDocs(data);

  completedCourses.forEach((Course) => {
    querySnapshot.forEach((item) => {
      const Code = Course.code.replace(/\s+/g, "");
      const Prereq = item.data().prereq.replace(/\s+/g, "");

      if (Prereq.includes(Code) || Prereq == "Nil") {
        // console.log(item.data().courseDescription);
        availableCourses.push({ ...item.data(), id: item.id });
      }
    });
  });

  let valuesToRemove = completedCourses.map((obj) => obj.courseDescription);

  availableCourses = availableCourses.filter(
    (obj) => !valuesToRemove.includes(obj.courseDescription)
  );

  console.log(completedCourses);
  console.log(availableCourses);

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);

  // getData();

  updateLocalStorage(completedCourses, availableCourses);
};

function createCompletedCourse(completedCourses) {
  const completedSection = document.querySelector(".completed");
  completedSection.innerHTML = `<div class='emptyTitle'>No completed course added</div>`;

  if (completedCourses.length > 0) {
    completedSection.innerHTML = "";
  }

  completedCourses.forEach((item) => {
    const courseItem = document.createElement("div");
    courseItem.classList.add("sub");

    const credit = document.createElement("span");
    credit.classList.add("credit");

    const content = document.createElement("div");
    content.classList.add("content");

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");

    // const docRef = doc(db, "courseData", item.id);

    content.innerHTML = `<ul>${item.courseDescription}</ul>`;
    credit.innerHTML = `${item.credit}`;
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    actions.appendChild(deleteButton);

    courseItem.appendChild(actions);
    courseItem.appendChild(content);
    courseItem.appendChild(credit);
    completedSection.appendChild(courseItem);

    // delete method

    deleteButton.addEventListener("click", (e) => {
      // deleteDoc(docRef);

      courseItem.remove();
      deleteCompletedCourse(item.code);

      if (completedSection.childNodes.length == 0) {
        //   completedSection.innerHTML = "";
        completedSection.innerHTML = `<div class='emptyTitle'>No completed course added</div>`;
      }
    });
  });
}

function createAvailableCourse(availableCourses) {
  const availableSection = document.querySelector(".available");
  availableSection.innerHTML = `<div class='emptyTitle'>No course available</div>`;

  creditTakenDiv.innerHTML = `Credit Taken : ${creditTaken}`;

  if (availableCourses.length > 0) {
    availableSection.innerHTML = "";
  }

  availableCourses.forEach((item) => {
    const courseItem = document.createElement("div");
    courseItem.classList.add("sub");

    const label = document.createElement("label");

    let done = false;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = done;

    const span = document.createElement("span");
    span.classList.add("checkbox");
    span.classList.add("medium");

    label.appendChild(checkbox);
    label.appendChild(span);

    const credit = document.createElement("span");
    credit.classList.add("credit");

    const content = document.createElement("div");
    content.classList.add("content");

    // const docRef = doc(db, "courseData", item.id);

    content.innerHTML = `<ul>${item.courseDescription}</ul>`;
    credit.innerHTML = `${item.credit}`;

    courseItem.appendChild(label);
    courseItem.appendChild(content);
    courseItem.appendChild(credit);
    availableSection.appendChild(courseItem);

    checkbox.addEventListener("click", (e) => {
      done = e.target.checked;

      if (done) {
        courseItem.classList.add("done");

        if (item.credit == "3/LAB") {
          creditTaken += 3;
        } else {
          creditTaken += parseInt(item.credit);
        }
      } else {
        courseItem.classList.remove("done");

        if (item.credit == "3/LAB") {
          creditTaken -= 3;
        } else {
          creditTaken -= parseInt(item.credit);
        }
      }

      creditTakenDiv.innerHTML = `Credit Taken : ${creditTaken}`;
      // console.log("creditTaken: ", creditTaken);
    });

    // delete method
  });
}
