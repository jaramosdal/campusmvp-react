import localforage from "localforage";

const DB = {
  images: [
    { 
      id: "nikita-pishchugin-CGfLk6WzAI8",
      title: "Faro",
      author: "Nikita Pishchugin",
    },
    { 
      id: "polina-kuzovkova-J0M6Xq7-i7k",
      title: "Acantilado",
      author: "Polina Kuzovkova",
    },
    { 
      id: "rina-kulevski-Mp_DVD-s9lA",
      title: "Montañas nevadas",
      author: "Rina Kulevski",
    },
    { 
      id: "simon-barber-5-OCwpKeNY8",
      title: "Costa cristalina",
      author: "Simon Barber",
    },
    { 
      id: "tobias-reich-SfhLrF4yxXI",
      title: "Amanecer helado",
      author: "Tobias Reich",
    },
    { 
      id: "wolfgang-hasselmann-P_XftypXOME",
      title: "Árbol y luna",
      author: "Wolfgang Hasselmann",
    },
  ]
}

export async function getImageIds() {
  await someTime()
  return DB.images.map(i => i.id)
}

export async function getImageData(imageId) {
  await someTime()
  const votes = await localforage.getItem(imageId) ?? 0
  return {
    ...DB.images.filter(i => i.id === imageId)[0],
    votes,
    url: `/images/${imageId}.jpg`
  }
}

export async function sendVote(imageId) {
  await someTime()
  await localforage.getItem(imageId).then(v =>
    // si el valor no existe será null (y null + 1 = 1)
    localforage.setItem(imageId, v + 1)
  )
}

async function someTime() {
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}
