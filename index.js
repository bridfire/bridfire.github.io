const MAX_OF_INITITAL_POST = 9//Posts

let { browser, device, os, source } = detect.parse(navigator.userAgent)


//Implement Bad Practica//
let status_counter = 0

const cpn = 'Bridfire'
const elementLoadPage = document.querySelector('.box')
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let slidesContainer = document.querySelector('.slideshow-container')
let postsContainer = document.querySelector('#content')
let pagination = document.querySelector('.pagination')
let doc_pagination_next = document.getElementById('sub_pag_id')
let menuMobile = document.querySelector('.overlay')
let domMenu = document.querySelector('.overlay-content')
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



let selectDocm = document.querySelector('.action_transtion')
let filtetTop = (array = []) => array.posts.filter(element => element.top)
// Show transition Post//
let topTrasntion = false
let transtion_html_content = false
let previus = 0
function transtionAction() {
    let i;
    if (!topTrasntion) {
        topTrasntion = filtetTop(globalArrayObject)
        transtion_html_content = topTrasntion.map(get_element => `<a href="${get_element.source[0]}" class="breking_top">${get_element.title}</a>`)
        document.querySelector('.action_transtion').insertAdjacentHTML('afterbegin', transtion_html_content.join(' '))
        transtion_html_content = document.querySelectorAll('.action_transtion a')
        // console.log(transtion_html_content)
    }

    for (i = 0; i < transtion_html_content.length; i++) {
        transtion_html_content[i].style.display = "none";
    }

    if (previus + 1 > transtion_html_content.length) previus = 0

    transtion_html_content[previus].style.display = "block";

    previus++
    setTimeout(transtionAction, FOOTER_CONTENT_AMOUNT_1 * 1000); // Change image every 2 seconds
}





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
                    <img src="${getTHeFirst.dataElement.IMGurl}" alt="content_recomendation" class="img_post_reco">
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
function domParsePosts(data = [], from_pagination = false) {
    let newArray = [...data].reduce((acc, crr) => {
        let objectDate = { 'formatDate': dateConvertion(crr.date) }
        return [...acc, Object.assign(crr, objectDate)]
    }, [])  //create a new array with new objectDate attrinute
    //console.log(newArray)

    let newDateConverted = [] // here we pass the date already converted/ does not modify the original array when using sort
    let elementContainer = []
    newArray.sort((elementA, elementB) => elementA.formatDate > elementB.formatDate ? -1 : 1).forEach((elemet, index, arr) => {
        //const { year, monthIndex, day, hour, minutes } = elemet.date
        let date = dateConvertion(elemet.date)
        let get_local_timer = date.toLocaleString('es-US',)
        //Are sort by Date (Current ->to-> the Last)
        let placeHolderPost = `
        <div data-foo class="post" id=${`post_id_${index + 1}`}>
        <div class="while_div_device">
             <p class="meta"><span class="date">${get_local_timer}</span> Autor <a href="#">${elemet.author}</a>✅</p>
             <h2 class="title"><a href="${elemet.source[0]}">${elemet.title}</a></h2>
          </div>
           <div class="father_while_div">
                <img src="${elemet.IMGurl}" alt="" class="img_post">
            </div>
                <div class="entry">
                   <div class="while_div">
                      <p class="meta"><span class="date">${get_local_timer}</span> Autor <a href="#">${elemet.author}</a>✅</p>
                     <h2 class="title"><a href="${elemet.source[0]}">${elemet.title}</a></h2>
                   </div>
                    <p class="post_meta">${elemet.content.inf}.</p>
                    <div><a href="${elemet.source[0]}" class="links">${elemet.link_action}</a></div>
                </div>
        </div>`

        //Total max of posts//
        if (index + 1 <= MAX_OF_INITITAL_POST) elementContainer.push(placeHolderPost)
        newDateConverted.push({ dataElement: elemet, dataDate: date })
    })

    postsContainer.insertAdjacentHTML('beforeend', elementContainer.join(' '))
    // Fill the sidebars//
    from_pagination ? newDateConverted : domSideBarParse(newDateConverted)

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
    transtionAction()
}


