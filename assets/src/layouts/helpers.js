// add green border style to a selected category and remove it from none selected categories
export const addStyles = (cat, categoriesRefs) => {
  const styles = ['border-green-400', 'shadow-green-300'];
  categoriesRefs?.current.map((ref) => {
    return cat.target.id === ref.id ? ref.classList.add(...styles) : ref.classList.remove(...styles);
  });
};

// push categories to categoriesRefs while mapping categories data
export const addToRefs = (category, categoriesRefs) => {
  if (category && !categoriesRefs.current.includes(category)) {
    categoriesRefs.current.push(category);
  }
};

export const buttonClasses = (color) => {
  let colorClasses =
    'flex justify-center items-center px-2 py-1 md:px-4 md:py-2 border border-transparent rounded-md font-semibold text-xs sm:text-sm text-white uppercase tracking-widest focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-onRemovefit ';
  switch (color) {
    case 'red':
      colorClasses += `bg-red-500 hover:bg-red-900 active:bg-red-700`;
      break;
    case 'blue':
      colorClasses += `bg-blue-500 hover:bg-blue-900 active:bg-blue-700`;
      break;
    case 'green':
      colorClasses += `bg-green-500 hover:bg-green-900 active:bg-green-700`;
      break;
    case 'sky':
      colorClasses += `bg-sky-500 hover:bg-sky-600 active:bg-sky-600`;
      break;
    default:
      colorClasses += `bg-gray-500 hover:bg-gray-900 active:bg-gray-700`;
  }
  return colorClasses;
};
