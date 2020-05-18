class Helpers {
  // theres no API for the types' colors, so I had to make my own
  // I got the colors from this page https://veekun.com/dex/media/types/en/
  // this methos returns color names Materialize can interpret as classes
  _assignColor(name) {
    switch (name) {
      case 'bug': return 'lime darken-1';
      case 'dark': return 'brown lighten-2';
      case 'dragon': return 'purple darken-3'
      case 'electric': return 'yellow'
      case 'fairy': return 'pink lighten-3'
      case 'fighting': return 'red darken-4'
      case 'fire': return 'orange darken-4'
      case 'flying': return 'purple lighten-4'
      case 'ghost': return 'deep-purple darken-4'
      case 'grass': return 'light-green'
      case 'ground': return 'amber lighten-4'
      case 'ice': return 'cyan lighten-5'
      case 'normal': return 'brown lighten-5'
      case 'poison': return 'pink darken-4'
      case 'psychic': return 'red lighten-3'
      case 'rock': return 'orange lighten-3'
      case 'shadow': return 'indigo darken-4'
      case 'steel': return 'grey lighten-2'
      case 'unknown': return 'teal'
      case 'water': return 'blue lighten-1'
      default: return 'teal'
    }
  }

  padWithZeroes(number, length) {
    let paddedNumber = '' + number;
    while (paddedNumber.length < length) {
        paddedNumber = '0' + paddedNumber;
    }
    return paddedNumber;
  }

  buildPokemonsPreviews(data) {
    return data.map(pokemon => {
      return {
        name: pokemon.name,
        id: pokemon.url.split("/").reverse()[1],
      }
    });
  }

  buildPokemonsTypes(data) {
    return data.map(type => {
      const color = this._assignColor(type.name)
      return {
        nameFriendly: type.name.toUpperCase(),
        name: type.name,
        id: type.url.split("/").reverse()[1],
        color,
        textColor: color.match(/darken/) ? 'white-text' : 'black-text' 
      }
    });
  }

  buildPokemon(details, characteristics) {
    return {
      abilities: details.abilities.map(item => item.ability.name),
      height: details.height,
      weight: details.weight,
      id: details.id,
      number: this.padWithZeroes(details.id.toString(), 3),
      name: details.name,
      nameFriendly: details.name.charAt(0).toUpperCase() + 
      details.name.slice(1),
      stats: details.stats.map((item) => {
        return { 
          name: item.stat.name, 
          effort: item.effort, 
          base: item.base_stat 
        };
      }),
      types: details.types.map(item => item.type.name),
      // evolutionChainID: evolution_chain.url.split("").reverse()[0],
      // evolvesTo: evolutions.chain.evolves_to.map(item => item.species),
      evolvesFromSpecies: characteristics.evolves_from_species || null,
      generation: characteristics.generation.name,
      flavorTextEntry: characteristics.flavor_text_entries.find(item => {
        return item.language.name === "en";
      }) || "",
      description: characteristics.form_descriptions.find(item => {
        return item.language.name === "en";
      }) || "",
    }
  }
}

export default new Helpers();