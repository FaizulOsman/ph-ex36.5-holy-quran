/* Load Data From API */
const loadData = async () => {
    const res = await fetch('https://api.alquran.cloud/v1/quran?fbclid=IwAR36lJr2Q7Dl2tD-NK9sxxl0LnrZ2ktxOWYYox1lyvHRjDger7ckkUIYddA')
    const data = await res.json()
    return data.data.surahs
}

/* Display Buttons With Surah Name */
const surahSection = document.getElementById('surah-section')
const displayData = async () => {
    const data = await loadData()
    data.forEach(surah => {
        const div = document.createElement('div')
        div.innerHTML = `
            <label for="my-modal-3" class="btn modal-button w-full border rounded-md px-3 py-2 btn-outline btn-success">${surah.number}. ${surah.englishName} - ${surah.name}</label>
        `
        div.addEventListener('click', function () {
            surahModal(surah)
        })
        surahSection.appendChild(div)
    })
}
displayData()

/* Modal Set For Reading Surah */
const surahModal = (surah) => {
    const { number, name, englishName, ayahs } = surah
    let count = 0
    const modalArea = document.getElementById('modal-area')
    modalArea.innerHTML = ''
    const modalBody = document.createElement('div')
    modalBody.classList.add("modal-box", "relative")
    modalBody.style.maxWidth = '80%'
    modalBody.innerHTML = `
        <label for="my-modal-3" class="btn btn-sm btn-circle sticky left-0 top-0">✕</label>
        <h3 class="text-lg font-bold text-center">${number}. ${englishName} - ${name}</h3>
    `
    ayahs.forEach(ayah => {
        const p = document.createElement('p')
        p.classList.add("py-4", "text-right")
        p.innerHTML = `
            <div class="flex flex-row">
                <span class="w-11/12">${ayah.text}</span>
                <span class="w-1/12 float-right">${++count}</span>  
            </div>
        `
        modalBody.appendChild(p)
    })
    modalArea.appendChild(modalBody)
}

/* Search Input Field Find Surah */
const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keypress', async (event) => {
    const data = await loadData()
    if (event.key === "Enter") {
        surahSection.innerHTML = ''
        const foundData = data.filter(surah => surah.englishName.includes(searchInput.value))
        foundData.forEach(surah => {
            const div = document.createElement('div')
            div.innerHTML = `
                <label for="my-modal-3" class="btn modal-button w-full border rounded-md px-3 py-2 btn-outline btn-success">${surah.number}. ${surah.englishName} - ${surah.name}</label>
            `
            div.addEventListener('click', function () {
                surahModal(surah)
            })
            surahSection.appendChild(div)
        })
        console.log(foundData)
    }
})