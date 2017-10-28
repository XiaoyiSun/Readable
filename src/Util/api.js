export const fetchCategories = () => {
  fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'whatever-you-want' } })
    .then(result => result.json())
    .then(data => data.categories);
};

export const fetchPosts = () => {
  fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' } })
    .then(result => result.json());
};

