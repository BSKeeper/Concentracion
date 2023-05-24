//variables

let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let tiempoInicial=30;
let tFaltante=30;
let cuentaRegresivaId=null;


//objetos
let winAudio=new Audio("../snd/win.wav");
let loseAudio=new Audio("../snd/lose.wav");
let clickAudio=new Audio("../snd/click.wav");
let rightAudio=new Audio("../snd/right.wav");
let wrongAudio=new Audio("../snd/wrong.wav");


//direccionando a HTML
let mostrarMovimientos=document.getElementById("movimientos");
let mostrarAciertos=document.getElementById("aciertos");
let mostrarTiempo=document.getElementById("tRestante");
let mostrarFinalizado=document.getElementById("finalizado");

//arreglo

let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(()=>[Math.random()-0.5]);
console.log(numeros);

//función bloquear tarjetas
function bloquearTarjetas(){
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=`<img src="../img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled=true;
    }
}

//Función para temporizador
function contarTiempo(){
cuentaRegresivaId= setInterval(() => {
    tFaltante--;
    mostrarTiempo.innerHTML=`Tiempo: ${tFaltante}s`;
    if(tFaltante==0){
        clearInterval(cuentaRegresivaId);
        bloquearTarjetas();
        mostrarTiempo.innerHTML=`¡Se acabó el tiempo! 😰`;
        loseAudio.play();
        setTimeout(() => {
            mostrarFinalizado.innerHTML="¡PERDISTE!";
        }, 6000);
        }
    },1000);
}

//Función principal destapar

function destapar(id){

    if(temporizador==false){
        contarTiempo();
        temporizador=true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if (tarjetasDestapadas==1){
        //mostrar primer número
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id]
        tarjeta1.innerHTML=`<img src="../img/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //deshabilitar botón
        tarjeta1.disabled=true; 

    }else if(tarjetasDestapadas==2){
        //mostrar segundo número
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img src="../img/${segundoResultado}.png" alt="">`;
        clickAudio.play();

        //deshabilitar botón
        tarjeta2.disabled=true; 

        //incrementar variable movimientos
        movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos: ${movimientos}`;
        if (primerResultado==segundoResultado){
            //contador de tarjetas destapadas a cero
            tarjetasDestapadas=0;

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML=`Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos==8){
                clearInterval(cuentaRegresivaId);
                mostrarAciertos.innerHTML=`Aciertos: ${aciertos} 🥳`;
                mostrarTiempo.innerHTML=`¡Logrado en ${tiempoInicial-tFaltante}s! 🎊🤩`
                mostrarMovimientos.innerHTML=`Movimientos: ${movimientos} 😎`;    
                winAudio.play();
                setTimeout(() => {
                    mostrarFinalizado.innerHTML="¡GANASTE!";
                }, 6000);
            }
        }else{
            wrongAudio.play();
            //ocultar valores después de un tiempo determinado
            setTimeout(() => {
                tarjeta1.innerHTML="BSK";
                tarjeta2.innerHTML="BSK";
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;  
            }, 800);
        }
    }
}