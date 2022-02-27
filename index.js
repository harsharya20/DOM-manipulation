function getAndupdate(){
    console.log("Updating List");
   tit = document.getElementById('title').value;
   desc = document.getElementById('description').value;
   if (localStorage.getItem('ItemsJSON')==null){
       itemJsonArray = [];
       itemJsonArray.push([tit, desc]);
       localStorage.setItem('ItemsJSON',JSON.stringify(itemJsonArray))
   }else{
       itemJsonArrayStr = localStorage.getItem('ItemsJSON')  //it would be string so we have to parse
       itemJsonArray = JSON.parse(itemJsonArrayStr);
       itemJsonArray.push([tit, desc])
       localStorage.setItem('ItemsJSON', JSON.stringify(itemJsonArray))
   }
   update();
}
function update(){
    if (localStorage.getItem('ItemsJSON')==null){
       itemJsonArray = [];
       localStorage.setItem('ItemsJSON',JSON.stringify(itemJsonArray))
   }else{
       itemJsonArrayStr = localStorage.getItem('ItemsJSON')  //it would be string so we have to parse
       itemJsonArray = JSON.parse(itemJsonArrayStr);
   }
    

   //populate the table
   let tableBody = document.getElementById('tableBody');
   let str="";
   itemJsonArray.forEach((element,index) => {
     str += `
     <tr>
    <th scope="row">${index + 1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button class=" btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td>
  </tr>
     `  

   });
   tableBody.innerHTML = str;
}
add=document.getElementById("add");
add.addEventListener("click", getAndupdate);
update();
function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr=localStorage.getItem('ItemsJSON')
    itemJsonArray=JSON.parse(itemJsonArrayStr);
    //DElete itemindex element from the array
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem('ItemsJSON',JSON.stringify(itemJsonArray));
    update();


}
function clearStr(){
    if(confirm("Do you really want to clear")){
    localStorage.clear();
    update();
}
}