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

let courseDataJSON = `[{"code":"MAT1102","courseDescription":"DIFFERENTIAL CALCULUS & CO-ORDINATE GEOMETRY","prereq":"Nil","credit":"3"},{"code":"PHY 1101","courseDescription":"PHYSICS 1","prereq":"Nil","credit":"3"},{"code":"PHY 1102","courseDescription":"PHYSICS 1 LAB","prereq":"Nil","credit":"1"},{"code":"ENG1101","courseDescription":"ENGLISH READING SKILLS & PUBLIC SPEAKING","prereq":"Nil","credit":"3"},{"code":"CSC 1101","courseDescription":"INTRODUCTION TO COMPUTERSTUDIES",
"prereq":"Nil","credit":"1"},{"code":"CSC 1103","courseDescription":"INTRODUCTION TO PROGRAMMING LAB","prereq":"Nil","credit":"1"},{"code":"CSC 1102","courseDescription":"INTRODUCTION TO PROGRAMMING","prereq":"Nil","credit":"3"},{"code":"CSC1204","courseDescription":"DISCRETE MATHEMATICS","prereq":"MAT1102 & CSC1102","credit":"3"},{"code":"MAT1205","courseDescription":"INTEGRAL CALCULUS & ORDINARY DIFFERENTIAL EQUATIONS",
"prereq":"MAT1102","credit":"3"},{"code":"CSC1205","courseDescription":"OBJECT ORIENTED PROGRAMMING 1","prereq":"CSC1102 & CSC1103","credit":"3/LAB"},{"code":"PHY1203","courseDescription":"PHYSICS 2","prereq":"PHY1101","credit":"3"},{"code":"PHY1204","courseDescription":"PHYSICS 2 LAB",
 "prereq":"PHY1102","credit":"1"},{"code":"ENG1202","courseDescription":"ENGLISH WRITING SKILLS & COMMUNICATIONS","prereq":"ENG1101","credit":"3"},{"code":"COE2101","courseDescription":"INTRODUCTION TO ELECTRICAL CIRCUITS","prereq":"PHY1101","credit":"3"},{"code":"COE2102","courseDescription":"INTRODUCTION TO ELECTRICAL CIRCUITS LAB","prereq":"PHY1102","credit":"1"},{"code":"CHEM1101","courseDescription":"CHEMISTRY",
 "prereq":"PHY1203","credit":"3"},{"code":"MAT2101","courseDescription":"COMPLEX VARIABLE,LAPLACE & Z-TRANSFORMATION","prereq":"MAT1205","credit":"3"},{"code":"CSC2108","courseDescription":"INTRODUCTION TO DATABASE","prereq":"CSC1205","credit":"3/LAB"},{"code":"EEE2104","courseDescription":"ELECTRONIC DEVICES LAB","prereq":"COE2102","credit":"1"},{"code":"BBA1102","courseDescription":"PRINCIPLES OF ACCOUNTING",
 "prereq":"MAT1205","credit":"3"},{"code":"EEE2103","courseDescription":"ELECTRONIC DEVICES","prereq":"COE2101","credit":"3"},{"code":"CSC2106","courseDescription":"DATA STRUCTURE","prereq":"CSC1204 & CSC1205","credit":"3"},{"code":"CSC2107","courseDescription":"DATA STRUCTURE LAB",
 "prereq":"CSC1204 & CSC1205","credit":"1"},{"code":"BAE2101","courseDescription":"COMPUTER AIDED DESIGN & DRAFTING","prereq":"Nil","credit":"1"},{"code":"CSC2211","courseDescription":"ALGORITHMS","prereq":"CSC2106","credit":"3/LAB"},{"code":"MAT2202","courseDescription":"MATRICES, VECTORS, FOURIER ANALYSIS",
 "prereq":"MAT2101","credit":"3"},{"code":"CSC2210","courseDescription":"OBJECT ORIENTED PROGRAMMING 2","prereq":"CSC2106 CSC2108","credit":"3/LAB"},{"code":"CSC2209","courseDescription":"OBJECT ORIENTED ANALYSIS AND DESIGN","prereq":"CSC2108","credit":"3"},{"code":"BAS2101","courseDescription":"BANGLADESH STUDIES",
 "prereq":"CSC1101","credit":"3"},{"code":"EEE3101","courseDescription":"DIGITAL LOGIC AND CIRCUITS","prereq":"EEE2103","credit":"3"},{"code":"EEE3102","courseDescription":"DIGITAL LOGIC AND CIRCUITS LAB","prereq":"EEE2104","credit":"1"},{"code":"MAT3103","courseDescription":"COMPUTATIONAL STATISTICS AND PROBABILITY",
 "prereq":"MAT2101","credit":"3"},{"code":"CSC3113","courseDescription":"THEORY OF COMPUTATION","prereq":"CSC2211","credit":"3"},{"code":"ECO3150","courseDescription":"PRINCIPLES OF ECONOMICS","prereq":"MAT3103","credit":"2"},{"code":"ENG2103","courseDescription":"BUSINESS COMMUNICATION",
 "prereq":"BAS2101","credit":"3"},{"code":"MAT3101","courseDescription":"NUMERICAL METHODS FOR SCIENCE AND ENGINEERING","prereq":"MAT2202","credit":"3"},{"code":"COE3103","courseDescription":"DATA COMMUNICATION","prereq":"EEE3101 & EEE3102","credit":"3/LAB"},{"code":"COE3104","courseDescription":"MICROPROCESSOR AND EMBEDDED SYSTEMS",
 "prereq":"EEE3101 & EEE3102","credit":"3"},{"code":"CSC3112","courseDescription":"SOFTWARE ENGINEERING","prereq":"CSC2209","credit":"3/LAB"},{"code":"CSC3217","courseDescription":"ARTIFICIAL INTELLIGENCE AND EXPERT SYSTEM","prereq":"CSC2211 & MAT3103","credit":"3/LAB"},{"code":"COE3206","courseDescription":"COMPUTER NETWORKS",
 "prereq":"COE3103","credit":"3/LAB"},{"code":"COE3205","courseDescription":"COMPUTER ORGANIZATION AND ARCHITECTURE","prereq":"COE3104","credit":"3/LAB"},{"code":"CSC3214","courseDescription":"OPERATING SYSTEM","prereq":"CSC2211 & COE3104","credit":"3/LAB"},{"code":"CSC3215","courseDescription":"WEB TECHNOLOGIES",
 "prereq":"CSC3112","credit":"3/LAB"},{"code":"EEE2216","courseDescription":"ENGINEERING ETHICS","prereq":"CSC3112 & COE3104","credit":"2"},{"code":"CSC3216","courseDescription":"COMPILER DESIGN","prereq":"CSC3113","credit":"3/LAB"},{"code":"CSC4118","courseDescription":"COMPUTER GRAPHICS",
 "prereq":"CSC2211 & MAT2202","credit":"3/LAB"},{"code":"MGT3202","courseDescription":"ENGINEERING MANAGEMENT","prereq":"EEE2216","credit":"3"},{"code":"CSC4197","courseDescription":"RESEARCH METHODOLOGY","prereq":"100","credit":"3"},{"code":"CSC4299","courseDescription":"THESIS",
 "prereq":"CSC4197","credit":"3"},{"code":"CSC4296","courseDescription":"INTERNSHIP","prereq":"139","credit":"3"},{"code":"CSC4181","courseDescription":"ADVANCE DATABASE MANAGEMENT SYSTEM",
 "prereq":"CSC2108","credit":"3/LAB"},{"code":"MIS3101","courseDescription":"MANAGEMENT INFORMATION SYSTEM","prereq":"CSC3112","credit":"3"},{"code":"MIS4011","courseDescription":"ENTERPRISE RESOURCE PLANNING","prereq":"MIS3101 & CSC3112","credit":"3"},{"code":"CSC4285","courseDescription":"DATA WAREHOUSE AND DATA MINING",
 "prereq":"CSC2211 & MAT3103","credit":"3"},{"code":"CSC4182","courseDescription":"HUMAN COMPUTER INTERACTION","prereq":"CSC3217 & CSC3215","credit":"3"},{"code":"MIS4014","courseDescription":"BUSINESS INTELLIGENCE AND DECISION SUPPORT SYSTEMS","prereq":" ","credit":"3"},{"code":"CSC4180","courseDescription":"INTRODUCTION TO DATA SCIENCE",
 "prereq":"Choice","credit":"3"},{"code":"CSC4183","courseDescription":"CYBER LAWS & INFORMATION SECURITY","prereq":" ","credit":"3"},{"code":"MIS4007","courseDescription":"DIGITAL MARKETING","prereq":" ","credit":"3"},{"code":"MIS4012","courseDescription":"E-COMMERCE, E-GOVERNANCE & E-SERIES","prereq":" ","credit":"3"},{"code":"CSC4270","courseDescription":"SOFTWARE DEVELOPMENT PROJECT MANAGEMENT",
 "prereq":"CSC3112","credit":"3"},{"code":"CSC4160","courseDescription":"SOFTWARE REQUIREMENT ENGINEERING","prereq":"CSC3112","credit":"3"},{"code":"CSC4271","courseDescription":"SOFTWARE QUALITY AND TESTING","prereq":"CSC3112","credit":"3"},{"code":"CSC4162","courseDescription":"PROGRAMMING IN PYTHON","prereq":"CSC3215","credit":"3/LAB"},{"code":"CSC4274","courseDescription":"VIRTUAL REALITY SYSTEMS DESIGN",
 "prereq":"CSC2210","credit":"3"},{"code":"CSC4163","courseDescription":"ADVANCED PROGRAMMING WITH JAVA","prereq":"CSC3215","credit":"3/LAB"},{"code":"CSC4164","courseDescription":"ADVANCED PROGRAMMING WITH .NET","prereq":"CSC3215","credit":"3/LAB"},{"code":"CSC4161","courseDescription":"ADVANCED PROGRAMMING IN WEB TECHNOLOGY","prereq":"CSC3215","credit":"3/LAB"},{"code":"CSC4272","courseDescription":"MOBILE APPLICATION DEVELOPMENT",
 "prereq":"CSC3215","credit":"3/LAB"},{"code":"CSC4273","courseDescription":"SOFTWARE ARCHITECTURE AND DESIGN PATTERNS","prereq":"CSC3112","credit":"3"},{"code":"CSC4125","courseDescription":"COMPUTER SCIENCE MATHEMATICS","prereq":"CSC2211 & MAT3101","credit":"3"},{"code":"CSC4126","courseDescription":"BASIC GRAPH THEORY","prereq":"CSC2211","credit":"3"},{"code":"CSC4127","courseDescription":"ADVANCED ALGORITHM TECHNIQUES",
 "prereq":"CSC3217","credit":"3/LAB"},{"code":"CSC4233","courseDescription":"NATURAL LANGUAGE PROCESSING","prereq":"CSC3217 & CSC4162","credit":"3"},{"code":"CSC4128","courseDescription":"LINEAR PROGRAMMING","prereq":"CSC3217 & MAT3103","credit":"3/LAB"},{"code":"CSC4231","courseDescription":"PARALLEL COMPUTING","prereq":"CSC3217","credit":"3"},{"code":"CSC4232","courseDescription":"MACHINE LEARNING",
 "prereq":"CSC3217","credit":"3"},{"code":"BAE1201","courseDescription":"BASIC MECHANICAL ENGG.","prereq":"PHY1203","credit":"3"},{"code":"EEE3103","courseDescription":"DIGITAL SIGNAL PROCESSING","prereq":"EEE2213","credit":"3"},{"code":"EEE4217","courseDescription":"VLSI CIRCUIT DESIGN","prereq":"EEE 3101 & EEE 3102","credit":"3"},{"code":"EEE2213","courseDescription":"SIGNALS & LINEAR SYSTEM",
 "prereq":"MAT2202","credit":"3"},{"code":"COE4128","courseDescription":"DIGITAL SYSTEM DESIGN","prereq":"COE3205","credit":"3"},{"code":"COE4231","courseDescription":"IMAGE PROCESSING","prereq":"CSC4118 & EEE2213","credit":"3"},{"code":"COE4129","courseDescription":"MULTIMEDIA SYSTEMS","prereq":"CSC3215","credit":"3"},{"code":"COE4230","courseDescription":"SIMULATION & MODELING",
 "prereq":"CSC3217","credit":"3/LAB"},{"code":"COE4126","courseDescription":"ADVANCED COMPUTER NETWORKS","prereq":"COE3206","credit":"3/LAB"},{"code":"COE4234","courseDescription":"COMPUTER VISION AND PATTERN RECOGNITION","prereq":"CSC4118","credit":"3"},{"code":"COE4232","courseDescription":"NETWORK SECURITY","prereq":"COE3103","credit":"3"},{"code":"COE4125","courseDescription":"ADVANCED OPERATING SYSTEM",
 "prereq":"CSC3214","credit":"3/LAB"},{"code":"EEE4233","courseDescription":"DIGITAL DESIGN WITH SYSTEM [ VERILOG,VHDL & FPGAS ]","prereq":"EEE4217","credit":"3"},{"code":"COE4235","courseDescription":"ROBOTICS ENGINEERING","prereq":"CSC3217","credit":"3"},{"code":"EEE4209","courseDescription":"TELECOMMUNICATIONS ENGINEERING","prereq":"COE3103","credit":"3"},{"code":"COE4127","courseDescription":"NETWORK RESOURCE MANAGEMENT & ORGANIZATION",
 "prereq":"COE3103","credit":"3"},{"code":"COE4233","courseDescription":"WIRELESS SENSOR NETWORKS","prereq":"COE3103","credit":"3/LAB"},{"code":"EEE4241","courseDescription":"INDUSTRIAL ELECTRONICS, DRIVES & INSTRUMENTATION","prereq":"EEE3101","credit":"3/LAB"}]`;
