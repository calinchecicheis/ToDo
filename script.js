const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');
const btnAddToDo = document.getElementById('btnAddToDo');

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

window.onload = function () {
	if (data) {
		LIST = JSON.parse(data);
		id = LIST.length;
		loadList(LIST);
	} else {
		LIST = [];
		id = 0;
	}
}

function loadList(array) {
	array.forEach(item => {
		addToDo(item.name, item.id, item.done);
	});
};


function addToDo(toDo, id, done) {

	if (toDo) {
		const DONE = done ? CHECK : UNCHECK;
		const LINE = done ? LINE_THROUGH : "";

		const item = `<li class="item" job="complete" id="${id}">
                  <i class="fa ${DONE} co" job="complete" "></i>
                  <p class="text ${LINE}" job="complete">${toDo}</p>
                  <i class="fa fa-trash-o de" job="delete"></i>
                  </li>
                 `;

		const position = "beforeend";
		list.insertAdjacentHTML(position, item);


	} else {
		alert("Type to do")
	}
	input.value = "";
}

function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);



	element.closest(".item").querySelector(".text").classList.toggle(LINE_THROUGH);



}

function removeToDo(element) {
	element.closest(".item").remove(element);

}

clear.addEventListener('click', function () {

	localStorage.clear();
	location.reload();
})

btnAddToDo.addEventListener("click", function () {
	const toDo = input.value;
	addToDo(toDo);
	LIST.push({
		name: toDo,
		id: id,
		done: false
	})
	localStorage.setItem("TODO", JSON.stringify(LIST));
	id++;
})

document.addEventListener("keyup", function (event) {
	if (event.keyCode == 13) {
		const toDo = input.value;
		addToDo(toDo);
		LIST.push({
			name: toDo,
			id: id,
			done: false
		})
		localStorage.setItem("TODO", JSON.stringify(LIST));
		id++;
	}
})

list.addEventListener("click", function (event) {
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == "complete") {

		completeToDo(element);
		id = element.closest(".item").id;
		for (var i = 0; i < LIST.length; i++) {

			if (LIST[i].id == id) {

				LIST[i].done = LIST[i].done ? false : true;

			}

		}
	} else if (elementJob == "delete") {
		removeToDo(element);
		id = element.closest(".item").id;
		for (var i = 0; i < LIST.length; i++) {

			if (LIST[i].id == id) {
				LIST.splice(i, 1);
			}

		}
	}
	localStorage.setItem("TODO", JSON.stringify(LIST));
})
