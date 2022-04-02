// -----------Elementos en el Documento
const $form_search = $('#form_search');
const $input = $('#input_search');
const $button = $('#button-search');

const $content = $('#content')
const $title = $('#search_title')
const $movies = $('#movies');

const $icon_pag = $('#icon_pag')
const $icon_pre = $('#icon_left');
const $icon_next = $('#icon_right');

let $li_g = $('#g_list_show li')
let $li_y = $('#y_list_show li')


// -----------Función para crear un elemento en el Documento
function createNode(element) {
    return document.createElement(element);
};


// -----------Función para insertar etiqueta dentro de otra
function append(parent, child) {
  return parent.appendChild(child);
};


// -----------Función para la Plantilla de las Película
function template_movie(info_movie){
  let info = `<img src='${info_movie.image_url}' alt="">
  <div class="info_movie">
  <h3 class="name">${info_movie.title}</h3>
  <h3 class="rating"> <img src="images/rating.svg" alt="">${info_movie.rating}</h3>
  </div>`;
  return info
};


// -----------Función para cambiar el Título haciendo referencia a la busqueda
function text_title(search){
  return $title[0].innerHTML = "Tu busqueda: " + search + "..."
}


// -----------Función para cambiar el Título al Género/Año
function title_type_list(search){
  return $title[0].innerHTML = `<u>${search}:</u>`;
}


// -----------Función para ver la Película en el Documento
function show_movie(id) {
  const $section = $('.template_movie');
  $section.remove()

  const settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": `https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,
  	"method": "GET",
  	"headers": {
  		"X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
  		"X-RapidAPI-Key": "49c18413b0msh66a8464e54dc142p1c438ajsnfd7fe374832a"
  	}
  };

  $.ajax(settings).done(function (response) {
  	return response
  })
  .then((data) => {
    let in_data = data.results
    let document_template = template_movie(in_data)
    let create_section = createNode('section')
    create_section.className = 'template_movie';
    create_section.innerHTML = document_template
    movies.appendChild(create_section)
  })
}


// -------------------------------------Activar botones de paginación del Contenido
function pagination_next(data_url){
    let pag_next = data_url.links.next
    if (pag_next != null) {
      $icon_next[0].className = 'active';
    } else {
      $icon_next[0].className = '';
    }
}

function pagination_previous(data_url){
    let pag_previous = data_url.links.previous
    if (pag_previous != null) {
      $icon_pre[0].className = 'active';
    } else {
      $icon_pre[0].className = '';
    }
}

// -------------------------------------Paginación de la Lista
let number = 0
function add_n() {
  number = number + 1
}
function subtract_n() {
  number = number - 1
}

let add = add_n()


// -----------Pagina despues
$icon_next.on('click', (event) => {
  event.preventDefault();
  const button_active = $icon_next[0].className
  let title_list = $title[0].innerText
  let text_title = title_list.replace(':', '')
  let type_data = parseInt(text_title)
// Si el boton está activado ejecutar las funciones
  if (button_active === 'active') {
    let add = add_n()

// Ver la lista de Mayor Rating
    if (title_list == 'Mayor Rating') {
      let show_rating = movies_rating()

// Ver la lista del Género buscado
    } else if (type_data != NaN) {
      let show_genre = movies_genre(text_title)

// Ver la lista del Año buscado
    } else if (typeof(type_data) == 'number') {
      let show_genre = movies_year(text_title)

    }
  }
})

// -----------Pagina anterior
$icon_pre.on('click', (event) => {
  event.preventDefault();
  const button_active = $icon_pre[0].className

  let title_list = $title[0].innerText
  let text_title = title_list.replace(':', '')
  let type_data = parseInt(text_title)

  if (button_active === 'active') {
    let subtract = subtract_n()

    if (title_list == 'Mayor Rating') {
      let show_nextpag = list()

    } else if (type_data != NaN) {
      let show_genre = movies_genre(text_title)

    } else if (typeof(type_data) == 'number') {
      let show_genre = movies_year(text_title)

    }
  }
})


