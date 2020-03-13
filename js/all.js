// const data = await fetchData();


// //從網站取得資料
// const fetchData = async ()=>{
//     const response = await fetch( "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",{}).then((res) =>{
//         return res.json()
//     }).then((jsonRes) =>{
//         return jsonRes.result.records;
//         initialize();
//     })
// }

// fetchData();

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97", );
var data = []; //使用陣列儲存資料
xhr.onload = function(){
    var get = JSON.parse(xhr.responseText);
    //把responseText的records裡的東西都塞進陣列
    data =  get.result.records;
    initialize();
    // displayPage(0, data); //第一頁開始顯示
};
xhr.send(null);



var countyName = ["楠梓區", "左營區", "鼓山區", "三民區","鹽埕區","前金區","新興區","苓雅區","前鎮區","旗津區","小港區","鳳山區","大寮區","鳥松區","林園區","仁武區","大樹區","大社區","岡山區","路竹區","橋頭區","梓官區","彌陀區","永安區","燕巢區","田寮區","阿蓮區","茄萣區","湖內區","旗山區","美濃區","內門區","杉林區","甲山區","六龜區","茂林區","桃源區","那瑪夏區"];


//做出了頁碼，但不知道怎麼只賦予目前的頁碼樣式，而不是每個點過的都有樣式
//不知道怎麼做上一頁和下一頁


//取得dom元素
var areaID = document.getElementById("areaID");
var content = document.querySelector(".content");
let listArea = document.querySelector(".listArea");
displayCountyList();


function displayCountyList(){

    for(var i =0; i<countyName.length; i++){
        var countyListItem = document.createElement("option");
        countyListItem.setAttribute("value", countyName[i]);
        countyListItem.textContent = countyName[i];
        areaID.appendChild(countyListItem);
    };

};

function initialize(){
    createPages(data);
};

/*使用createPages做出頁數，分類資料，呈現 */
function createPages(arr){
    let listArea = document.querySelector(".listArea");
    //將arr傳送進來的資料分頁．總共有…頁
    totalPage = Math.ceil(arr.length/8);
    //做頁數
    let pagesArea = document.createElement("div");
        pagesArea.setAttribute("class", "pagesArea");
        content.appendChild(pagesArea);
    let prev = document.createElement("div");
        prev.setAttribute("class", "prev");
        prev.setAttribute("id", "prev");
        prev.textContent = "< prev";
        pagesArea.appendChild(prev);
    for(let i =1; i<= totalPage; i++){
        let pageIndex = document.createElement("a");
        pageIndex.setAttribute("class", "pages");
        pageIndex.setAttribute("id", "page"+i);
        pageIndex.textContent = i;
        pagesArea.appendChild(pageIndex); //製作頁碼
    };
    let next = document.createElement("div");
    next.setAttribute("class", "next");
    next.setAttribute("id", "next");
    next.textContent = "next >";
    pagesArea.appendChild(next);
   
    displayPage(0, arr); //因為資料編號從0開始，為了顯示第一筆，第一頁的編號為0
    pagesArea.addEventListener("click", turnPage);
    
    function turnPage(e){

        for(let i=1; i<= totalPage; i++){

            if(e.target.id == "page" + i){ //若是選到的頁碼 = page i
                // console.log(e.target.id);
                // console.log(i);
                let selectedStyle = document.getElementById("page"+i);
                selectedStyle.style.color = "#559ac8";
                let currentPage = i-1; //當前頁碼
                listArea.innerHTML = ""; //清空上次的呈現結果
                displayPage(currentPage, arr);  //顯示該頁碼內容 
            };
            
        };
        
        
    }; 


};