let courseData = [];
courseData = JSON.parse(courseDataJSON);

let courses = [];
let completedCourses = [];
let availableCourses = [];

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

const input = document.getElementById("content");
const suggestionList = document.getElementById("suggestionList");
const add = document.getElementById("add");

let creditCompleted = 0;
let creditTaken = 0;

const creditCompletedDiv = document.getElementById("creditCompleted");
const creditTakenDiv = document.getElementById("creditTaken");

const getCourses = async () => {
  // const data = query(collection(db, "courseData"));
  //   const querySnapshot = await getDocs(data);
  //   querySnapshot.forEach((item) => {
  //     courseData.push({ ...item.data(), id: item.id });
  //   });

  courseData.forEach((item) => {
    courses.push(item.courseDescription);
  });

  courses.sort();

  const coursesJSON = JSON.stringify(courses);
  localStorage.setItem("courses", coursesJSON);
  // console.log(courses);
  const completedCoursesJSON = JSON.stringify(completedCourses);
  const availableCoursesJSON = JSON.stringify(availableCourses);

  // Set the JSON string in local storage under a specific key
  localStorage.setItem("completedCourses", completedCoursesJSON);
  localStorage.setItem("availableCourses", availableCoursesJSON);
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
  const coursesJSON = localStorage.getItem("courses");
  const completedCoursesJSON = localStorage.getItem("completedCourses");
  const availableCoursesJSON = localStorage.getItem("availableCourses");

  // Parse the JSON string back into an array of objects
  courses = JSON.parse(coursesJSON);
  completedCourses = JSON.parse(completedCoursesJSON);
  availableCourses = JSON.parse(availableCoursesJSON);

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);
}

