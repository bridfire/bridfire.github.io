"use strict";
const MAX_OF_INITITAL_POST = 6//Posts
const cpn = 'Bridfire'
const elementLoadPage = document.querySelector('.box')
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let slidesContainer = document.querySelector('.slideshow-container')
let postsContainer = document.querySelector('#content')


let menuMobile = document.querySelector('.overlay')
let domMenu = document.querySelector('.closebtn')
let menuDesk = document.querySelector('.menu_desk')

let recomendation = document.querySelector('.bg1_rec')

let show_ul = document.querySelector('#ul_content_1')
let show_ul_2 = document.querySelector('#ul_content_2')


const SHOW_UL_MAX_CONTENT = 10
const SHOW_UL_2_MAX_CONTENT = 13
const FOOTER_CONTENT_AMOUNT_1 = 3
const FOOTER_CONTENT_AMOUNT_2 = 5
const DOM_FOOTER_1 = document.querySelector('#post_container_1')
const DOM_FOOTER_2 = document.querySelector('#post_container_2')

let footer = document.getElementById('footer')
let curretnDate = new Date()



let dateConvertion = (Infdate = {}) => {
    // handler data //
    if (Object.values(Infdate).length !== 5) console.log("Something wrong handler error active")
    const { year, monthIndex, day, hour, minutes } = Infdate
    const date = new Date(year, monthIndex, day, hour, minutes)
    return date
}



let randomObjectArray = (array = []) => {
    let ramdom = Math.floor(Math.random() * array.length)
    let ramdomElement = array[ramdom]
    array.splice(ramdom, 1)
    return ramdomElement
}





function domFooter(data = [], sorElementByLastDate = []) {

    let foorter_1 = []
    sorElementByLastDate.reverse().filter((element) => element.top).forEach((element, index, __) => {
        let HTML_TEM = `
        <div class="subPost">
                <p class="sub_post_p"><a href="${element.source[2]}">${element.content.introV}</a></p>
                <img src="${element.IMGurl}" alt="">
        </div>`
        if (index + 1 <= FOOTER_CONTENT_AMOUNT_1) foorter_1.push(HTML_TEM)
    })
    DOM_FOOTER_1.insertAdjacentHTML('beforeend', foorter_1)


    let foorter_2 = []
    let copyArray = [...data]
    data.forEach((element, index, __) => {
        let randomObject = randomObjectArray(copyArray)

        let HTML_TEM = `
        <div class="subPost">
                <p><a href="${randomObject.source[2]}">${randomObject.content.introV}</a></p>
                <img src="${randomObject.IMGurl}" alt="${randomObject.title}">
        </div>`
        if (index + 1 <= FOOTER_CONTENT_AMOUNT_2) foorter_2.push(HTML_TEM)
    })


    DOM_FOOTER_2.insertAdjacentHTML('beforeend', foorter_2)
}



function domSideBarParse(data = []) {

    let ilElement = []
    data.filter((element) => element.top).forEach((element, index, __) => {
        let HTML_data_Placeholder = `<li><a href="${element.source[2]}">${element.content.introV}</a></li>`
        if (index + 1 <= SHOW_UL_MAX_CONTENT) ilElement.push(HTML_data_Placeholder)
    })
    show_ul.insertAdjacentHTML('afterbegin', ilElement.join(' '))


    //oren by random order//
    let ililElement2 = []
    let copyArray = [...data]
    data.forEach((element, index, arr) => {
        let randomObject = randomObjectArray(copyArray)

        let HTML_data_Placeholder = `<li><a href="${randomObject.source[2]}">${randomObject.content.introV}</a></li>`
        if (index + 1 <= SHOW_UL_2_MAX_CONTENT) ililElement2.push(HTML_data_Placeholder)
    })
    show_ul_2.insertAdjacentHTML('afterbegin', ililElement2.join(' '))

}


//The domParsePosts function creates all HTML interactions through the data objects.//
function domParsePosts(data = []) {
    footer.insertAdjacentHTML('afterbegin', `<p>&copy; copyright ${cpn} team ${curretnDate.getFullYear()} <a href="#" rel="nofollow">Desing</a>.</p>`)

    let newArray = [...data].reduce((acc, crr) => {
        let objectDate = { 'formatDate': dateConvertion(crr.date) }
        return [...acc, Object.assign(crr, objectDate)]
    }, [])  //create a new array with new objectDate attrinute
    //console.log(newArray)

    let sortter = newArray.sort((elementA, elementB) => new Date(elementA.formatDate) > new Date(elementB.formatDate) ? -1 : 1)

    domFooter(data, sortter)
    domSideBarParse(data)

}



const dataExtration = fetch('../../contentJson/settings.json')
dataExtration.then(data => data.json()).then((dataJson) => {
    document.body.style.overflow = 'hidden'
    domParsePosts(dataJson.posts)
    document.body.style.overflow = 'scroll'
    elementLoadPage.classList.add('hiderani')

})

domMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('overlayDisplay')
    domMenu.classList.toggle('closebtn_open')
    domMenu.classList.toggle('closebtn')

})
