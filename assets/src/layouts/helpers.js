// add green border style to a selected category and remove it from none selected categories
export const addStyles = (cat, categoriesRefs) => {
  const styles = ['border-green-400', 'shadow-green-300'];
  categoriesRefs.current.map((ref) => {
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
  return `flex justify-center items-center px-2 py-1 md:px-4 md:py-2 bg-${color}-700 border border-transparent rounded-md font-semibold text-xs sm:text-sm text-white uppercase tracking-widest hover:bg-${color}-600 active:bg-${color}-700 focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-onRemovefit`;
};