function checkValid(userInput) {
  completedCourses.forEach((course) => {
    if (course.courseDescription == userInput) {
      input.blur();
      suggestionList.classList.remove("active");

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
  let found = false;
  courses.forEach((course) => {
    if (course == userInput) {
      found = true;
    }
  });
  if (!found) {
    input.blur();
    suggestionList.classList.remove("active");

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
}

function showSuggestions(userInput) {
  suggestionList.innerHTML = "";

  const matchingWords = courses.filter((word) => word.startsWith(userInput));

  // const matchingWords = courses.filter((course) =>
  //   course.courseDescription.startsWith(userInput)
  // );

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
    checkValid(userInput);
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

  checkValid(userInput);
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

function getResults(Course) {
  creditCompleted = 0;
  creditTaken = 0;
  // const data = query(collection(db, "courseData"));
  // const querySnapshot = await getDocs(data);

  courseData.forEach((item) => {
    if (item.courseDescription == Course) {
      completedCourses.push(item);

      CreditCompleted(completedCourses);

      const Code = item.code.replace(/\s+/g, "");
      // console.log(Code);
      courseData.forEach((item) => {
        const Prereq = item.prereq.replace(/\s+/g, "");
        // console.log(creditCompleted.toString());
        if (
          Prereq.includes(Code) ||
          Prereq == "Nil" ||
          Prereq == creditCompleted.toString()
        ) {
          // console.log(item.data().courseDescription);
          availableCourses.push(item);
        }
      });
    }
  });

  let valuesToRemove = completedCourses.map((obj) => obj.courseDescription);

  availableCourses = availableCourses.filter(
    (obj) => !valuesToRemove.includes(obj.courseDescription)
  );

  completedCourses = completedCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.code === obj.code)
  );

  availableCourses = availableCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.code === obj.code)
  );

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);

  updateLocalStorage(completedCourses, availableCourses);
}

