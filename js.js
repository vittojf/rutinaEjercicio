const form = document.querySelector('#formulario');
const vista = document.querySelector('#actividades');

let arrActv = [];
//  *****************funciones**********************
const makeItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    };

    arrActv.push(item);
    return;
}



const pintar = () => {
    vista.innerHTML = '';

    arrActv = JSON.parse(localStorage.getItem('rutina'));
    if (arrActv === null || arrActv == '') {
        arrActv= [];
        vista.innerHTML = `<div class="text-center"><p class="fs-3">La lista de ejercicios está vacia</p></div>`
    } else {
        arrActv.forEach(e => {
            if (e.estado === true) {
                vista.innerHTML += `
         <div class="alert alert-success mt-2" role="alert">
        <i class="material-icons float-start mr-2"></i>
        <b>${e.actividad}</b> -
       Culminado
        
        <span class="float-end">
            <i class="material-icons" id="listo">check</i>
            <i class="material-icons" id="eliminar">delete_forever</i>
        </span>
    </div>`
            } else if (e.estado === false) {


                vista.innerHTML += ` <div class="alert alert-danger mt-2" role="alert">
          <i class="material-icons float-start mr-2"></i>
          <b>${e.actividad}</b> -
          No Culminado
          
          <span class="float-end">
          <i class="material-icons" id="listo">check</i>
          <i class="material-icons" id="eliminar">delete_forever</i>
          </span>
          </div>`
            }
        })
    }
}

const eliminarItem = (accion) => {
    //formas de comparacion
    let indexArr;
    arrActv.forEach((elemento, index) => {
        if (elemento.actividad === accion) {
            indexArr = index;
        }
    });

    //eliminar splice y push enviar
    arrActv.splice(indexArr, 1);
    guardarLs();

}


const guardarLs = () => {
    localStorage.setItem('rutina', JSON.stringify(arrActv));
    pintar();

}

const editarItem = (accion) => {

    //busca el index y lo compara con findIndex();
    let indexArr = arrActv.findIndex((e) => e.actividad === accion);

    arrActv[indexArr].estado = true;

    guardarLs();

}

//eventos

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ejercicio = document.querySelector('input').value;
    makeItem(ejercicio);
    guardarLs()
    form.reset();


});


vista.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.path[2].childNodes[3].innerHTML);
    if (e.target.innerHTML === 'check' || e.target.innerHTML === 'delete_forever') {
        let text = e.path[2].childNodes[3].innerHTML;
        
        if (e.target.innerHTML === 'delete_forever') {
            
            eliminarItem(text)

        }
        if (e.target.innerHTML === 'check') {
            //accion editar
            
            editarItem(text)
            
        }
    }
})
document.addEventListener('DOMContentLoaded', pintar);