let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');



//for update
let mood = 'create'; //update and you will find it in count

let tmp // varible gloable will use in in update 

console.log(title,price,taxes,ads,discount,total,count,category,submit)


//get total

function getTotal()



//save local storage 

{
   if(price.value !='')
   {
    let result = (+price.value 
        + +taxes.value + +ads.value)
        - discount.value;
        total.innerHTML = result
        total.style.background = '#040';
    }
    else{
        total.innerHTML = 'Total = ';
        total.style.background = '#ba1334';
    }


    
   }

//create product

let dataPro;
if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []; 
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(), //this you will also use in search down 
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, // string to number 
        count:+count.value,
        category:category.value.toLowerCase() // we make it small even if use wrote captial 


    }


    //validation

     if ( (title.value == '' || price.value == '' || category.value == '') )
  
     {
        alert('make sure title,price and category are not empty');
       return;
      }

     if ((newPro.count > 100))
     {
        alert('count must be less or equal than 100');
        return;
     }

if (title.value !== '' || price.value !== '' || category.value !== '' || newPro.count < 101) {


    //count

    if(mood === 'create')
    {
         if(newPro.count > 1)
    {
        for(let i = 0 ; i < newPro.count; i++)
        {
            dataPro.push(newPro);
        }
    }else
    {
        dataPro.push(newPro);
    }
    } else
    {
        dataPro[tmp] = newPro; //update tem is i go down you will see in update 
        mood = 'create'; //reset mood go back and change to create after finsh update
        submit.innerHTML = 'create'; //reset button text
        count.style.display = 'block'; //show count input again
    }

    clearData(); 


   // dataPro.push(newPro);
    localStorage.setItem('product' , JSON.stringify(dataPro) )


showData();

}


} // the end of validation 


//clear input 

function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';



}







//read

function showData()
{

    getTotal(); //call get total to show total in table added it cuz update after upfate it was still green even in create after cshowing data must be red 
    let table = '';
    for (let i = 0; i < dataPro.length; i++) 
    {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button  onclick="updataData(${i})" id="update">update</button></td>
            <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>
        `

    }

    document.getElementById('tbody').innerHTML = table; // show table in t body i think 

    let btnDelate = document.getElementById('deleteAll');
    if(dataPro.length > 0) 
    {
        btnDelate.innerHTML = ` 
         <button onclick = "deleteall()">delete All(${dataPro.length})</button>

        `
    }

    else
    {
        btnDelate.innerHTML = '';
    }

}

showData();






//delete
function deleteDate(i)
{

    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}


function deleteall()
{
   localStorage.clear();
   dataPro.splice(0);  
   showData();
}

//count 






//update

function updataData(i)
{

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;

    getTotal();
    count.style.display = 'none'; //WONT SHOW 
    submit.innerHTML = 'update';
    mood = 'update'; //update
    tmp = i; //save index of update
    scroll(
    {
        top : 0,
        behavior: 'smooth'
      


    })
   
}
//search

let searchMood = 'title'; //search by title or category

function getSearchMood(id) // write in html this.id to get id herer
{
    
    //console.log(id);  this code to help us to check if its working show in console 

    let search = document.getElementById('search'); //search input this id from there html check 
    if (id == 'searchTitle')
    {
        searchMood = 'title';

        //insted place holder you can write it here search.placeholder = 'title';

    }else
    {
        searchMood = 'category';
    }

    search.focus(); // it will focus and make it little big 

    search.value = '';
    showData();
    
    search.placeholder = `Search By ${searchMood}`; //change placeholder to search by title or category
    //console.log(searchMood); //check if its working



}


//we still in search but here we do the real search 

function searchData(value) //go to html and add onkeyup when you start write and stop using keyboread make this function work this.value will get what you type there 
{
   // console.log("typing...", value);  //check if its working just checking 

    let table = ''; //reset table to empty string to show new data after search
for (let i = 0; i < dataPro.length; i++) 
{

    if (searchMood == 'title') 
    {

        // #region 🔒 Old Search Code (Hidden)
        /*
        The old code for when we did it twice

        from for:

        for (let i = 0; i < dataPro.length; i++) // search all items
        {
            if (dataPro[i].title.includes(value.toLowerCase()))
            {
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updataData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        }

        // ... and so on
        */
        // #endregion

        // to lower case also will take data from user in search in lower 
        if (dataPro[i].title.includes(value.toLowerCase())) // you can do it like if(dataPro[i].title.toLowerCase().includes(value)) or go in submit onclick 
        {
            // console.log(i)

            // if true show data 
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updataData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }

    } 
    else 
    {
        // search all items

        if (dataPro[i].category.includes(value.toLowerCase())) 
        {
            // console.log(i)

            // if true show data 
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updataData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>
            `;
        }
    }

} // end for loop


       document.getElementById('tbody').innerHTML = table; // show table in t body 
    
       // we will use in both kind of search 
}





//clean data validation 



