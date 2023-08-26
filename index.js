const MAX_OF_INITITAL_POST = 4//Posts

let { browser, device, os, source } = detect.parse(navigator.userAgent)


const cpn = 'Bridfire'
const elementLoadPage = document.querySelector('.box')
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let slidesContainer = document.querySelector('.slideshow-container')
let postsContainer = document.querySelector('#content')
let pagination = document.querySelector('.pagination')

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

let globalArrayObject = []
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


let showSlides = () => {
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}


let createCopy = []
let paginationContent = 0
const paginate = ((items, page = 1, perPage = 0) => {
    createCopy = items
    if (page === 1) {
        createCopy = items;
        paginationContent = items.length % perPage === 0 ?
            Math.floor(items.length / perPage) : Math.floor(items.length / perPage) + 1
    }
    if (perPage > createCopy.length) return { pagination: createCopy, maxOfPages: paginationContent }
    if (page >= paginationContent) return { pagination: createCopy.slice(perPage * (page - 1)), maxOfPages: paginationContent }
    let itemsSliced = createCopy.slice(perPage * (page - 1), perPage * page)
    console.log(`implemented = splice(${perPage * (page - 1)}, ${perPage * page})`)

    return { pagination: itemsSliced, maxOfPages: paginationContent }
});




function domFooter(data = [], sorElementByLastDate = []) {

    let foorter_1 = []
    sorElementByLastDate.reverse().filter((element) => element.dataElement.top).forEach((element, index, __) => {
        let HTML_TEM = `
        <div class="subPost">
                <p class="sub_post_p"><a href="${element.dataElement.source[0]}">${element.dataElement.content.introV}</a></p>
                <img src="${element.dataElement.IMGurl}" alt="">
        </div>`
        if (index + 1 <= FOOTER_CONTENT_AMOUNT_1) foorter_1.push(HTML_TEM)
    })
    DOM_FOOTER_1.insertAdjacentHTML('beforeend', foorter_1)


    let foorter_2 = []
    let arrayCopy = [...sorElementByLastDate]
    data.filter((element) => element.dataElement.top).forEach((element, index, __) => {
        let objectRamdom = randomObjectArray(arrayCopy)
        let HTML_TEM = `
        <div class="subPost">
                <p><a href="${objectRamdom.dataElement.source[0]}">${objectRamdom.dataElement.content.introV}</a></p>
                <img src="${objectRamdom.dataElement.IMGurl}" alt="${objectRamdom.dataElement.title}">
        </div>`
        if (index + 1 <= FOOTER_CONTENT_AMOUNT_2) foorter_2.push(HTML_TEM)
    })
    //console.log(foorter_2)


    DOM_FOOTER_2.insertAdjacentHTML('beforeend', foorter_2)



}

function domSideBarParse(data = []) {
    //recommend the mosh updated content.//
    let sorElementByLastDate = data.sort((a, b) => new Date(a.dataDate).toLocaleString() > new Date(b.dataDate).toLocaleDateString() ? 1 : -1)
    let getTHeFirst = sorElementByLastDate[0]

    let HTML_Rec = `
                    <img src="${getTHeFirst.dataElement.IMGurl}" alt="content_recomendation" class="img_post">
                    <div id="bg2">
                        <spam class="spam_recomendation">${getTHeFirst.dataElement.title}</spam>
                        <p>${getTHeFirst.dataElement.content.inf}</p>
                        <div><a href="${getTHeFirst.dataElement.source[0]}" class="links_visit">${getTHeFirst.dataElement.link_action}</a></div>
                    </div>`
    recomendation.insertAdjacentHTML('afterbegin', HTML_Rec)


    let ilElement = []
    data.filter((element) => element.dataElement.top).forEach((element, index, __) => {
        let HTML_data_Placeholder = `<li><a href="${element.dataElement.source[0]}">${element.dataElement.content.introV}</a></li>`
        if (index + 1 <= SHOW_UL_MAX_CONTENT) ilElement.push(HTML_data_Placeholder)
    })
    show_ul.insertAdjacentHTML('afterbegin', ilElement.join(' '))


    //oren by random order//
    let ililElement2 = []
    let copyArray = [...sorElementByLastDate]
    data.forEach((element, index, arr) => {
        let randomObject = randomObjectArray(copyArray)

        let HTML_data_Placeholder = `<li><a href="${randomObject.dataElement.source[0]}">${randomObject.dataElement.content.introV}</a></li>`
        if (index + 1 <= SHOW_UL_2_MAX_CONTENT) ililElement2.push(HTML_data_Placeholder)
    })
    show_ul_2.insertAdjacentHTML('afterbegin', ililElement2.join(' '))

    // Fill the footer down //
    domFooter(data, sorElementByLastDate)
}



