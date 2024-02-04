let tasks = [
   
]
function fromLocalStorageGetTasks(){
    let getValues = JSON.parse(localStorage.getItem('tasks'));
    if(getValues == null){
        tasks = []
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}
fromLocalStorageGetTasks()
function addTaskToHtml(){
    document.getElementById('tasks').innerHTML = " ";
    let index = 0;
    
    for(let task of tasks){
        
        let content = `
        <div class="card mt-2">
                <div class="card-body">
                    <h3 class="card-title">${task.title}</h3>
                    <span class="card-text">${task.date}</span>
                    <div class="btns mt-3">
                        <button class="btn btn-danger" onclick="deleteTaskFromArray(${index})">حذف</button>
                        <button class="btn btn-warning" onclick="editTaskFromArray(${index})">تعديل</button>
                    </div>
                </div>
            </div>
        `
        index++;
        
        document.getElementById('tasks').innerHTML += content;
        document.getElementById('task-name').value = '';
          
    }
    if(tasks.length >= 1){
        document.getElementById('del-all-btn').style.display = 'inline-block'; 
    }
    else{
        document.getElementById('del-all-btn').style.display = 'none'; 
    }
};
addTaskToHtml();

document.getElementById('save-btn').addEventListener('click',function(){
    let taskName = document.getElementById('task-name').value;
    let now = new Date;
    if(taskName == ' ' || taskName =='' || taskName == ''.startsWith('  ')){
        alert('الرجاء كتابة عنوان وعدم ترك حقل الإدخال فارغاً.')
    }
    else{
        let date = now.getDate() + '/' + (now.getMonth()+1) + '/' + now.getFullYear() + ' | '+ now.getHours() + ':' + now.getMinutes() ;
        tasks.push({title: taskName,date: date})
        saveTasksInLocal();
        addTaskToHtml();
    }
    
    

})

function deleteTaskFromArray(index){
    let confirm = window.confirm(`متأكد من حذف : ${tasks[index].title}`)
    if(confirm){
        tasks.splice(index,1);
        saveTasksInLocal();
        addTaskToHtml();
    }
}  

function editTaskFromArray(index){
    let prompatValue = prompt('ادخل العنوان الجديد:');
    if(prompatValue == ''.startsWith('  ')){
        alert('الرجاء ان لا يبدأ العنوان بالفراغ');
    }
    else{
        tasks[index].title = prompatValue;
        saveTasksInLocal();
        addTaskToHtml();
    }

}

document.getElementById('del-all-btn').addEventListener('click',function(){
    let confirm = window.confirm(`متأكد من حذف الكل؟`)
    if(confirm){
        tasks.splice(0,tasks.length);
        saveTasksInLocal();
        addTaskToHtml();
        
    }
    
})

function saveTasksInLocal(){
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem('tasks',tasksString);
}