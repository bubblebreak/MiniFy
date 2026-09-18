import { setTeacherType } from "/teacher-view.js";
import { collectStudentID } from "/student-view.js";

document.getElementById("entryTeacherButton").addEventListener("click", () =>{
    console.log("hello")
    setTeacherType()
})

document.getElementById("entryStudentButton").addEventListener("click", () =>{
    console.log("hello again")
    collectStudentID()
})