function displayPage(currentPage, arr){
    //分頁顯示   
    let pageContent = []; //存放一頁的內容
    //一頁只會有八筆資料，根據currentPage傳進的值來將資料編號儲存進該頁陣列
    if(arr.length ==0){
        alert("沒有資料!");
    };  
    pageContent.push(arr[currentPage*8]);
    pageContent.push(arr[currentPage*8 + 1]);
    pageContent.push(arr[currentPage*8 + 2]);
    pageContent.push(arr[currentPage*8 + 3]);
    pageContent.push(arr[currentPage*8 + 4]);
    pageContent.push(arr[currentPage*8 + 5]);
    pageContent.push(arr[currentPage*8 + 6]);
    pageContent.push(arr[currentPage*8 + 7]);
    console.log(pageContent);
    // console.log("讀取到" + arr.length + "筆");

    // console.log("目前有" + pageContent.length);
    //顯示
    for(let i =0; i<pageContent.length; i++){
        let listArea = document.querySelector(".listArea");
        let listItem = document.createElement("div");
        listItem.setAttribute("class", "sight");
        if(pageContent[i] != undefined){
        
        let text =
        `
        <div class = 'image' style = 'background-image : url(${pageContent[i].Picture1})'>
        <h3>${pageContent[i].Name}</h3>
        </div>

        <div class = 'info'>
        <div class = 'info-text'>
        <div class = 'sight-img clock'></div>
        ${pageContent[i].Opentime}
        </div>
        <div class = 'info-text'>
        <div class = 'sight-img pin'></div>
        ${pageContent[i].Add}
        </div>
        <div class = 'info-text'>
        <div class = 'sight-img phone'></div>
        ${pageContent[i].Tel}
        </div>
        <div class = 'priceInfo'><img src="images/icons_tag.png" alt="">
        ${pageContent[i].Ticketinfo}
        </div>
        `


        listItem.innerHTML = text;
        listArea.appendChild(listItem);
        };
    };

};



let tagContainer = document.querySelector(".tag-container");
tagContainer.addEventListener("click", initTag);
function initTag(){
    
    content.innerHTML = "";
    var img = document.createElement("img");
    img.setAttribute("src", "images/separation_03.png");
    img.style.width = "90%";
    img.style.display = "block";
    img.style.margin = "20px auto";
    content.appendChild(img);

    var createList = document.createElement("div");
    createList.setAttribute("class", "listArea");
    content.appendChild(createList);

    var e = window.event;
    tagFilter(e);

};

function tagFilter(e){
    let selected = [];
    let select = e.target.id;
    let listArea = document.querySelector(".listArea");

   
    for(let i =0; i< data.length; i++){
        if(select == data[i].Zone){
            selected.push(data[i]);
        };
    };
    if(selected.length == 0){
        alert("沒有資料喔!")
        initialize();
        
    }
    else{
    let title = document.createElement("h4");
    title.textContent = select;
    content.insertBefore(title, listArea);
        createPages(selected);};　//將處理好的陣列製作成頁

};
//切換選單時，瀏覽陣列，找出Zone符合的景點，陳列在列表中


 //1. 設定變數selected, 儲存選到的景點
 //3. 將selected的內容陳列出來

 areaID.addEventListener("change", initList);
function initList(){
    content.innerHTML = "";
    var img = document.createElement("img");
    img.setAttribute("src", "images/separation_03.png");
    img.style.width = "90%";
    img.style.display = "block";
    img.style.margin = "20px auto";
    content.appendChild(img);

    var createList = document.createElement("div");
    createList.setAttribute("class", "listArea");
    content.appendChild(createList);

    var e = window.event;
    addList(e);


};

//偵測目前選到的地區，把該地區的景區使用陣列管理
function addList(e){
    let selected = [];
    let select = e.target.value;
    let listArea = document.querySelector(".listArea");
    console.log("現在選擇的是" + select);
   
    for(let i =0; i< data.length; i++){
        if(select == data[i].Zone){
            selected.push(data[i]);
        };
    };
    if(selected.length == 0){
       alert("沒有資料喔!");
        initialize();
        
    }else if(select == "選擇行政區"){
        alert("請選擇行政區!");
        initialize();
    }
    else{
    let title = document.createElement("h4");
    title.textContent = select;
    content.insertBefore(title, listArea);
        createPages(selected);};　//將處理好的陣列製作成頁

};