function domEntryParser(entry = {}, changes = {}) {

    footer.insertAdjacentHTML('afterbegin', `<p>&copy; copyright ${cpn} team ${curretnDate.getFullYear()} <a href="#" rel="nofollow">Desing</a>.</p>
    <spam><a href="./privacy_policy.html">Política de Privacidad</a></spam>`)


    const documentEntry = document.querySelector('.entry')
    let entryPlaceHolder = `<p><strong>${cpn}</strong>,${entry.inf}</p>`
    documentEntry.insertAdjacentHTML('afterbegin', entryPlaceHolder)



    const documentEntryPost = document.getElementById('entry_post')
    let date = dateConvertion(changes.date)
    let dateTimePart = date.toLocaleString('es-US',)
    let entryPostPlaceHolder = `
             <p class="meta">
                <span class="date">${dateTimePart}</span>
                <a href="#">Actualizado</a>
            </p> 
            <h2 class="title"><a href="#">${cpn}</a></h2>`
    documentEntryPost.insertAdjacentHTML('afterbegin', entryPostPlaceHolder)

}

function domPagination(arrayObj = []) {
    let paginationBtn = arrayObj.length % MAX_OF_INITITAL_POST === 0 ?
        Math.floor(arrayObj.length / MAX_OF_INITITAL_POST) : Math.floor(arrayObj.length / MAX_OF_INITITAL_POST) + 1
    let html_content = []
    for (let e = 0; e < paginationBtn; e++) {
        let HTML_Pagination = `<a class="sub_pag" href="#page=${e + 1}">${e + 1}</a>`
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


let createCopy = []
let paginationContent = 0
const paginate = ((items = [], page = 1, perPage = 0) => {
    createCopy = items
    if (true) {
        createCopy = items;
        paginationContent = items.length % perPage === 0 ?
            Math.floor(items.length / perPage) : Math.floor(items.length / perPage) + 1
    }
    if (perPage > createCopy.length) return { pagination: createCopy, maxOfPages: paginationContent }
    if (page >= paginationContent) { status_counter = 0; return { pagination: createCopy.slice(perPage * (page - 1)), maxOfPages: paginationContent } }
    let itemsSliced = createCopy.slice(perPage * (page - 1), perPage * page)
    // console.log(items.length)
    // console.log(`implemented = splice(${perPage * (page - 1)}, ${perPage * page})`)

    return { pagination: itemsSliced, maxOfPages: paginationContent }
});




pagination.addEventListener('click', (ev) => {
    // console.log('Pagination Action...')

    let eventTarget = ev.target.closest('.sub_pag') ? ev.target.closest('.sub_pag') : false
    let eventTargetNext = ev.target.closest('#sub_pag_id') ? ev.target.closest('#sub_pag_id') : false
    if (eventTarget || eventTargetNext) {

        //if the event was triggered from from the target <a></a> or </next element>
        status_counter++
        let num = eventTarget ? Number(eventTarget.textContent) : status_counter
        if (eventTarget) status_counter = num


        // console.log(`${status_counter}==${num}}`)
        // console.log(paginate(globalArrayObject.posts, page = num, perPage = MAX_OF_INITITAL_POST))
        let pagination_element = paginate(globalArrayObject.posts, page = num, perPage = MAX_OF_INITITAL_POST)


        //removing all the children..//
        let sde = [...document.querySelectorAll("[data-foo]")]
        sde.forEach(e => postsContainer.removeChild(e))

        domParsePosts(pagination_element.pagination, from_pagination = true)

    }

})
domMenu.addEventListener('change', (ev) => {
    // console.log(`Traking Selection... {}`)
    window.location.href = ev.target.value

})
