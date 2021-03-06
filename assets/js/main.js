$("document").ready(function() {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
    type: "GET",
    dataType: "JSON",
    success: function(pokemones) {
      const listado = pokemones.results;
      const listadoNombres = listado.map(function(el) {
        return el.name.toUpperCase()
      })
      listadoNombres.forEach(function(element) {
        $("#selectPoke").append(`<option value="${element}">${element}</option>`)
      });
    }
  })

  $("#selectPoke").change(function(v) {
    const selected = v.target.value;
    const selectedNormalizado = selected.toLowerCase();
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${selectedNormalizado}`,
      type: "Get",
      dataType: "JSON",
      success: function(data) {

        const nombrePokemon = data.name.toUpperCase();
          $("#nombrePoke").text(nombrePokemon)

        const spriteFront = data.sprites.front_default;
          $("#imgPoke").attr("src", spriteFront);

          var tipo = data.types[0].type.name;
            if (tipo == "fire") {
              tipo = "Fuego"
            }
            if (tipo == "grass") {
              tipo = "Planta"
            }
            if (tipo == "water") {
              tipo = "Agua"
            }
            if (tipo == "electric") {
              tipo = "Electrico"
            }
            if (tipo == "bug") {
              tipo = "Bicho"
            }
            if (tipo == "ground") {
              tipo = "Tierra"
            }
            if (tipo == "ice") {
              tipo = "Hielo"
            }
            if (tipo == "flying") {
              tipo = "Volador"
            }
            if (tipo == "poison") {
              tipo = "Veneno"
            }
            if (tipo == "rock") {
              tipo = "Roca"
            }
            if (tipo == "fighting") {
              tipo = "Lucha"
            }
            if (tipo == "dragon") {
              tipo = "Dragon"
            }
            if (tipo == "psychic") {
              tipo = "Psíquico"
            }
            if (tipo == "normal") {
              tipo = "Normal"
            }
          $('#poke-type').text(tipo);


        var hp = data.stats[5].base_stat;
        var attack = data.stats[4].base_stat;
        var def = data.stats[3].base_stat;
        var spat = data.stats[2].base_stat;
        var spdef = data.stats[1].base_stat;
        var speed = data.stats[0].base_stat;
        
        var estado_valores = [
          hp,
          attack,
          def,
          spat,
          spdef,
          speed
        ];
        var estado_nombes = [
          'Salud',
          'Ataque',
          'Defensa',
          'Ataque Especial',
          'Defensa Especial',
          'Velocidad'
        ];

        var ctx = document.querySelector('#grafico');
        var pokeGraph = new Chart(ctx, {
          type: 'radar',  
          data: {
            labels: estado_nombes,
            datasets: [{
              data: estado_valores,
              backgroundColor: 'rgba(239, 83, 80, 0.25)',
              borderColor: 'rgba(239, 83, 80, 0.5)',
            }]
          },
          options: {
            scale: {
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 200
              }
          }
          }
        });


      }
    });
  });
  


});