//The domParsePosts function creates all HTML interactions through the data objects.//
function domParsePosts(data = []) {
    let newArray = [...data].reduce((acc, crr) => {
        let objectDate = { 'formatDate': dateConvertion(crr.date) }
        return [...acc, Object.assign(crr, objectDate)]
    }, [])  //create a new array with new objectDate attrinute
    //console.log(newArray)

    let newDateConverted = [] // here we pass the date already converted/ does not modify the original array when using sort
    let elementContainer = []
    newArray.sort((elementA, elementB) => elementA > elementB ? 1 : -1).forEach((elemet, index, arr) => {
        //const { year, monthIndex, day, hour, minutes } = elemet.date
        let date = dateConvertion(elemet.date)
        let dateDatePart = date.toDateString().split(' ')
        let dateTimePart = date.toTimeString().split(' ')

        //Are sort by Date (Current ->to-> the Last)
        let placeHolderPost = `
        <div class="post" id=${`post_id_${index + 1}`}>
                <p class="meta"><span class="date">${dateDatePart[0]}, ${dateDatePart[1]} ${dateDatePart[2]}, ${dateDatePart[3]}</span> ${dateTimePart[0]} Posted by<a href="#">${elemet.author}</a>✅</p>
                <h2 class="title"><a href="${elemet.source[0]}">${elemet.title}</a></h2>
                <img src="${elemet.IMGurl}" alt="" class="img_post">
                <div class="entry">
                    <p class="post_meta">${elemet.content.inf}.</p>
                </div>
                <div><a href="${elemet.source[0]}" class="links">${elemet.link_action}</a></div>
        </div>`

        //Total max of posts//
        if (index + 1 <= MAX_OF_INITITAL_POST) elementContainer.push(placeHolderPost)
        newDateConverted.push({ dataElement: elemet, dataDate: date })
    })

    postsContainer.insertAdjacentHTML('beforeend', elementContainer.join(' '))
    // Fill the sidebars//
    domSideBarParse(newDateConverted)

}




// Unspected --//
function domSlideParse(dataslideHow = []) {
    let domHtml = []
    //console.log(dataslideHow)
    dataslideHow.forEach((elemet, index, arr) => {

        let placeHolderSlide = `
           <div class="mySlides fade">
               <div class="numbertext">${index + 1} / ${arr.length}</div>
               <img src="${elemet.srcURL}"
                   style="width:100%">
               <div class="text">${elemet.imgCaptions}</div>
           </div>`

        domHtml.push(placeHolderSlide)

    })

    //Inser thr new created html//
    slidesContainer.insertAdjacentHTML('afterbegin', domHtml.join(' '))
    showSlides()
}


function domEntryParser(entry = {}, changes = {}) {

    footer.insertAdjacentHTML('afterbegin', `<p>&copy; copyright ${cpn} team ${curretnDate.getFullYear()} <a href="#" rel="nofollow">Desing</a>.</p>`)


    const documentEntry = document.querySelector('.entry')
    let entryPlaceHolder = `<p><strong>${cpn}</strong>,${entry.inf}</p>`
    documentEntry.insertAdjacentHTML('afterbegin', entryPlaceHolder)



    const documentEntryPost = document.getElementById('entry_post')
    let date = dateConvertion(changes.date)
    let dateDatePart = date.toDateString().split(' ')
    let dateTimePart = date.toTimeString().split(' ')
    let entryPostPlaceHolder = `
             <p class="meta">
                <span class="date">${dateDatePart[0]}, ${dateDatePart[1]} ${dateDatePart[2]}, ${dateDatePart[3]}</span>
                <a href="#">${dateTimePart[0]} last Update Update</a>
            </p> 
            <h2 class="title"><a href="#">${cpn}</a></h2>`
    documentEntryPost.insertAdjacentHTML('afterbegin', entryPostPlaceHolder)

}

function domPagination(arrayObj = []) {
    let paginationBtn = arrayObj.length % MAX_OF_INITITAL_POST === 0 ?
        Math.floor(arrayObj.length / MAX_OF_INITITAL_POST) : Math.floor(arrayObj.length / MAX_OF_INITITAL_POST) + 1
    let html_content = []
    for (let e = 0; e < paginationBtn; e++) {
        let HTML_Pagination = `<div class="sub_pag" data="${e}">${e + 1}</div>`
        html_content.push(HTML_Pagination)
    }
    pagination.insertAdjacentHTML('afterbegin', html_content.join(' '))
}

//Main init//
const dataExtration = fetch('./contentJson/settings.json')
dataExtration.then(data => data.json()).then((dataJson) => {
    globalArrayObject = dataJson
    //Parse neste function//
    document.body.style.overflow = 'hidden'
    domEntryParser(dataJson.entry, dataJson.changes)
    domSlideParse(dataJson.slideHowData)
    domParsePosts(dataJson.posts)
    domPagination(dataJson.posts)
    document.body.style.overflow = 'scroll'
    elementLoadPage.classList.add('hiderani')

})

pagination.addEventListener('click', (ev) => {
    let eventTarget = ev.target.closest('.sub_pag') ? ev.target.closest('.sub_pag') : false
    if (eventTarget) {
        let num = Number(eventTarget.textContent)
        //console.log(paginate(globalArrayObject.posts, page = num, perPage = MAX_OF_INITITAL_POST))
        // Future Implementation //
    }
})
domMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('overlayDisplay')
    domMenu.classList.toggle('closebtn_open')
    domMenu.classList.toggle('closebtn')

})
