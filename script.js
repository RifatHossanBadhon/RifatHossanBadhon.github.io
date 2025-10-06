document.addEventListener('DOMContentLoaded',()=>{
    const h1ELement=document.querySelector('.intro-text h1');
    const textToType="hello ! Badhon here";
    const typingSpeed=120;
    let charIndex=0;
    function typeWritter(){
        if(charIndex<textToType.length){
            h1ELement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWritter , typingSpeed);
        }
    }
    typeWritter();

});

