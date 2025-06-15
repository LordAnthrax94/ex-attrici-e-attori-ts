type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type ActressNationality = | "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

type Actress = Person & {
  most_famous_movie: [string, string, string],
  awards: string,
  nationality: ActressNationality
}

function isActress (dati: unknown): dati is Actress{
  return (
    typeof dati === 'object' && dati !== null &&
    "id" in dati && typeof dati.id === 'number' &&
    "name" in dati && typeof dati.name === 'string' &&
    "birth_year" in dati && typeof dati.birth_year === 'number' &&
    "death_year" in dati && typeof dati.death_year === 'number' &&
    "biography" in dati && typeof dati.biography === 'string' &&
    "image" in dati && typeof dati.image === 'string' &&
    "most_famous_movie" in dati &&
    dati.most_famous_movie instanceof Array &&
    dati.most_famous_movie.length === 3 &&
    dati.most_famous_movie.every(movie => typeof movie === 'string') &&
    "awards" in dati && typeof dati.awards === 'string' &&
    "nationality" in dati && typeof dati.nationality === 'string' &&
    (["American", "British", "Australian", "Israeli-American", "South African", "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"].includes(dati.nationality))
  );
};

async function fetchActressData(id: number): Promise<Actress | null>{
  try{
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const dati: unknown = await response.json();
    if(!isActress(dati)){
      throw new Error("Invalid actress data format");
    }
    return dati;
  }catch(error){
    if(error instanceof Error){
      console.error("Error fetching actress data:", error);
    }else{console.error("Unknown error fetching actress data:", error);}
    return null;
  }
}

async function FetchAllActresses(): Promise<Actress[]>{
  try{
    const response = await fetch("http://localhost:3333/actresses");
    if(!response.ok){
      throw new Error(`HTTP error! ${response.status}: ${response.statusText}`);
    }
    const dati: unknown = await response.json();
    if(!(dati instanceof Array)){
      throw new Error("Invalid actresses data format");
    }
    const validActresses: Actress[] = dati.filter(isActress);
    return validActresses;
  }catch(error){
    if(error instanceof Error){
      console.error("Error fetching all actresses data:", error);
    }else{console.error("Unknown error fetching all actresses data:", error);}
    return [];
  }
}