const deleteCompletedCourse = async (deleteCourseCode) => {
  creditCompleted = 0;
  creditTaken = 0;

  completedCourses = completedCourses.filter(
    (obj) => obj.code !== deleteCourseCode
  );
  // availableCourses = availableCourses.filter(
  //   (obj) => obj.prereq !== deleteCourseCode
  // );
  availableCourses = [];

  // const data = query(collection(db, "courseData"));
  // const querySnapshot = await getDocs(data);

  completedCourses.forEach((Course) => {
    courseData.forEach((item) => {
      const Code = Course.code.replace(/\s+/g, "");
      const Prereq = item.prereq.replace(/\s+/g, "");

      if (Prereq.includes(Code) || Prereq == "Nil") {
        // console.log(item.data().courseDescription);
        availableCourses.push(item);
      }
    });
  });

  let valuesToRemove = completedCourses.map((obj) => obj.courseDescription);

  availableCourses = availableCourses.filter(
    (obj) => !valuesToRemove.includes(obj.courseDescription)
  );

  completedCourses = completedCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.code === obj.code)
  );

  availableCourses = availableCourses.filter(
    (obj, index, self) => index === self.findIndex((o) => o.code === obj.code)
  );

  createCompletedCourse(completedCourses);
  createAvailableCourse(availableCourses);
  CreditCompleted(completedCourses);

  updateLocalStorage(completedCourses, availableCourses);
  // getData();
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
