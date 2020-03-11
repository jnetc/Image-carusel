  // Событие на ориентацию окна


  // Загружаем DOM
// function updateOrientation () {
//   if (!screen.orientation.type === 'portrait-primary') {
//     console.log(screen.orientation.type);
//   } 
//   window.addEventListener('DOMContentLoaded', DOMloaded);


  
// }

window.addEventListener('DOMContentLoaded', DOMloaded)

function DOMloaded () {
  let carusel = document.querySelector('#carusel')
  let caruselWidth = carusel.getBoundingClientRect().width
  const collage = document.querySelector('#collage')
  const collageWidth = collage.getBoundingClientRect().width
  const nextBtn = document.getElementById('next-btn')
  const prevBtn = document.getElementById('prev-btn')
  const slideWidth = collage.children[0].getBoundingClientRect().width
  const slideLenght = collage.children.length
  const marginRight = 20
  let posInitial
  let posFinal
  let posX1 = 0
  let posX2 = 0
  let doubleTouch = false
  let index = 0

    // Событие нажатия мыши
  collage.addEventListener('mousedown', startAction)
  
    // Событие нажатия пальцем
  collage.addEventListener('touchstart', startAction)
  collage.addEventListener('touchmove', moveAction)
  collage.addEventListener('touchend', endAction)

    // Событие двойного нажатия (открыть модальное окно)
  collage.addEventListener('dblclick', openModalWindow)
  collage.addEventListener('touchstart', openModalWindow)

    // Событие кнопок контроля
  nextBtn.addEventListener('click', btnAction.bind(null, 'next'))
  prevBtn.addEventListener('click', btnAction.bind(null, 'prev'))

  collage.addEventListener('transitioned', animaSlide)

  
  
  // function controlAction() {
    
  //   posFinal = -(collageWidth - caruselWidth - 20)
  //   let checkEndSlide = -posFinal
  //   // if (posX1 < 0 || posX1 > checkEndSlide) {
  //     //   return
  //     // }
  //     // console.log(collage.offsetLeft, posFinal);
  //     console.log(posX1, posFinal);
  //   if (this.id === 'next-btn' && collage.offsetLeft >= posFinal) {
  //     if (posX1 <= posFinal) {
  //       posX1 = posFinal
  //       return        
  //     }
  //     posX1 += slideWidth + 20
  //     collage.style.left = `-${posX1}px`
  //     console.log('next');
      
  //     animaSlide(posFinal)
  //   } else if (this.id === 'prev-btn' && collage.offsetLeft <= 0) {
  //     if (posX1 <= 0) {
  //       posX1 = 0
  //       return        
  //     }
  //     posX1 -= slideWidth + 20
  //     collage.style.left = `-${posX1}px`
  //     animaSlide(posFinal)
  //     console.log('prev');
  //   } 
    
  // }

  function animaSlide() {
    collage.classList.add('slide-anim')
  }



  function btnAction(dir) {
    posInitial = collage.offsetLeft

      // Текущая позиция колажа при передвижении
    let limiter = collage.offsetLeft - slideWidth
      // Конечная позиция колажа
    posFinal = -(collageWidth - caruselWidth - marginRight)

    animaSlide()
    
    // if (posInitial > 0) {
    //   return
    // }
    
    console.log(posInitial, limiter, posFinal, index);
    
    
    if (dir === 'next' && limiter >= posFinal) {
      
      collage.style.left = `${posInitial - (slideWidth + marginRight)}px`
      index++
      
      
      if (index >= 3) {
        nextBtn.classList.add('hide')
      } else {
        nextBtn.classList.remove('hide')
        prevBtn.classList.remove('hide')
      }
    } else {
      collage.style.left = `${posFinal}px`
    }
    
    if (dir === 'prev' && limiter <= 0) {
      collage.style.left = `${posInitial + (slideWidth + marginRight)}px`
      index--
      if (limiter <= 0) {
        
        if (index <= 0) {
          prevBtn.classList.add('hide')
          collage.style.left = `${0}px`
          return
        } else {
          nextBtn.classList.remove('hide')
          prevBtn.classList.remove('hide')
        }
      } else {
        // collage.style.left = `${0}px`
        return
      }
    }
  }



  function startAction (e) {
      // Ignored attempt to cancel a touchstart event with cancelable=false
    if (e.cancelable) {
      e.preventDefault();
    }

    collage.classList.remove('slide-anim')

    if (screen.orientation.type === 'portrait-primary') {
      caruselWidth = carusel.getBoundingClientRect().width
    } else {
      caruselWidth = carusel.getBoundingClientRect().width
    }
    
      // Начальная позиция колажа 
    posInitial = collage.offsetLeft
    if (e.type === 'touchstart') { 
        // Текущая позиция касания
      posX1 = e.touches[0].screenX
      
      
    } else {
      // Текущая позиция мыши
      posX1 = e.clientX
    }

    // console.log(posInitial);
      // Собыитя документа при нажатии мыши
    document.onmousemove =  moveAction
    document.onmouseup =  endAction
  }
  
  

  function moveAction (e) {
  

    if (e.type === 'touchmove') {
        // Предыдущая позиция - текущая позиция
      posX2 = posX1 - e.touches[0].screenX
        // Текущая позиция
      posX1 = e.touches[0].screenX
    } else {
      posX2 = posX1 - e.clientX
      posX1 = e.clientX
    }

      // Текущая позиция колажа при передвижении
    let limiter = collage.offsetLeft
      // Конечная позиция колажа
    posFinal = -(collageWidth - caruselWidth - marginRight)

    // console.log(posInitial, limiter);

      // Ограничить в рамках видимости
    if (limiter > 0 || limiter < posFinal) {
      return
    }  
    
      // Отнимаем от текущей позиции элемента
      // полученое смещение курсора
    collage.style.left = `${collage.offsetLeft - posX2}px`
  }
  
  
  function endAction () {
      // Конецовка последнего слайда
      // по отношению к правому краю карусели
      // Ширина коллажа - ширина карусели - 20px margin-right
    posInitial = collage.offsetLeft
    posFinal = -(collageWidth - caruselWidth - marginRight)
    // console.log(posFinal, posInitial);
    
    // Если смещение больше 0, возвращаем к началу
    if (posInitial > 0) {
      collage.style.left = `${0}px`
      btnAction('prev')
    }
    
    // Если смещение больше posFinal
    // возвращаем к posFinal
    if (posInitial <= posFinal) {
      collage.style.left = `${posFinal}px`
      btnAction('next')
    }
      // Сбрасываем событие нажатия
    document.onmouseup = null
    document.onmousemove = null
  }

  









    // МОДАЛЬНОЕ ОКНО
  function openModalWindow (e) {
      
      // Проверяем на касание
    if (e.type === 'touchstart') {
        // Проверка на двойное касание
        // С использованием setTimeout()
        // Если касание не повторилось за 300мс
        // Оно не засчитывается как двойное
      if (!doubleTouch) {
        setTimeout(() => {
          doubleTouch++
          if (doubleTouch == 1) {
            setTimeout(() => {
              doubleTouch = false
            },300)
          }
          if (doubleTouch > 1) {
            // console.log('double touch');
            modalWindow(e)
            doubleTouch = false
          }
        },300)
      }
    } else {
      modalWindow(e)
      // console.log('double click');
    }
  }
  function modalWindow (e) {
    console.log(e);
    
    const body = e.target.closest('body')
    const main = e.target.closest('main')
      // Проверка на наличие ссылки на картинку
    if (e.target.getAttribute('data-id') === null) {
      return
    }
    const link = e.target.getAttribute('data-id')
    const color = e.target.classList[1]
    console.log(link, color);
    
    
    // Создаем элементы
    const modal = document.createElement('div')
    const block = document.createElement('figure')
    // const image = document.createElement('img')
    const close = document.createElement('span')


    modal.setAttribute('class', 'modal')
    block.setAttribute('class', `${color}`)
    // image.setAttribute('src', `${link}`)
    // image.setAttribute('draggable', false)
    close.setAttribute('class', 'close-btn')

    // block.appendChild(image)
    // block.appendChild(close)
    block.textContent = link
    modal.appendChild(block)
    modal.appendChild(close)
    body.insertBefore(modal, main)
    setTimeout(() => {
      modal.classList.add('show-modal')
    }, 100)

    modal.addEventListener('click', closeModal)
    // close.addEventListener('click', closeModal)
    // console.log(e.target.closest('body'));
    function closeModal (e) {
      console.log(e.target.className);
      
      if (e.target.className === '') {
        return
      }
      modal.classList.remove('show-modal')
      setTimeout(() => {
        modal.remove()
      }, 300)
    }
  }
}

