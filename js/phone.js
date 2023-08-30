const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent= '';

    // display show all btn if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    // -----1 1 111111
    phones.forEach(phone => {
        // console.log(phone)
        // ---------- 2
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // ----------3
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
         <h2 class="card-title">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div class="card-actions justify-center">
          <button onclick="handleShowDetail('${phone.slug}'); show_modal.showModal()" class="btn btn-primary">Show Details</button>
         </div>
        </div>
        `
        // ------n 4
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}
// show details
const handleShowDetail = async (id) => {
    // console.log('clicked show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}
const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">Brand
    :</span>${phone?.brand
    }</p>
    <img src="${phone.image}" alt=""/>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">displaySize
    :</span>${phone?.mainFeatures?.displaySize
    }</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">Chipset
    :</span>${phone?.mainFeatures?.chipSet
    }</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">Memory
    :</span>${phone?.mainFeatures?.memory
    }</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">Sensors
    :</span>${phone?.mainFeatures?.sensors
    }</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">GPS
    :</span>${phone?.others?.GPS || 'No GPS available in this device'
    }</p>
    <p class="font-medium text-xl"><span class="font-semibold text-2xl	">releaseDate
    :</span>${phone?.releaseDate
    }</p>
    <p class="font-medium text-xl"><span class="font-black text-2xl	">Slug
    :</span>${phone?.slug
    }</p>
    
    `


    // show the modal
    show_modal.showModal();
}

// handle search btn
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchField);
    loadPhone(searchText, isShowAll);
}
// search handle recap
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true)
    
//     const searchField = document.getElementById('search-field2')
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}
// loadPhone();