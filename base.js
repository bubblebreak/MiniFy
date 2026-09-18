import { setTeacherType } from "/teacher-view.js";
import { collectStudentID } from "/student-view.js";

document.getElementById("entryTeacherButton").addEventListener("click", () =>{
    setTeacherType()
})

document.getElementById("entryStudentButton").addEventListener("click", () =>{
    collectStudentID()
})



