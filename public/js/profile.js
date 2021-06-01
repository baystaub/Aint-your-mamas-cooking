const newFormHandler = async (event) => {
    event.preventDefault();
    const getCurrentUrlPost_id = window.location.href.split('/')
    [window.location.href.toString().split('/').length - 1];
    const dishName = document.querySelector('#recipe-name').value.trim();
    const summary = document.querySelector('#recipe-summary').value.trim();
    const cuisine_id = document.querySelector('#cuisine-type').value.trim();
    const prepTime = document.querySelector('#prep-time').value.trim();
    const cookTime = document.querySelector('#cook-time').value.trim();
    const serves = document.querySelector('#serves').value.trim();
    const ingredients = document.querySelector('#ingredients-list').value.trim();
    const instructions = document.querySelector('#instructions-desc').value.trim();
    const image = document.querySelector('#upload').value.trim();

    if (dishName && summary && cuisine_id && ingredients && instructions) {
        console.log(dishName)
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({
                dishName, summary, instructions, ingredients,
                serves, prepTime, cookTime, cuisine_id, image
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create recipe');
        }
    }
};




// const newFormHandler = async (event) => {
//     event.preventDefault();

//     const dishName = document.querySelector('#recipe-name').value.trim();
//     const summary = document.querySelector('#recipe-summary').value.trim();
//     const cuisine_id = document.querySelector('#cuisine-type').value
//     const prepTime = document.querySelector('#prep-time').value.trim();
//     const cookTime = document.querySelector('#cook-time').value.trim();
//     const serves = document.querySelector('#serves').value.trim();
//     const ingredients = document.querySelector('#ingredients-list').value.trim();
//     const instructions = document.querySelector('#instructions-desc').value.trim();
//     // const image = document.querySelector("#recipe-image")



//     if (dishName && summary && ingredients && instructions && cuisine_id && serves && prepTime && cookTime) {
//         const response = await fetch(`/api/recipes`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 dishName, summary, instructions, ingredients,
//                 serves, prepTime, cookTime, cuisine_id
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         console.log("testing ")
//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to create recipe');
//         }
//     }
// };
/*  ==========================================
    UPLOAD IMAGE NAME
* ========================================== */


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

input.addEventListener('change', showFileName);
function showFileName(event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/recipes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete recipe');
        }
    }
};


document.querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);


document.querySelector('.recipe-list')
    .addEventListener('click', delButtonHandler);

/*  ==========================================
    create list of ingredentes
* ========================================== */

// $ = function (val) {
//     result = document.querySelector(val);
//     return result;
// };
// all = function (val) {
//     result = document.querySelectorAll(val);
//     return result;
// };
// function createListItem(value) {
//     var listItem,
//         closeBtn,
//         textContent,
//         node,

//         listItem = document.createElement("li");
//     closeBtn = document.createElement("button");
//     textContent = document.createElement("p");
//     node = document.createTextNode(value);
//     closeBtn.textContent = "X";
//     closeBtn.className = "close-btn"
//     listItem.className = "list-item"

//     textContent.appendChild(node);
//     listItem.appendChild(textContent);
//     listItem.appendChild(closeBtn);

//     return listItem;
// }

// $("ul").addEventListener("click", function (e) {
//     var el = e.target;
//     if (el.className == "close-btn") {
//         el.parentNode.remove();
//         if (countList() >= 1) {
//             $("#count").innerHTML = "(" + countList() + ")";
//         }
//         else {
//             $("#count").innerHTML = "";
//         }
//     }
//     console.log(el.tagName);
//     if (el.tagName == "LI" || el.tagName == "P") {
//         var li = el.closest("li")
//         if (li.classList.contains("active")) {
//             li.classList.remove("active")
//         } else {
//             li.classList.add("active")
//         }
//     }
// })
// function checkValueExist(values) {
//     lists = all("#ingredients-list li");
//     result = false;
//     for (var i = 0; i < lists.length; i++) {
//         if (lists[i].querySelector('p').textContent === values) {
//             result = true;
//             break;
//         }
//     }
//     return result;
// }
// function countList() {
//     var count = 0;
//     count = all("#ingridents-list li").length;
//     return count;
// }
// $("#add-ingredients").onclick = function (e) {
//     var fistItem,
//         listItem;
//     if ($("#title").value === "") {
//         alert("Empty value are not allowed");
//     } else if (!checkValueExist($("#title").value)) {
//         listItem = createListItem($("#title").value);
//         fistItem = $("#ingredients-list li")

//         if (fistItem) {
//             $("#ingredients-list").insertBefore(listItem, fistItem);
//         }
//         else {
//             $("#ingredients-list").appendChild(listItem);
//         }

//         $("#count").innerHTML = "(" + countList() + ")";
//         $("#title").value = "";
//     }
//     else {
//         alert("ingredients Already Exists");
//     }
// }
