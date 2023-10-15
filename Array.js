let student = ['yahya', 'sombat', 18, true];
//show number of element in the array 
let length = student.length;

console.log(length)
//Show all content of the array
for (let i = 0; i < length; i++) {
    console.log(student[i]);
}
//show specific element
let stud = student[length-4]
console.log(stud)
//pop show last elemement and remove it at the same time
let pop = student.pop()
console.log(pop)
//push add un element to the array
student.push("yusuf")