// -------------------------------------Lista al Iniciar de los más Populares
function movies_rating() {

const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://data-imdb1.p.rapidapi.com/movie/order/byRating/?page_size=10&page=${number}`,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
		"X-RapidAPI-Key": "49c18413b0msh66a8464e54dc142p1c438ajsnfd7fe374832a"
	}
};

$.ajax(settings).done(function (response) {
	return response
})
.then((data) => {
// -----------Buscar si hay una pag anterior o despues y activar boton
  let show_pag_next = pagination_next(data)
  let show_pag_pre = pagination_previous(data)

  let in_data = data.results.map((list) => {
// -----------Buscar la ID de cada Película para más detalles
  let src_id = list.imdb_id
  let active_src = show_movie(src_id)
  })
});
}

// -----------Activar al iniciar la pag
let ratings = movies_rating()


// -------------------------------------Usar el Buscador de Películas
$form_search.on('submit', (event) => {
  event.preventDefault()
// -----------Si no hay nada escrito
  if ($input.val() === '') {
    window.alert('Por favor inserte un valor para hacer la busqueda')
  } else {

let input_src = $input.val()
let change_title = text_title(input_src)

$icon_pag.hide()

const database = {
	"async": true,
	"crossDomain": true,
	"url": `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${input_src}/`,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
		"X-RapidAPI-Key": "49c18413b0msh66a8464e54dc142p1c438ajsnfd7fe374832a"
	}
};

$.ajax(database).done(function (response) {
	return response
})
.then((data) => {
// -----------Si no hay ningún resultado
if (data.results.length === 0) {
  const $section = $('.template_movie');
  $section.remove()
  let no_search = text_title(input_src)
  let create_h2 = createNode('h2')
  create_h2.innerHTML = 'No se encontraron coincidencias :(';
  create_h2.className = 'no_search_h2'
  content.appendChild(create_h2)

} else {
  let in_data = data.results.map((list) => {
  let src_id = list.imdb_id
  let active_src = show_movie(src_id)

// -----------Si hay una mensaje de la busqueda anterior borrarlo
  let $no_search_h2 = $('.no_search_h2')
  $no_search_h2.remove()
  })
}
})
  }
})


// -------------------------------------Seleccionar un Género de Película
$li_g.click(function(event) {
// -----------Buscar que elemento fue clickeado
  let selection = event.target.innerText
  let change_title = title_type_list(selection)
  let show_genre = movies_genre(selection)
  }
)


// -------------------------------------Seleccionar un Año de Película
$li_y.click(function(event) {
// -----------Buscar que elemento fue clickeado
  let selection = event.target.innerText
  let change_title = title_type_list(selection)
  let show_year = movies_year(selection)

  }
)


// -------------------------------------Mostrar Películas del Género Seleccionado
function movies_genre(genre){

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/?page_size=10&page=${number}`,
    "method": "GET",
    "headers": {
      "X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
      "X-RapidAPI-Key": "49c18413b0msh66a8464e54dc142p1c438ajsnfd7fe374832a"
    }
  };

  $.ajax(settings).done(function (response) {
    return response
  })
  .then((data) => {
    let show_pag_next = pagination_next(data)
    let show_pag_pre = pagination_previous(data)

    let in_data = data.results.map((list) => {
  // -----------Buscar la ID de cada Película para más detalles
    let src_id = list.imdb_id
    let active_src = show_movie(src_id)
    })
  })
}


// -------------------------------------Mostrar Películas del Género Seleccionado
function movies_year(year){

  const settings = {
  	"async": true,
  	"crossDomain": true,
  	"url":`https://data-imdb1.p.rapidapi.com/movie/byYear/${year}/?page=${number}&page_size=10`,
  	"method": "GET",
  	"headers": {
  		"X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
  		"X-RapidAPI-Key": "49c18413b0msh66a8464e54dc142p1c438ajsnfd7fe374832a"
  	}
  };

  $.ajax(settings).done(function (response) {
  	return response
  })
  .then((data) => {
    let show_pag_next = pagination_next(data)
    let show_pag_pre = pagination_previous(data)

    let in_data = data.results.map((list) => {
  // -----------Buscar la ID de cada Película para más detalles
    let src_id = list.imdb_id
    let active_src = show_movie(src_id)
    })
  })
}
