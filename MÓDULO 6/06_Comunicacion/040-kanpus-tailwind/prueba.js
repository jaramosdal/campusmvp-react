const ui = {
  boton:
    "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100 border-gray-400 \
  dark:border-gray-500 tracking-wide rounded enabled:hover:brightness-125 px-3 py-1 border shadow-lg disabled:text-gray-400 transition-all",
  primario: "!bg-cyan-300 dark:!bg-cyan-700",
  opcion:
    "mx-1 px-2 py-1 bg-transparent text-gray-600 dark:text-gray-300 \
  hover:text-black dark:hover:text-white rounded",
  active:
    "!text-black dark:!text-white !bg-gray-300 dark:!bg-gray-600 cursor-default",
  pending: "text-orange",
};

const spreadString = (...cadena) => {
  console.log(cadena.join(" "));
};

spreadString(ui.boton);
