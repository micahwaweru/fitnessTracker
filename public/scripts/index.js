console.log('Script Attached');
var inpEm = document.getElementById('inpEm');
var inpPw=document.getElementById('inpPw');
var subBtn=document.getElementById('submit-btm');


subBtn.addEventListener('click',function(e,){
    e.preventDefault();
    console.log('Btn click')
    var formObj={
        email: inpEm.value,
        password: inpPw.value,
    }

    console.log(formObj);
    
})
